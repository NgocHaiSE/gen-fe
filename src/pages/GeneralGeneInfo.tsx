import { useState, useEffect, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Dna, Loader2, FileText, X } from 'lucide-react';
import { getMutationData } from '../services/generalInfo';
import { cn } from '../utils/cn';

interface MutationData {
    id: string;
    gene_name: string;
    alteration_name: string;
    oncogenic: string;
    mutation_effect: string;
    articles: string[];
}

export default function GeneralGeneInfo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<MutationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [totalPages, setTotalPages] = useState(1);

    // Modal state
    const [selectedItem, setSelectedItem] = useState<MutationData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getMutationData(pagination.current, pagination.pageSize);
                const mutationData = response.mutationModels.map((obj: any) => ({
                    id: obj._id,
                    gene_name: obj.variant?.gene?.hugoSymbol || '',
                    alteration_name: obj.variant?.name || '',
                    oncogenic: obj.oncogenic || '',
                    mutation_effect: obj.mutationEffect || '',
                    articles: obj.variant?.gene?.geneAliases || [],
                }));
                setData(mutationData);
                setTotalPages(response.totalPages);
            } catch (e: any) {
                console.error('Error fetching mutation data:', e);
                setError(e?.message || 'Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [pagination.current, pagination.pageSize]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(item =>
            item.gene_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, current: page }));
    };

    const openModal = (item: MutationData) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    if (loading) {
        return (
            <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                    <Dna className="w-7 h-7 text-teal-500" />
                    CHUYÊN GIA GEN ĐỘT BIẾN
                </h1>
                <p className="text-slate-500">Danh sách thông tin gen đột biến từ OncoKB</p>
            </div>

            {/* Search & Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-teal-900">Danh sách gen đột biến</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Nhập tên gene..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">Gene</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">Đột biến</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">Oncogenic</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">Mutation Effect</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">Dẫn chứng</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                        Không tìm thấy dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-teal-50/30 transition-colors">
                                        <td className="px-4 py-3 text-sm text-slate-700 font-medium">{item.gene_name}</td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{item.alteration_name}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={cn(
                                                "px-2 py-1 rounded-full text-xs font-medium",
                                                item.oncogenic.toLowerCase().includes('oncogenic')
                                                    ? "bg-red-100 text-red-700"
                                                    : item.oncogenic.toLowerCase().includes('likely')
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-slate-100 text-slate-600"
                                            )}>
                                                {item.oncogenic}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{item.mutation_effect}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                {item.articles.length}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Trang {pagination.current} / {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(pagination.current - 1)}
                            disabled={pagination.current <= 1}
                            className={cn(
                                "p-2 rounded-lg border transition-colors",
                                pagination.current <= 1
                                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                    : "bg-white text-teal-600 border-teal-200 hover:bg-teal-50"
                            )}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                            const pageNum = Math.max(1, Math.min(pagination.current - 2, totalPages - 4)) + idx;
                            if (pageNum > totalPages) return null;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={cn(
                                        "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                                        pageNum === pagination.current
                                            ? "bg-teal-500 text-white"
                                            : "bg-white text-slate-600 border border-slate-200 hover:bg-teal-50"
                                    )}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => handlePageChange(pagination.current + 1)}
                            disabled={pagination.current >= totalPages}
                            className={cn(
                                "p-2 rounded-lg border transition-colors",
                                pagination.current >= totalPages
                                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                    : "bg-white text-teal-600 border-teal-200 hover:bg-teal-50"
                            )}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg animate-fade-in">
                        <div className="flex items-center justify-between p-4 border-b border-slate-200">
                            <div>
                                <h3 className="text-lg font-semibold text-teal-900">Dẫn chứng - Gene Aliases</h3>
                                <p className="text-sm text-slate-500">Gen: {selectedItem.gene_name} | Đột biến: {selectedItem.alteration_name}</p>
                            </div>
                            <button onClick={closeModal} className="p-1 hover:bg-slate-100 rounded">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            {selectedItem.articles.length === 0 ? (
                                <p className="text-slate-500 text-center py-4">Không có dẫn chứng</p>
                            ) : (
                                <div className="space-y-2">
                                    {selectedItem.articles.map((article, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-medium text-sm">
                                                {idx + 1}
                                            </div>
                                            <span className="text-slate-700 font-medium">{article}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-slate-200 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
