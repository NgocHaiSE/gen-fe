import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Search, Plus, Trash2, Download, Upload, FileText, FlaskConical,
    RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import request from '../utils/request';

// ==================== TYPES ====================
interface TestCase {
    _id: string;
    patientID: string;
    patientName: string;
    primaryTissue: string;
    testName: string;
    status?: string;
    createdAt?: string;
}

// ==================== CONSTANTS ====================
const tissueLabels: Record<string, { name: string; color: string }> = {
    lung: { name: 'Phổi', color: 'bg-red-100 text-red-700 border-red-200' },
    breast: { name: 'Vú', color: 'bg-pink-100 text-pink-700 border-pink-200' },
    hepatocellular_carcinoma: { name: 'Gan', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    large_intestine: { name: 'Đại tràng', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    thyroid: { name: 'Tuyến giáp', color: 'bg-green-100 text-green-700 border-green-200' },
};

// ==================== MAIN TESTLIST COMPONENT ====================
const TestList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [data, setData] = useState<TestCase[]>([]);
    const [resultStatus, setResultStatus] = useState<Record<string, { read1: boolean; read2: boolean }>>({});
    const [detailList, setDetailList] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
    const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '10'));
    const [totalPages, setTotalPages] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [uploadModal, setUploadModal] = useState<{ visible: boolean; patientId: string; readType: 'read1' | 'read2' } | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadDropdown, setUploadDropdown] = useState<string | null>(null);

    const [newTest, setNewTest] = useState({ patientID: '', patientName: '', primaryTissue: '', testName: '' });
    const pageSizeOptions = [10, 20, 50, 100];

    // Fetch data
    const fetchData = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const response = await request.get(`/test-case?page=${page}&limit=${limit}`);
            const result = response.data;
            setData(result.testCaseModels || result.data || []);
            setTotalPages(result.totalPages || 1);
        } catch (error) {
            console.error('Error fetching test cases:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch file status & detail list (non-blocking, runs in background)
    const fetchStatus = async (page: number, limit: number) => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://aicancer.io.vn/api';

        // Fetch detail list first (list of patient IDs with results)
        try {
            const response = await fetch(`${baseUrl}/test-case/detail?page=${page}&limit=${limit}`);
            if (response.ok) {
                const data = await response.json();
                setDetailList(Array.isArray(data) ? data : (data.IDTest || []));
            } else {
                setDetailList([]);
            }
        } catch (error) {
            console.log('Detail list not available');
            setDetailList([]);
        }

        // Fetch file status (may be slow/timeout)
        try {
            const response = await fetch(`${baseUrl}/test-case/file-name`);
            if (response.ok) {
                const raw = await response.json();
                const statusMap: Record<string, { read1: boolean; read2: boolean }> = {};
                if (Array.isArray(raw)) {
                    raw.forEach((entry: any) => {
                        if (typeof entry === 'string') {
                            const m = entry.match(/^(.+?)_read(1|2)$/i);
                            if (m) {
                                if (!statusMap[m[1]]) statusMap[m[1]] = { read1: false, read2: false };
                                if (m[2] === '1') statusMap[m[1]].read1 = true;
                                if (m[2] === '2') statusMap[m[1]].read2 = true;
                            }
                        }
                    });
                }
                setResultStatus(statusMap);
            } else {
                setResultStatus({});
            }
        } catch (error) {
            console.log('File status not available');
            setResultStatus({});
        }
    };

    useEffect(() => {
        fetchData(currentPage, pageSize);
        fetchStatus(currentPage, pageSize);
    }, [currentPage, pageSize]);

    // Search filter
    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data;
        const search = searchTerm.toLowerCase();
        return data.filter(item =>
            item.patientID?.toLowerCase().includes(search) ||
            item.patientName?.toLowerCase().includes(search) ||
            item.testName?.toLowerCase().includes(search)
        );
    }, [data, searchTerm]);

    // Delete
    const handleDelete = async (id: string, patientID: string) => {
        if (!window.confirm(`Bạn muốn xóa xét nghiệm ID: ${patientID}?`)) return;
        try {
            await request.delete(`/test-case/delete/${id}`);
            fetchData(currentPage, pageSize);
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    // Add new test
    const handleAddTest = async () => {
        if (!newTest.patientID || !newTest.patientName) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            await request.post('/test-case/add', newTest);
            setShowAddModal(false);
            setNewTest({ patientID: '', patientName: '', primaryTissue: '', testName: '' });
            fetchData(currentPage, pageSize);
        } catch (error) {
            console.error('Error adding:', error);
        }
    };

    // Download
    const handleDownload = async (item: TestCase) => {
        try {
            const response = await request.post('/test-case/download', item, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = `KQXN_${item.patientName}.docx`;
            link.click();
        } catch (error) {
            console.error('Error downloading:', error);
        }
    };

    // Open upload modal for specific read type
    const openUploadModal = (patientId: string, readType: 'read1' | 'read2') => {
        setUploadModal({ visible: true, patientId, readType });
        setUploadDropdown(null);
        setUploadFile(null);
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!uploadModal || !uploadFile) {
            alert('Vui lòng chọn file để upload');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('readType', uploadModal.readType);
            formData.append('patientID', uploadModal.patientId);
            formData.append('file', uploadFile);

            await request.post('/test-case/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Upload thành công!');
            setUploadModal(null);
            setUploadFile(null);

            // Refresh status after upload
            fetchStatus(currentPage, pageSize);
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Upload thất bại!');
        } finally {
            setUploading(false);
        }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = () => {
        if (uploadDropdown) setUploadDropdown(null);
    };

    // Get status badge
    const getStatusBadge = (patientID: string) => {
        if (detailList.includes(patientID)) {
            return (
                <button
                    onClick={() => navigate(`/tests/detail/${patientID}?page=${currentPage}&pageSize=${pageSize}`)}
                    className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                >
                    Chi tiết
                </button>
            );
        }
        const status = resultStatus[patientID];
        if (status?.read1 && status?.read2) {
            return <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium">Đang xử lý</span>;
        } else if (status?.read1) {
            return <span className="px-3 py-1 bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-medium">Đã thêm Read 1</span>;
        } else if (status?.read2) {
            return <span className="px-3 py-1 bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-medium">Đã thêm Read 2</span>;
        }
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-lg text-xs font-medium">Chưa có dữ liệu</span>;
    };

    const inputClass = "w-full px-3 py-2 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm";

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 flex items-center gap-3">
                            <FlaskConical className="w-7 h-7 text-teal-500" />
                            DANH SÁCH XÉT NGHIỆM
                        </h1>
                        <p className="text-slate-medium mt-1">Quản lý các xét nghiệm gen của bệnh nhân</p>
                    </div>
                    <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium">
                        <Plus className="w-5 h-5" />
                        Thêm xét nghiệm
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-4">
                <div className="flex gap-4 items-center">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-medium w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo mã hồ sơ, tên bệnh nhân..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={() => fetchData(currentPage, pageSize)} className="flex items-center gap-2 px-4 py-2.5 border border-slate-light rounded-lg hover:bg-slate-50">
                        <RefreshCw className="w-4 h-4" />
                        Làm mới
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-teal-50 border-b border-slate-light">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Mã hồ sơ</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Tên bệnh nhân</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Mẫu mô</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Mẫu bệnh phẩm</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-teal-900">Tùy chọn</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-teal-900">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
                                        <p className="text-slate-medium">Đang tải...</p>
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12">
                                        <FileText className="w-12 h-12 text-slate-light mx-auto mb-2" />
                                        <p className="text-slate-medium">Chưa có xét nghiệm nào</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <tr key={item._id} className="border-b border-slate-light hover:bg-teal-50/30 transition-colors">
                                        <td className="py-3 px-4 text-sm font-medium text-slate-dark">{item.patientID}</td>
                                        <td className="py-3 px-4 text-sm text-slate-dark">{item.patientName}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${tissueLabels[item.primaryTissue]?.color || 'bg-gray-100 text-gray-700'}`}>
                                                {tissueLabels[item.primaryTissue]?.name || item.primaryTissue}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-dark">{item.testName}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center gap-1">
                                                {/* Upload dropdown */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setUploadDropdown(uploadDropdown === item.patientID ? null : item.patientID)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                                                        title="Upload file"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                    </button>
                                                    {uploadDropdown === item.patientID && (
                                                        <div className="absolute z-10 right-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-light py-1 min-w-[120px]">
                                                            <button
                                                                onClick={() => openUploadModal(item.patientID, 'read1')}
                                                                className="w-full text-left px-4 py-2 text-sm hover:bg-teal-50 text-slate-dark"
                                                            >
                                                                Read 1
                                                            </button>
                                                            <button
                                                                onClick={() => openUploadModal(item.patientID, 'read2')}
                                                                className="w-full text-left px-4 py-2 text-sm hover:bg-teal-50 text-slate-dark"
                                                            >
                                                                Read 2
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <button onClick={() => handleDownload(item)} disabled={!detailList.includes(item.patientID)} className="p-2 text-green-600 hover:bg-green-100 rounded-md disabled:opacity-50" title="Tải xuống">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(item._id, item.patientID)} className="p-2 text-red-600 hover:bg-red-100 rounded-md" title="Xóa">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center">{getStatusBadge(item.patientID)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-slate-light">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-medium">Hiển thị</span>
                        <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }} className="px-3 py-1.5 border border-slate-light rounded-md text-sm">
                            {pageSizeOptions.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>
                        <span className="text-sm text-slate-medium">bản ghi / trang</span>
                    </div>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md border border-slate-light hover:bg-teal-50 disabled:opacity-50">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let num = i + 1;
                                if (totalPages > 5) {
                                    if (currentPage <= 3) num = i + 1;
                                    else if (currentPage >= totalPages - 2) num = totalPages - 4 + i;
                                    else num = currentPage - 2 + i;
                                }
                                return (
                                    <button key={`page-${i}-${num}`} onClick={() => setCurrentPage(num)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentPage === num ? 'bg-teal-500 text-white' : 'border border-slate-light hover:bg-teal-50'}`}>
                                        {num}
                                    </button>
                                );
                            })}
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-md border border-slate-light hover:bg-teal-50 disabled:opacity-50">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                        <div className="p-6 border-b border-slate-light">
                            <h2 className="text-lg font-bold text-teal-900">Thêm xét nghiệm mới</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-dark mb-1">Mã hồ sơ *</label>
                                <input type="text" className={inputClass} value={newTest.patientID} onChange={(e) => setNewTest({ ...newTest, patientID: e.target.value })} placeholder="VD: XN001" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-dark mb-1">Tên bệnh nhân *</label>
                                <input type="text" className={inputClass} value={newTest.patientName} onChange={(e) => setNewTest({ ...newTest, patientName: e.target.value })} placeholder="VD: Nguyễn Văn A" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-dark mb-1">Mẫu mô</label>
                                <select className={inputClass} value={newTest.primaryTissue} onChange={(e) => setNewTest({ ...newTest, primaryTissue: e.target.value })}>
                                    <option value="">Chọn loại mô</option>
                                    <option value="lung">Phổi</option>
                                    <option value="breast">Vú</option>
                                    <option value="hepatocellular_carcinoma">Gan</option>
                                    <option value="large_intestine">Đại tràng</option>
                                    <option value="thyroid">Tuyến giáp</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-dark mb-1">Mẫu bệnh phẩm</label>
                                <input type="text" className={inputClass} value={newTest.testName} onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })} placeholder="VD: FFPE, DNA..." />
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-light flex justify-end gap-3">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-light rounded-lg hover:bg-slate-50">Hủy</button>
                            <button onClick={handleAddTest} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Thêm mới</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {uploadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClickOutside}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-light">
                            <h2 className="text-lg font-bold text-teal-900">
                                Upload file - {uploadModal.readType === 'read1' ? 'Read 1' : 'Read 2'}
                            </h2>
                            <p className="text-sm text-slate-medium mt-1">Mã xét nghiệm: {uploadModal.patientId}</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-dark mb-2">Chọn file</label>
                                <input
                                    type="file"
                                    accept=".gz,.bam,.sam,.vcf,.fastq"
                                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-slate-dark file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                />
                                <p className="text-xs text-slate-medium mt-2">Hỗ trợ: .gz, .bam, .sam, .vcf, .fastq</p>
                            </div>
                            {uploadFile && (
                                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                                    <p className="text-sm text-teal-800">Đã chọn: {uploadFile.name}</p>
                                    <p className="text-xs text-teal-600">Size: {(uploadFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-slate-light flex justify-end gap-3">
                            <button
                                onClick={() => { setUploadModal(null); setUploadFile(null); }}
                                className="px-4 py-2 border border-slate-light rounded-lg hover:bg-slate-50"
                                disabled={uploading}
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleFileUpload}
                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                                disabled={!uploadFile || uploading}
                            >
                                {uploading ? 'Đang upload...' : 'Upload'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestList;
