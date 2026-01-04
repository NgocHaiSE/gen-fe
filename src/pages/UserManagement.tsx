import { useState, useEffect } from 'react';
import { Users, Plus, Pencil, Trash2, Search, Loader2, X, AlertTriangle, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllUsers, addUser, updateUser, deleteUser, User, CreateUserParams, UpdateUserParams } from '../services/userService';
import { cn } from '../utils/cn';

type ModalType = 'add' | 'edit' | 'delete' | null;

interface FormData {
    email: string;
    password: string;
    name: string;
    access: 'doctor' | 'user';
}

const accessLabels: Record<string, { label: string; bgColor: string; textColor: string }> = {
    admin: { label: 'Quản trị viên', bgColor: 'bg-red-100', textColor: 'text-red-700' },
    doctor: { label: 'Bác sĩ', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
    user: { label: 'Người dùng', bgColor: 'bg-green-100', textColor: 'text-green-700' },
};

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        name: '',
        access: 'user',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchTerm, users]);

    const openAddModal = () => {
        setFormData({ email: '', password: '', name: '', access: 'user' });
        setModalType('add');
        setError(null);
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setFormData({
            email: user.email,
            password: '',
            name: user.name || '',
            access: user.access === 'admin' ? 'user' : user.access,
        });
        setModalType('edit');
        setError(null);
    };

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setModalType('delete');
        setError(null);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedUser(null);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (modalType === 'add') {
                await addUser(formData as CreateUserParams);
                setSuccess('Thêm người dùng thành công!');
            } else if (modalType === 'edit') {
                const updateData: UpdateUserParams = {
                    email: formData.email,
                    name: formData.name,
                    access: formData.access,
                };
                if (formData.password) {
                    updateData.password = formData.password;
                }
                await updateUser(updateData);
                setSuccess('Cập nhật người dùng thành công!');
            }
            closeModal();
            fetchUsers();
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        setSubmitting(true);
        setError(null);

        try {
            await deleteUser(selectedUser._id);
            setSuccess('Xóa người dùng thành công!');
            closeModal();
            fetchUsers();
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi xóa');
        } finally {
            setSubmitting(false);
        }
    };

    // Clear success message after 3 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                    <Users className="w-7 h-7 text-teal-500" />
                    QUẢN LÝ NGƯỜI DÙNG
                </h1>
                <p className="text-slate-500">Quản lý tài khoản người dùng hệ thống</p>
            </div>

            {/* Success Toast */}
            {success && (
                <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
                    <Check className="w-5 h-5" />
                    {success}
                </div>
            )}

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none w-80"
                        />
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm người dùng
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">MÃ TÀI KHOẢN</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">TÀI KHOẢN</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">QUYỀN TRUY CẬP</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">TÊN NGƯỜI DÙNG</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">NGÀY TẠO</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-900">NGÀY CẬP NHẬT</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-teal-900">TÙY CHỌN</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                                            Không tìm thấy người dùng
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedUsers.map((user) => {
                                        const accessInfo = accessLabels[user.access] || accessLabels.user;
                                        return (
                                            <tr key={user._id} className="hover:bg-teal-50/30 transition-colors">
                                                <td className="px-4 py-3 text-sm text-slate-600 font-mono text-xs">
                                                    {user._id.slice(-8)}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                                                    {user.email}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={cn(
                                                        "inline-block px-2 py-1 rounded text-xs font-medium",
                                                        accessInfo.bgColor,
                                                        accessInfo.textColor
                                                    )}>
                                                        {accessInfo.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-700">
                                                    {user.name || '-'}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-500">
                                                    {formatDate(user.createAt)}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-500">
                                                    {formatDate(user.updateAt)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {user.access !== 'admin' ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => openEditModal(user)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Sửa"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => openDeleteModal(user)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Xóa"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && filteredUsers.length > 0 && (
                    <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredUsers.length)} / {filteredUsers.length} người dùng
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                                        onClick={() => setCurrentPage(pageNum)}
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
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
                )}
            </div>

            {/* Modal Overlay */}
            {modalType && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-fade-in">
                        {/* Add/Edit Modal */}
                        {(modalType === 'add' || modalType === 'edit') && (
                            <>
                                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        {modalType === 'add' ? 'Thêm người dùng mới' : 'Cập nhật thông tin'}
                                    </h3>
                                    <button onClick={closeModal} className="p-1 hover:bg-slate-100 rounded">
                                        <X className="w-5 h-5 text-slate-500" />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    {error && (
                                        <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            {error}
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tài khoản (Email)</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            disabled={modalType === 'edit'}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none disabled:bg-slate-100"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Mật khẩu {modalType === 'edit' && <span className="text-slate-400">(để trống nếu không đổi)</span>}
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required={modalType === 'add'}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tên người dùng</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                            placeholder="Họ và tên"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Quyền truy cập</label>
                                        <select
                                            value={formData.access}
                                            onChange={(e) => setFormData({ ...formData, access: e.target.value as 'doctor' | 'user' })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                                        >
                                            <option value="user">Người dùng phổ thông</option>
                                            <option value="doctor">Bác sĩ</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                            {modalType === 'add' ? 'Thêm' : 'Cập nhật'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* Delete Confirmation Modal */}
                        {modalType === 'delete' && selectedUser && (
                            <>
                                <div className="p-6 text-center">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Xác nhận xóa</h3>
                                    <p className="text-slate-600 mb-4">
                                        Bạn có chắc muốn xóa người dùng <strong>{selectedUser.name || selectedUser.email}</strong>?
                                    </p>
                                    {error && (
                                        <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">
                                            {error}
                                        </div>
                                    )}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={closeModal}
                                            className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            disabled={submitting}
                                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
