import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Shield,
    Key,
    ArrowLeft,
    Edit3,
    Save,
    X,
    Check,
    AlertCircle
} from 'lucide-react';
import { getUserInfo, saveUserInfo } from '../utils/token';

const AccountInfo = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<API.UserInfo | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: ''
    });
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        const info = getUserInfo();
        if (info) {
            setUserInfo(info);
            setEditData({
                name: info.name || '',
                email: info.email || ''
            });
        }
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setSaveMessage(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (userInfo) {
            setEditData({
                name: userInfo.name || '',
                email: userInfo.email || ''
            });
        }
        setSaveMessage(null);
    };

    const handleSave = () => {
        // Cập nhật user info trong sessionStorage
        if (userInfo) {
            const updatedInfo: API.UserInfo = {
                ...userInfo,
                name: editData.name,
                email: editData.email
            };
            saveUserInfo(updatedInfo);
            setUserInfo(updatedInfo);
            setIsEditing(false);
            setSaveMessage({ type: 'success', message: 'Thông tin đã được cập nhật thành công!' });

            // Ẩn message sau 3 giây
            setTimeout(() => setSaveMessage(null), 3000);
        }
    };

    const getAccessLabel = (access: string | undefined) => {
        switch (access) {
            case 'admin':
                return { label: 'Quản trị viên', color: 'bg-red-100 text-red-700', icon: '👑' };
            case 'doctor':
                return { label: 'Bác sĩ', color: 'bg-blue-100 text-blue-700', icon: '🩺' };
            case 'user':
            default:
                return { label: 'Người dùng', color: 'bg-teal-100 text-teal-700', icon: '👤' };
        }
    };

    const accessInfo = getAccessLabel(userInfo?.access);

    if (!userInfo) {
        return (
            <div className="w-full animate-fade-in p-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center">
                    <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">Không tìm thấy thông tin</h2>
                    <p className="text-slate-500 mb-6">Vui lòng đăng nhập lại để xem thông tin tài khoản</p>
                    <button
                        onClick={() => navigate('/user/login')}
                        className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-3 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Quay lại</span>
                </button>
                <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                    <User className="w-7 h-7 text-teal-500" />
                    THÔNG TIN TÀI KHOẢN
                </h1>
                <p className="text-slate-500">Quản lý thông tin cá nhân và cài đặt tài khoản của bạn</p>
            </div>

            {/* Success/Error Message */}
            {saveMessage && (
                <div className={`rounded-xl p-4 flex items-center gap-3 animate-fade-in ${saveMessage.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                    {saveMessage.type === 'success' ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">{saveMessage.message}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            {/* Avatar */}
                            <div className="flex justify-center mb-6">
                                <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg">
                                    <User className="w-14 h-14 text-white" />
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-1">{userInfo.name}</h2>
                                <p className="text-teal-100 text-sm mb-4">{userInfo.email}</p>

                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${accessInfo.color.replace('bg-', 'bg-white/90 ').replace('text-', 'text-')
                                    } bg-white/90 text-teal-800 font-semibold text-sm`}>
                                    <span>{accessInfo.icon}</span>
                                    <span>{accessInfo.label}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-6 pt-6 border-t border-white/20">
                                <div className="flex items-center justify-center gap-2 text-teal-100 text-sm">
                                    <Key className="w-4 h-4" />
                                    <span>ID: {userInfo.userid}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Edit3 className="w-5 h-5 text-teal-500" />
                                Thông tin chi tiết
                            </h3>
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Chỉnh sửa
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors flex items-center gap-2 text-sm font-medium"
                                    >
                                        <X className="w-4 h-4" />
                                        Hủy
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Save className="w-4 h-4" />
                                        Lưu
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Form Fields */}
                        <div className="p-6 space-y-6">
                            {/* Name Field */}
                            <div className="group">
                                <label className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                                    <User className="w-4 h-4 text-teal-500" />
                                    Họ và tên
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all text-slate-800 font-medium"
                                        placeholder="Nhập họ và tên"
                                    />
                                ) : (
                                    <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-medium">
                                        {userInfo.name}
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="group">
                                <label className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-teal-500" />
                                    Email
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all text-slate-800 font-medium"
                                        placeholder="Nhập email"
                                    />
                                ) : (
                                    <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-medium">
                                        {userInfo.email}
                                    </div>
                                )}
                            </div>

                            {/* Access Level (Read-only) */}
                            <div className="group">
                                <label className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-teal-500" />
                                    Quyền truy cập
                                </label>
                                <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${accessInfo.color}`}>
                                            {accessInfo.icon} {accessInfo.label}
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-400 italic">Không thể thay đổi</span>
                                </div>
                            </div>

                            {/* User ID (Read-only) */}
                            <div className="group">
                                <label className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                                    <Key className="w-4 h-4 text-teal-500" />
                                    Mã người dùng
                                </label>
                                <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                                    <code className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                        {userInfo.userid}
                                    </code>
                                    <span className="text-xs text-slate-400 italic">Mã định danh duy nhất</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Note */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-full">
                    <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-amber-800 mb-1">Lưu ý bảo mật</h4>
                    <p className="text-sm text-amber-700">
                        Để thay đổi mật khẩu hoặc các thông tin bảo mật khác, vui lòng liên hệ quản trị viên hệ thống.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
