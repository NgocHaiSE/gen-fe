import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pill, Loader2, Calendar, FileText, Beaker, Syringe } from 'lucide-react';
import { getApprovedDrugs, getNotApprovedDrugs, getFDADrugs, DrugTherapyMetadata } from '../services/generalInfo';
import { cn } from '../utils/cn';

type TabType = 'active' | 'expired' | 'fda';

// Updated interfaces to match actual API response
interface Medicine {
    _id: string;
    medicine_name: string;
    content?: string;
    dosage_form?: string;
    packing?: string;
    company_name?: string;
    circulation_permit?: string;
    approved?: boolean;
}

interface ApprovedDrugItem {
    _id: string;
    component: string;
    cure: string;
    gene: string;
    approved: boolean;
    medicines: Medicine[];
}

interface FDADrugItem {
    _id: string;
    medicine_name: string;
    type: string;
    fda_approved?: boolean;
    link_evidence?: string;
    link_image?: string;
    text_evidence_us?: string;
    text_evidence_vn?: string;
}

export default function DrugTherapy() {
    const [activeTab, setActiveTab] = useState<TabType>('active');
    const [data, setData] = useState<ApprovedDrugItem[] | FDADrugItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [metadata, setMetadata] = useState<DrugTherapyMetadata | null>(null);

    const tabs = [
        { id: 'active' as TabType, label: 'Còn hạn', icon: Calendar },
        { id: 'expired' as TabType, label: 'Hết hạn', icon: Calendar },
        { id: 'fda' as TabType, label: 'FDA', icon: FileText },
    ];

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (activeTab === 'active') {
                response = await getApprovedDrugs(currentPage);
            } else if (activeTab === 'expired') {
                response = await getNotApprovedDrugs(currentPage);
            } else {
                response = await getFDADrugs(currentPage);
            }
            setData(response.data || []);
            // Handle different metadata structure
            const meta = response.metadata;
            if (meta) {
                setMetadata({
                    currentPage: meta.currentPage || currentPage,
                    totalPages: meta.totalPage || meta.totalPages || 1,
                    totalItems: meta.totalItems || 0
                });
            }
        } catch (e: any) {
            console.error('Error fetching drug therapy data:', e);
            setError(e?.message || 'Có lỗi xảy ra khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab, currentPage]);

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = metadata?.totalPages || 1;

    // Expandable row for medicine details
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const renderApprovedTableWithDetails = () => {
        const items = data as ApprovedDrugItem[];
        return (
            <div className="divide-y divide-slate-100">
                {items.length === 0 ? (
                    <div className="px-4 py-8 text-center text-slate-500">
                        Không tìm thấy dữ liệu
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div key={item._id || index}>
                            {/* Main Row */}
                            <div
                                className="px-4 py-4 hover:bg-teal-50/30 transition-colors cursor-pointer flex items-start gap-4"
                                onClick={() => setExpandedRow(expandedRow === item._id ? null : item._id)}
                            >
                                <div className="flex-shrink-0 p-2 bg-teal-100 rounded-lg">
                                    <Beaker className="w-5 h-5 text-teal-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-teal-900">{item.component}</h3>
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-xs font-medium",
                                            activeTab === 'active'
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        )}>
                                            {activeTab === 'active' ? 'Còn hạn' : 'Hết hạn'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{item.cure}</p>
                                    <p className="text-xs text-slate-500">{item.gene}</p>
                                </div>
                                <div className="flex-shrink-0 text-right">
                                    <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-sm font-medium">
                                        {item.medicines?.length || 0} thuốc
                                    </span>
                                </div>
                            </div>

                            {/* Expanded Medicines */}
                            {expandedRow === item._id && item.medicines?.length > 0 && (
                                <div className="px-4 pb-4 bg-slate-50">
                                    <div className="pl-11">
                                        <h4 className="text-sm font-medium text-slate-700 mb-2">Danh sách thuốc:</h4>
                                        <div className="grid gap-2">
                                            {item.medicines.map((med, i) => (
                                                <div
                                                    key={med._id || i}
                                                    className="bg-white rounded-lg p-3 border border-slate-200"
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <Syringe className="w-4 h-4 text-teal-500 mt-0.5" />
                                                        <div className="flex-1">
                                                            <p className="font-medium text-slate-800">{med.medicine_name}</p>
                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-xs text-slate-600">
                                                                {med.content && <p><span className="text-slate-400">Hàm lượng:</span> {med.content}</p>}
                                                                {med.dosage_form && <p><span className="text-slate-400">Dạng bào chế:</span> {med.dosage_form}</p>}
                                                                {med.packing && <p><span className="text-slate-400">Đóng gói:</span> {med.packing}</p>}
                                                                {med.company_name && med.company_name !== 'null' && (
                                                                    <p><span className="text-slate-400">Công ty:</span> {med.company_name}</p>
                                                                )}
                                                                {med.circulation_permit && med.circulation_permit !== 'null' && (
                                                                    <p><span className="text-slate-400">Số ĐK:</span> {med.circulation_permit}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        );
    };

    const renderFDATable = () => {
        const items = data as FDADrugItem[];
        return (
            <div className="divide-y divide-slate-100">
                {items.length === 0 ? (
                    <div className="px-4 py-8 text-center text-slate-500">
                        Không tìm thấy dữ liệu
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="p-4 hover:bg-teal-50/30 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                {/* Drug Image */}
                                {item.link_image && (
                                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                                        <img
                                            src={item.link_image}
                                            alt={item.medicine_name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Drug Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-teal-900 text-lg">
                                            {item.medicine_name}
                                        </h3>
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                            FDA Approved
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded text-sm">
                                            {item.type}
                                        </span>
                                    </div>

                                    {/* Evidence Text */}
                                    <p className="text-sm text-slate-600 line-clamp-3 mb-2">
                                        {item.text_evidence_vn || item.text_evidence_us || 'Không có thông tin'}
                                    </p>

                                    {/* Link */}
                                    {item.link_evidence && (
                                        <a
                                            href={item.link_evidence}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800 hover:underline"
                                        >
                                            <FileText className="w-3 h-3" />
                                            Xem dẫn chứng
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                    <Pill className="w-7 h-7 text-teal-500" />
                    CHUYÊN GIA THUỐC ĐIỀU TRỊ
                </h1>
                <p className="text-slate-500">Thông tin thuốc điều trị ung thư được cấp phép</p>
            </div>

            {/* Tabs & Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                {/* Tab Navigation */}
                <div className="border-b border-slate-200">
                    <nav className="flex -mb-px" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={cn(
                                        "px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                                        activeTab === tab.id
                                            ? "border-teal-500 text-teal-700 bg-teal-50/50"
                                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px]">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={fetchData}
                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Table/List */}
                        <div className="overflow-x-auto">
                            {activeTab === 'fda' ? renderFDATable() : renderApprovedTableWithDetails()}
                        </div>

                        {/* Pagination */}
                        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Trang {currentPage} / {totalPages}
                                {metadata?.totalItems ? ` (Tổng: ${metadata.totalItems.toLocaleString()} thuốc)` : ''}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage <= 1}
                                    className={cn(
                                        "p-2 rounded-lg border transition-colors",
                                        currentPage <= 1
                                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                            : "bg-white text-teal-600 border-teal-200 hover:bg-teal-50"
                                    )}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                                    const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + idx;
                                    if (pageNum > totalPages) return null;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={cn(
                                                "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                                                pageNum === currentPage
                                                    ? "bg-teal-500 text-white"
                                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-teal-50"
                                            )}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage >= totalPages}
                                    className={cn(
                                        "p-2 rounded-lg border transition-colors",
                                        currentPage >= totalPages
                                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                            : "bg-white text-teal-600 border-teal-200 hover:bg-teal-50"
                                    )}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
