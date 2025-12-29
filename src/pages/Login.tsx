import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, ArrowRight } from 'lucide-react'
import { login, currentUser } from '../services/auth'
import token from '../utils/token'

export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.target as HTMLFormElement)
        const values = Object.fromEntries(formData.entries())

        try {
            const loginData = await login(values as API.LoginParams)
            // @ts-ignore
            const { accessToken } = loginData.data || loginData;

            if (accessToken) {
                token.save(accessToken);
                await currentUser();
                navigate('/welcome');
            } else {
                setError('Login failed: No access token received')
            }
        } catch (err: any) {
            console.error(err)
            const msg = err.response?.data?.message || 'Sai tài khoản hoặc mật khẩu';
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md animate-slide-up">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 relative overflow-hidden">
                {/* Decorative gradients - Updated to teal */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-300/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 transition-transform hover:rotate-0 duration-300">
                            <img alt="logo" src="/Logo_3.png" className="h-16 w-16 object-contain" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-900 to-teal-500">
                        Ung Thư
                    </h1>
                    <p className="text-slate-medium font-medium mt-2">Dữ liệu Gen & Y Học Chính Xác</p>
                </div>

                {error && (
                    <div className="bg-red-50/80 backdrop-blur-sm text-error-red p-4 rounded-xl mb-6 text-sm border border-red-100 flex items-center shadow-sm animate-fade-in">
                        <span className="mr-3 bg-red-100 p-1 rounded-full">⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                    <div className="group">
                        <label className="block text-sm font-semibold text-slate-dark mb-1.5 ml-1">Tài khoản</label>
                        <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-light group-focus-within:text-teal-500 transition-colors" />
                            </div>
                            <input
                                name="username"
                                type="text"
                                required
                                className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-light rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder-slate-medium font-medium text-slate-dark"
                                placeholder="Nhập tên đăng nhập"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-sm font-semibold text-slate-dark mb-1.5 ml-1">Mật khẩu</label>
                        <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-light group-focus-within:text-teal-500 transition-colors" />
                            </div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-light rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder-slate-medium font-medium text-slate-dark"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm pt-1">
                        <label className="flex items-center text-slate-medium cursor-pointer hover:text-slate-dark transition-colors">
                            <input type="checkbox" className="mr-2 rounded border-slate-light text-teal-500 focus:ring-teal-500 w-4 h-4" />
                            <span className="font-medium">Ghi nhớ</span>
                        </label>
                        <a href="#" className="font-semibold text-teal-700 hover:text-teal-900 hover:underline transition-all">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang xử lý...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                Đăng nhập
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </button>
                </form>
            </div>

            <p className="text-center text-white/80 mt-8 text-sm font-medium drop-shadow-md">
                © {new Date().getFullYear()} Cancer Genomics Portal. All rights reserved.
            </p>
        </div>
    )
}
