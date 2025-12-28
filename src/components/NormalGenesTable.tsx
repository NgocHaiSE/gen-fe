import { useState, useEffect } from 'react';
import { getNormalGeneEndpoint } from '../config/api';

interface NormalGene {
    gene_name: string;
    samples_tested: number;
    mutated_samples?: number;
}

export default function NormalGenesTable({ type }: { type: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<NormalGene[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const url = getNormalGeneEndpoint(type, pagination.page, pagination.limit);

            if (!url) {
                setError('Unsupported cancer type');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch data');
                const json = await response.json();

                // Handle different response structures
                let genes: NormalGene[] = [];

                if (Array.isArray(json)) {
                    genes = json;
                } else {
                    const typePrefix = type.split('-')[0];
                    const capitalizedPrefix = typePrefix.charAt(0).toUpperCase() + typePrefix.slice(1);
                    const possibleKeys = [
                        `nomal${capitalizedPrefix}GeneModels`,
                        `normal${capitalizedPrefix}GeneModels`,
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
                console.error('Error fetching normal genes:', err);
                setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, pagination.page, pagination.limit]);

    const filteredData = data.filter(item =>
        item.gene_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-100 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-medical-primary">Danh sách Gen không đột biến ({type.replace(/-/g, ' ')})</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên gen..."
                        className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200">Tên Gen</th>
                            <th className="px-6 py-3 border-b border-gray-200 text-center">Tổng số mẫu</th>
                            <th className="px-6 py-3 border-b border-gray-200 text-center">Trường hợp mang đột biến</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-3 font-medium text-medical-accent">
                                    <a href={`https://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=${row.gene_name}`} target="_blank" rel="noreferrer" className="hover:underline">
                                        {row.gene_name}
                                    </a>
                                </td>
                                <td className="px-6 py-3 text-center text-gray-600">{row.samples_tested}</td>
                                <td className="px-6 py-3 text-center text-gray-600">{row.mutated_samples ?? 0}</td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    Không tìm thấy kết quả
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex justify-end items-center gap-2">
                <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="w-8 h-8 flex items-center justify-center text-sm border rounded hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ‹
                </button>

                {/* Page 1 */}
                <button
                    onClick={() => handlePageChange(1)}
                    className={`w-8 h-8 flex items-center justify-center text-sm border rounded transition-colors ${pagination.page === 1 ? 'border-medical-accent text-medical-accent' : 'hover:border-medical-accent hover:text-medical-accent'
                        }`}
                >
                    1
                </button>

                {/* Left ellipsis */}
                {pagination.page > 3 && pagination.totalPages > 5 && (
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">•••</span>
                )}

                {/* Middle pages */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(p => p !== 1 && p !== pagination.totalPages && Math.abs(p - pagination.page) <= 1)
                    .map(pageNum => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center text-sm border rounded transition-colors ${pagination.page === pageNum ? 'border-medical-accent text-medical-accent' : 'hover:border-medical-accent hover:text-medical-accent'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                {/* Right ellipsis */}
                {pagination.page < pagination.totalPages - 2 && pagination.totalPages > 5 && (
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">•••</span>
                )}

                {/* Last page */}
                {pagination.totalPages > 1 && (
                    <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className={`w-8 h-8 flex items-center justify-center text-sm border rounded transition-colors ${pagination.page === pagination.totalPages ? 'border-medical-accent text-medical-accent' : 'hover:border-medical-accent hover:text-medical-accent'
                            }`}
                    >
                        {pagination.totalPages}
                    </button>
                )}

                <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                    className="w-8 h-8 flex items-center justify-center text-sm border rounded hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ›
                </button>

                {/* Page size selector */}
                <select
                    value={pagination.limit}
                    onChange={(e) => setPagination(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                    className="ml-2 px-2 py-1 text-sm border rounded hover:border-blue-500 focus:outline-none focus:border-blue-500"
                >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                </select>
            </div>
        </div>
    );
}
