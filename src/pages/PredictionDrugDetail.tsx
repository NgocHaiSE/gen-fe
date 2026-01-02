import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Pill, ExternalLink, Loader2 } from 'lucide-react';
import request from '../utils/request';

interface DrugRecord {
    _id?: string;
    gene: string;
    position: string;
    aa_mutation: string;
    mutation: string;
    cds: string;
    drug: string;
    disease: string;
    priority: number;
    responsive: string;
    documents: string;
    nomenclature?: string;
    description?: string;
}

const PredictionDrugDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract ID from path
    const pathnameParts = location.pathname.split('/');
    const ID = pathnameParts[pathnameParts.length - 1];
    const searchParams = new URLSearchParams(location.search);
    const typeCancer = searchParams.get('typeCancer') || 'lung';

    // Get variants from navigation state (passed from TestDetail/CollectionDetail)
    const variants = (location.state as { variants?: string[] })?.variants || [];

    const [data, setData] = useState<DrugRecord[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [geneSearch, setGeneSearch] = useState('');
    const [drugSearch, setDrugSearch] = useState('');

    const pageSize = 5;

    const fetchDrugs = async (page = 1) => {
        try {
            setLoading(true);
            const body = {
                page,
                limit: pageSize,
                typeCancer,
                id: ID,
                gene: geneSearch,
                drug: drugSearch,
                variants,
            };

            // Use POST method like gen-fe's CRUDService.getService
            const response = await request.post('/drugs-information/get-drug', body);
            const responseData = response.data || response;

            setData(responseData.dataDrug || []);
            setTotalItems(responseData.totalItems || 0);
        } catch (error) {
            console.error('Error fetching drugs:', error);
            setData([]);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrugs(currentPage);
    }, [currentPage]);

    const handleSearch = () => {
        setCurrentPage(1);
        fetchDrugs(1);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <div className="p-4 md:p-6 min-h-screen bg-slate-50">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
            </button>

            {/* Search Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tìm theo Gene</label>
                        <input
                            type="text"
                            placeholder="VD: EGFR"
                            value={geneSearch}
                            onChange={(e) => setGeneSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tìm theo thuốc</label>
                        <input
                            type="text"
                            placeholder="VD: Gefitinib"
                            value={drugSearch}
                            onChange={(e) => setDrugSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleSearch}
                            className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        >
                            <Search className="w-4 h-4" />
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-teal-900 mb-1">Thuốc điều trị đích</h1>
                <p className="text-sm text-slate-500">Tổng hợp {totalItems} kết quả</p>
            </div>

            {/* Content */}
            {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-2" />
                    <p className="text-slate-500">Đang tải dữ liệu...</p>
                </div>
            ) : data.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                    <Pill className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Chưa có thuốc điều trị phù hợp</h3>
                    <p className="text-slate-500">Cơ sở dữ liệu hiện tại chưa ghi nhận thuốc điều trị cho bệnh nhân này.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1400px]">
                            <thead>
                                <tr className="bg-slate-50 border-b-2 border-slate-200">
                                    <th className="px-3 py-3 text-left text-sm font-semibold text-slate-700 w-24">Gene</th>
                                    <th className="px-3 py-3 text-left text-sm font-semibold text-slate-700 w-44">Thuốc điều trị</th>
                                    <th className="px-3 py-3 text-center text-sm font-semibold text-slate-700 w-28">Phản ứng</th>
                                    <th className="px-3 py-3 text-left text-sm font-semibold text-slate-700 w-52">Vị trí genomic</th>
                                    <th className="px-3 py-3 text-left text-sm font-semibold text-slate-700 w-36">AA Mutation</th>
                                    <th className="px-3 py-3 text-left text-sm font-semibold text-slate-700 w-32">CDS</th>
                                    <th className="px-3 py-3 text-left text-sm font-semibold text-slate-700 w-48">Biến thể</th>
                                    <th className="px-3 py-3 text-left text-sm font-semibold text-slate-700 w-44">Bệnh</th>
                                    <th className="px-3 py-3 text-center text-sm font-semibold text-slate-700 w-20">Priority</th>
                                    <th className="px-3 py-3 text-center text-sm font-semibold text-slate-700 w-24">Tài liệu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((drug, idx) => (
                                    <tr key={drug._id || `${drug.gene}-${idx}`} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-3 py-3">
                                            <span className="font-semibold text-slate-800 text-sm">{drug.gene}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="font-semibold text-slate-800 text-sm">{drug.drug}</span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span className="text-sm text-slate-600">{drug.responsive}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <code className="font-mono text-xs text-slate-600">{drug.position}</code>
                                        </td>
                                        <td className="px-3 py-3">
                                            <code className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono">{drug.aa_mutation}</code>
                                        </td>
                                        <td className="px-3 py-3">
                                            <code className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono">{drug.cds}</code>
                                        </td>
                                        <td className="px-3 py-3">
                                            <code className="font-mono text-xs text-slate-600">{drug.mutation}</code>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="text-sm text-slate-600">{drug.disease}</span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span className="text-sm text-slate-600">{drug.priority}</span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            {drug.documents ? (
                                                <a
                                                    href={drug.documents}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 text-sm"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    Link
                                                </a>
                                            ) : (
                                                <span className="text-slate-400 text-sm">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalItems)} của {totalItems} thuốc
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Trước
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
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
                                            className={`px-3 py-1 rounded text-sm ${currentPage === pageNum
                                                ? 'bg-teal-500 text-white'
                                                : 'border border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PredictionDrugDetail;
