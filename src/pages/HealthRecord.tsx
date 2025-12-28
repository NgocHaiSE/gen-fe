import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import request from '../utils/request';

interface HealthRecordData {
    id: string;
    PatineId: string;
    fullname: string;
    dob: string;
    typeHealthRecord: string;
}

interface HealthRecordProps {
    type: string;
}

const HealthRecord = ({ type }: HealthRecordProps) => {
    const navigate = useNavigate();
    const [records, setRecords] = useState<HealthRecordData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const pageSizeOptions = [10, 20, 50, 100];

    // Get record type from cancer type (e.g., lung-cancer -> lung-record)
    const getRecordType = () => {
        return type.replace('cancer', 'record');
    };

    // Fetch records from API
    const fetchRecords = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const recordType = getRecordType();
            // API endpoint: /{recordType}/get-all?page=X&limit=Y
            const response = await request.get(`/${recordType}/get-all`, {
                params: { page, limit }
            });
            const data = response.data?.data || response.data || [];
            setRecords(Array.isArray(data) ? data.map((item: any) => ({
                ...item,
                typeHealthRecord: recordType
            })) : []);
        } catch (error) {
            console.error('Error fetching health records:', error);
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    // Search health records
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchRecords(currentPage, pageSize);
            return;
        }

        setLoading(true);
        try {
            const recordType = getRecordType();
            // API endpoint: /{recordType}/search
            const response = await request.post(`/${recordType}/search`, {
                healthRecordId: searchQuery
            });
            const data = response.data?.data || response.data || [];
            setRecords(Array.isArray(data) ? data.map((item: any) => ({
                ...item,
                typeHealthRecord: recordType
            })) : []);
        } catch (error) {
            console.error('Error searching health records:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete health record
    const handleDeleteRecord = async (recordType: string, id: string) => {
        if (!window.confirm('Bạn có chắc muốn xóa bệnh án này?')) return;

        try {
            // API endpoint: /{recordType}/delete-health-record
            await request.post(`/${recordType}/delete-health-record`, { id });
            // Reload records after delete
            fetchRecords(currentPage, pageSize);
        } catch (error) {
            console.error('Error deleting health record:', error);
        }
    };

    // Navigate to create/edit health record
    const handleCreateHealthRecord = (recordType: string, id: number | string = 0) => {
        navigate(`/health-record/${recordType}/${id}`);
    };

    useEffect(() => {
        fetchRecords(currentPage, pageSize);
    }, [type, currentPage, pageSize]);

    // Reset on type change
    useEffect(() => {
        setCurrentPage(1);
        setSearchQuery('');
    }, [type]);

    // Filter records by search (client-side fallback)
    const filteredRecords = records.filter(record =>
        record.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.PatineId?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / pageSize);

    // Paginate records
    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const getCancerName = () => {
        switch (type) {
            case 'lung-cancer': return 'Ung thư phổi';
            case 'liver-cancer': return 'Ung thư gan';
            case 'breast-cancer': return 'Ung thư vú';
            case 'thyroid-cancer': return 'Ung thư tuyến giáp';
            case 'colorectal-cancer': return 'Ung thư đại trực tràng';
            default: return '';
        }
    };

    return (
        <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light animate-fade-in">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-slate-light pb-2 uppercase">
                QUẢN LÝ BỆNH ÁN - {getCancerName().toUpperCase()}
            </h1>

            {/* Search Form */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-medium w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Hãy nhập mã bệnh án..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2.5 border border-slate-light rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                        Tìm kiếm
                    </button>
                </div>

                {/* Add button */}
                <button
                    onClick={() => handleCreateHealthRecord(getRecordType())}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm"
                >
                    <Plus className="w-5 h-5" />
                    Thêm bệnh án
                </button>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-slate-medium">
                Tổng số: <span className="font-semibold text-teal-700">{filteredRecords.length}</span> bệnh án
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-teal-50 border-b border-slate-light">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">ID bệnh nhân</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Họ tên</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Năm sinh</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-teal-900">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-slate-medium">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : paginatedRecords.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8">
                                    <FileText className="w-12 h-12 text-slate-light mx-auto mb-2" />
                                    <p className="text-slate-medium">Chưa có bệnh án nào</p>
                                </td>
                            </tr>
                        ) : (
                            paginatedRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className="border-b border-slate-light hover:bg-teal-50/50 transition-colors"
                                >
                                    <td className="py-3 px-4 text-sm text-slate-dark font-medium">{record.PatineId}</td>
                                    <td className="py-3 px-4 text-sm text-slate-dark">{record.fullname}</td>
                                    <td className="py-3 px-4 text-sm text-slate-dark">{record.dob}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleCreateHealthRecord(record.typeHealthRecord, record.id)}
                                                className="p-2 text-teal-600 hover:bg-teal-100 rounded-md transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRecord(record.typeHealthRecord, record.id)}
                                                className="p-2 text-error-red hover:bg-red-100 rounded-md transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                {/* Page size selector */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-medium">Hiển thị</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="px-3 py-1.5 border border-slate-light rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        {pageSizeOptions.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <span className="text-sm text-slate-medium">bản ghi / trang</span>
                </div>

                {/* Page navigation */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md border border-slate-light hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
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
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentPage === pageNum
                                        ? 'bg-teal-500 text-white'
                                        : 'border border-slate-light hover:bg-teal-50 text-slate-dark'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md border border-slate-light hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthRecord;
