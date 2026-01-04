import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center border-4 border-red-50">
                        <ShieldAlert className="w-16 h-16 text-red-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-slate-800">401</h1>
                    <h2 className="text-xl font-semibold text-slate-700">Truy cập bị từ chối</h2>
                    <p className="text-slate-500">
                        Bạn không có quyền truy cập vào trang này.<br />
                        Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là một sự nhầm lẫn.
                    </p>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm hover:shadow"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quay lại
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-sm hover:shadow-md"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
}
