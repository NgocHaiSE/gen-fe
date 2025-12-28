import { useState, useEffect } from 'react';
import { getMutatedGeneEndpoint } from '../config/api';

interface MutatedGene {
    gene_name: string;
    mutated_samples: number;
    samples_tested: number;
}

type SortField = 'mutated_samples' | 'samples_tested' | null;
type SortOrder = 'asc' | 'desc';

export default function MutatedGenesTable({ type }: { type: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<MutatedGene[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 });
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const url = getMutatedGeneEndpoint(type, pagination.page, pagination.limit);

            if (!url) {
                setError('Unsupported cancer type');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch data');
                const json = await response.json();

                let genes: MutatedGene[] = [];

                if (Array.isArray(json)) {
                    genes = json;
                } else {
                    const typePrefix = type.split('-')[0];
                    const capitalizedPrefix = typePrefix.charAt(0).toUpperCase() + typePrefix.slice(1);
                    const possibleKeys = [
                        `mutation${capitalizedPrefix}GeneModels`,
                        'data',
                        'genes',
                        'results'
                    ];

                    for (const key of possibleKeys) {
                        if (json[key] && Array.isArray(json[key])) {
                            genes = json[key];
                            break;
                        }
                    }

                    setPagination(prev => ({ ...prev, totalPages: json.totalPages || 1 }));
                }

                setData(genes);
            } catch (err) {
                console.error('Error fetching mutated genes:', err);
                setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, pagination.page, pagination.limit]);

    // Filter by search term
    const filteredData = data.filter(item =>
        item.gene_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortField) return 0;
        const aVal = a[sortField];
        const bVal = b[sortField];
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => (
        <span className="ml-1 inline-flex flex-col text-[10px] leading-none">
            <span className={sortField === field && sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-300'}>▲</span>
            <span className={sortField === field && sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-300'}>▼</span>
        </span>
    );

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
                <div className="p-4 space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Toolbar - matching ProTable style */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-base font-semibold text-medical-primary">Gen đột biến</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Nhập tên gene"
                        className="w-64 pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Table - matching ProTable structure */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                Tên Gen
                            </th>
                            <th
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('mutated_samples')}
                            >
                                <span className="inline-flex items-center">
                                    Trường hợp mang đột biến
                                    <SortIcon field="mutated_samples" />
                                </span>
                            </th>
                            <th
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('samples_tested')}
                            >
                                <span className="inline-flex items-center">
                                    Tổng số mẫu
                                    <SortIcon field="samples_tested" />
                                </span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                Tỷ lệ trường hợp mang đột biến
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <a
                                        href={`https://cancer.sanger.ac.uk/cosmic/gene/analysis?all_data=n&in=t&ln=${row.gene_name}&sn=liver&src=tissue&wgs=off`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-medical-accent hover:text-medical-accent-hover hover:underline font-medium"
                                    >
                                        {row.gene_name}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                                    {row.mutated_samples}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                                    {row.samples_tested}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                                    {row.samples_tested ? ((row.mutated_samples / row.samples_tested) * 100).toFixed(2) : 0}%
                                </td>
                            </tr>
                        ))}
                        {sortedData.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Không tìm thấy kết quả
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination - Ant Design style */}
            <div className="px-6 py-3 border-t border-gray-200 flex justify-end items-center gap-1">
                <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="w-8 h-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400"
                >
                    ‹
                </button>

                <button
                    onClick={() => handlePageChange(1)}
                    className={`w-8 h-8 flex items-center justify-center text-sm border rounded transition-colors ${pagination.page === 1 ? 'border-medical-accent text-medical-accent' : 'border-gray-300 hover:border-medical-accent hover:text-medical-accent'
                        }`}
                >
                    1
                </button>

                {pagination.page > 3 && pagination.totalPages > 5 && (
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">•••</span>
                )}

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(p => p !== 1 && p !== pagination.totalPages && Math.abs(p - pagination.page) <= 1)
                    .map(pageNum => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center text-sm border rounded transition-colors ${pagination.page === pageNum ? 'border-medical-accent text-medical-accent' : 'border-gray-300 hover:border-medical-accent hover:text-medical-accent'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                {pagination.page < pagination.totalPages - 2 && pagination.totalPages > 5 && (
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">•••</span>
                )}

                {pagination.totalPages > 1 && (
                    <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className={`w-8 h-8 flex items-center justify-center text-sm border rounded transition-colors ${pagination.page === pagination.totalPages ? 'border-medical-accent text-medical-accent' : 'border-gray-300 hover:border-medical-accent hover:text-medical-accent'
                            }`}
                    >
                        {pagination.totalPages}
                    </button>
                )}

                <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                    className="w-8 h-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-400"
                >
                    ›
                </button>

                <select
                    value={pagination.limit}
                    onChange={(e) => setPagination(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                    className="ml-2 px-2 py-1.5 text-sm border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:border-blue-500"
                >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                </select>
            </div>
        </div>
    );
}
