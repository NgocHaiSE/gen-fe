import { useState, useEffect } from 'react';
import { API_SERVER } from '../config/api';

interface DrugItem {
    _id?: string;
    'Gene name': string;
    'Genomic Position': string;
    'CDS Mutation': string;
    'AA Mutation': string;
    'rs value': string;
    'Therapies': string;
    'therapy_rank': number;
    'Disease': string;
    'Response to Drug': string;
    pmid: string[];
}

interface DrugTreatmentProps {
    type: string;
}

const regionOptions = [
    { value: 'asia', label: 'Châu Á' },
    { value: 'world', label: 'Quốc tế' },
];

const getCancerTypeParam = (type: string): string => {
    const map: Record<string, string> = {
        'lung-cancer': 'lung',
        'liver-cancer': 'hepatocellular_carcinoma',
        'breast-cancer': 'breast',
        'thyroid-cancer': 'thyroid',
        'colorectal-cancer': 'large_intestine',
    };
    return map[type] || '';
};

const getClassificationName = (rank: number): string => {
    switch (rank) {
        case 1: return 'Việt Nam';
        case 2: return 'Hết hạn';
        case 3: return 'FDA phê duyệt';
        case 4: return 'Tổ chức khác';
        default: return '';
    }
};

export default function DrugTreatment({ type }: DrugTreatmentProps) {
    const [data, setData] = useState<DrugItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValues, setSearchValues] = useState({ region: 'asia', geneName: '' });

    const pageSize = 5;
    const typeCancer = getCancerTypeParam(type);

    const fetchData = async (page: number, isSearch = false, values = searchValues) => {
        setLoading(true);
        setError(null);

        try {
            let url: string;
            let options: RequestInit = {};

            if (isSearch && values.geneName) {
                url = `${API_SERVER}/drugs-information/search-drug?page=${page}&limit=${pageSize}&typeCancer=${typeCancer}`;
                options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                };
            } else {
                url = `${API_SERVER}/drugs-information/get?page=${page}&limit=${pageSize}&typeCancer=${typeCancer}`;
            }

            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Failed to fetch data');
            const json = await response.json();

            setData(json.dataDrug || []);
            setTotalItems(json.totalItems || 0);
        } catch (err) {
            console.error('Error fetching drug info:', err);
            setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    // Reset to page 1 when cancer type changes
    useEffect(() => {
        setCurrentPage(1);
        setIsSearching(false);
        setSearchValues({ region: 'asia', geneName: '' });
    }, [type]);

    useEffect(() => {
        if (isSearching && searchValues.geneName) {
            fetchData(currentPage, true, searchValues);
        } else {
            fetchData(currentPage);
        }
    }, [currentPage, type]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        setIsSearching(true);
        fetchData(1, true, searchValues);
    };

    const handleReset = () => {
        setSearchValues({ region: 'asia', geneName: '' });
        setCurrentPage(1);
        setIsSearching(false);
        fetchData(1, false);
    };

    const renderPmidLinks = (pmidList: string[]) => {
        if (!pmidList || pmidList.length === 0) {
            return <span className="text-gray-500">Không có</span>;
        }

        if (pmidList.length === 1) {
            const pmid = pmidList[0];
            const parts = pmid.split(':');
            const href = parts[0] === 'PubMed'
                ? `https://pubmed.ncbi.nlm.nih.gov/${parts[1]}`
                : `https://clinicaltrials.gov/ct2/show/${parts[1]}`;

            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 py-1 bg-medical-accent text-white text-xs rounded hover:bg-medical-accent-hover transition-colors"
                >
                    Xem
                </a>
            );
        }

        return (
            <div className="flex flex-wrap gap-1">
                {pmidList.map((pmid, idx) => {
                    const parts = pmid.split(':');
                    const href = parts[0] === 'PubMed'
                        ? `https://pubmed.ncbi.nlm.nih.gov/${parts[1]}`
                        : `https://clinicaltrials.gov/ct2/show/${parts[1]}`;

                    return (
                        <a
                            key={idx}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-1 bg-medical-secondary text-medical-primary text-xs rounded hover:bg-medical-accent hover:text-white transition-colors"
                        >
                            {parts[0]}: {parts[1]}
                        </a>
                    );
                })}
            </div>
        );
    };

    const totalPages = Math.ceil(totalItems / pageSize);

    if (loading && data.length === 0) {
        return (
            <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(6)].map((_, j) => (
                                <div key={j} className="h-5 bg-gray-100 rounded"></div>
                            ))}
                        </div>
                    </div>
                ))}
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
        <div className="space-y-4">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-teal-900 mb-4 uppercase">THUỐC ĐIỀU TRỊ ĐÍCH</h1>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Khu vực</label>
                        <select
                            value={searchValues.region}
                            onChange={(e) => setSearchValues(prev => ({ ...prev, region: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-medical-accent focus:border-medical-accent"
                        >
                            {regionOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên gene</label>
                        <input
                            type="text"
                            placeholder="Nhập tên gene"
                            value={searchValues.geneName}
                            onChange={(e) => setSearchValues(prev => ({ ...prev, geneName: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-medical-accent focus:border-medical-accent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-medical-accent text-white rounded-md hover:bg-medical-accent-hover transition-colors font-medium"
                        >
                            Tìm kiếm
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                        >
                            Đặt lại
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Count & Page Info */}
            {totalItems > 0 && (
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Tổng <span className="font-semibold text-medical-primary">{totalItems}</span> kết quả</span>
                    <span>Trang <span className="font-semibold text-medical-primary">{currentPage}</span> / {totalPages}</span>
                </div>
            )}

            {/* Drug List */}
            {data.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                    Không tìm thấy kết quả
                </div>
            ) : (
                data.map((item, index) => (
                    <div key={item._id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* Gene Tag Header */}
                        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                            <span className="inline-flex items-center px-3 py-1 bg-medical-accent text-white text-sm font-medium rounded">
                                {item['Gene name']}
                            </span>
                        </div>

                        {/* Description Items */}
                        <div className="p-6">
                            <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Tên gene:</dt>
                                    <dd className="text-sm text-gray-900">{item['Gene name']}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Vị trí gene:</dt>
                                    <dd className="text-sm text-gray-900">{item['Genomic Position']}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Đột biến nucleotide:</dt>
                                    <dd className="text-sm text-gray-900">{item['CDS Mutation'] || 'Không có'}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Đột biến axit amin:</dt>
                                    <dd className="text-sm text-gray-900 break-all">{item['AA Mutation']}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Giá trị RS:</dt>
                                    <dd className="text-sm text-gray-900">{item['rs value'] || 'Không có'}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Thuốc đích:</dt>
                                    <dd className="text-sm text-gray-900 font-medium text-medical-accent">{item['Therapies']}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Phân loại thuốc:</dt>
                                    <dd className="text-sm">
                                        <span className="inline-flex items-center px-2 py-0.5 bg-medical-secondary text-medical-primary text-xs rounded">
                                            {getClassificationName(item['therapy_rank'])}
                                        </span>
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Bệnh:</dt>
                                    <dd className="text-sm text-gray-900">{item['Disease']}</dd>
                                </div>
                                <div className="flex">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Đáp ứng:</dt>
                                    <dd className="text-sm text-gray-900">{item['Response to Drug']}</dd>
                                </div>
                                <div className="flex col-span-full">
                                    <dt className="text-sm font-medium text-gray-500 w-36 flex-shrink-0">Tài liệu tham khảo:</dt>
                                    <dd className="text-sm">{renderPmidLinks(item.pmid)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage <= 1}
                        className="w-8 h-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:border-medical-accent hover:text-medical-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ‹
                    </button>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum: number;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center text-sm border rounded transition-colors ${currentPage === pageNum
                                    ? 'border-medical-accent text-medical-accent bg-medical-secondary'
                                    : 'border-gray-300 hover:border-medical-accent hover:text-medical-accent'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage >= totalPages}
                        className="w-8 h-8 flex items-center justify-center text-sm border border-gray-300 rounded hover:border-medical-accent hover:text-medical-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}
