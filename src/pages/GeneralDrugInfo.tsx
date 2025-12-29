import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Pill, Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDrugInfoData, searchDrugInfo, DrugInfoItem, SearchParams } from '../services/generalInfo';
import { cn } from '../utils/cn';

export default function GeneralDrugInfo() {
    const [data, setData] = useState<DrugInfoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [totalPages, setTotalPages] = useState(1);

    // Form state
    const [formValues, setFormValues] = useState<SearchParams>({
        geneName: '',
        drugName: '',
        alterationName: '',
        cancerMainType: '',
        cancerSubType: '',
    });

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getDrugInfoData(pagination.current, pagination.pageSize);
            setData(response.drugInformationModels);
            setTotalPages(response.totalPages);
        } catch (e: any) {
            console.error('Error fetching drug info:', e);
            setError(e?.message || 'Có lỗi xảy ra khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await searchDrugInfo(pagination.current, pagination.pageSize, formValues);
            setData(response.data);
            setTotalPages(response.totalPages);
        } catch (e: any) {
            console.error('Error searching drug info:', e);
            setError(e?.message || 'Có lỗi xảy ra khi tìm kiếm');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof SearchParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, current: page }));
    };

    if (loading && data.length === 0) {
        return (
            <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
        );
    }

    if (error && data.length === 0) {
        return (
            <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={fetchData}
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
                    <Pill className="w-7 h-7 text-teal-500" />
                    CHUYÊN GIA ĐIỀU TRỊ ĐÍCH
                </h1>
                <p className="text-slate-500">Thông tin thuốc điều trị đích theo gen và đột biến</p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <form onSubmit={handleSearch}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tên Gene</label>
                            <input
                                type="text"
                                placeholder="Nhập tên gene..."
                                value={formValues.geneName}
                                onChange={handleInputChange('geneName')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tên thuốc</label>
                            <input
                                type="text"
                                placeholder="Nhập tên thuốc..."
                                value={formValues.drugName}
                                onChange={handleInputChange('drugName')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Đột biến</label>
                            <input
                                type="text"
                                placeholder="Nhập đột biến..."
                                value={formValues.alterationName}
                                onChange={handleInputChange('alterationName')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Main type</label>
                            <input
                                type="text"
                                placeholder="Nhập loại ung thư (Main type)..."
                                value={formValues.cancerMainType}
                                onChange={handleInputChange('cancerMainType')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Sub type</label>
                            <input
                                type="text"
                                placeholder="Nhập loại ung thư (Sub type)..."
                                value={formValues.cancerSubType}
                                onChange={handleInputChange('cancerSubType')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </form>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                {/* Header */}
                <div className="p-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-teal-900">Thông tin thuốc</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">LOẠI UNG THƯ (MAIN TYPE)</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">LOẠI UNG THƯ (SUB TYPE)</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">GEN</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">ĐỘT BIẾN</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">LEVEL</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">THUỐC ĐIỀU TRỊ</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">DẪN CHỨNG</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                                        Không tìm thấy dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr key={item._id || index} className="hover:bg-teal-50/30 transition-colors">
                                        <td className="px-4 py-3 text-sm text-slate-700 text-center">{item.cancer_main_type}</td>
                                        <td className="px-4 py-3 text-sm text-slate-600 text-center">{item.cancer_sub_type}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700 font-medium text-center">{item.gene}</td>
                                        <td className="px-4 py-3 text-sm text-slate-600 text-center">{item.alteration_name}</td>
                                        <td className="px-4 py-3 text-sm text-center">
                                            <span className={cn(
                                                "px-2 py-1 rounded-full text-xs font-medium",
                                                item.level === '1' || item.level === 'LEVEL_1'
                                                    ? "bg-green-100 text-green-700"
                                                    : item.level === '2' || item.level === 'LEVEL_2'
                                                        ? "bg-blue-100 text-blue-700"
                                                        : item.level === '3' || item.level === 'LEVEL_3'
                                                            ? "bg-amber-100 text-amber-700"
                                                            : "bg-slate-100 text-slate-600"
                                            )}>
                                                {item.level}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {item.drug?.slice(0, 3).map((d, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded text-xs"
                                                    >
                                                        {d}
                                                    </span>
                                                ))}
                                                {item.drug?.length > 3 && (
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                                                        +{item.drug.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <Link
                                                to={`/drug/${item._id}`}
                                                className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 hover:underline text-sm font-medium"
                                            >
                                                {item.articles?.length || 0}
                                                <ExternalLink className="w-3 h-3" />
                                            </Link>
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
        </div>
    );
}
