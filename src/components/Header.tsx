import { useState, useEffect } from 'react'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { removeToken, removeUserInfo, getUserInfo } from '../utils/token'
import logo from '../assets/gene_icon.png'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [userInfo, setUserInfo] = useState<API.UserInfo | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const info = getUserInfo()
        setUserInfo(info)
    }, [])

    const handleLogout = () => {
        removeToken()
        removeUserInfo()
        navigate('/user/login')
    }

    const handleAccountClick = () => {
        setIsOpen(false)
        navigate('/account')
    }

    return (
        <header className="h-12 bg-teal-900 shadow-sm flex items-center justify-between px-4 z-20 sticky top-0">
            {/* Logo and Title */}
            <div className="flex items-center">
                <div className="w-7 h-7 mr-2 bg-white rounded flex items-center justify-center overflow-hidden p-0.5">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-base font-semibold tracking-wide text-white">VN - Cancer AI</h1>
            </div>

            <div className="flex items-center space-x-4">
                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 p-1.5 rounded-md transition-colors outline-none"
                    >
                        <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-white hidden md:block">
                            {userInfo?.name || 'Người dùng'}
                        </span>
                        <ChevronDown className="w-4 h-4 text-white/70 hidden md:block" />
                    </button>

                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 border border-gray-100 z-20">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-900">{userInfo?.name || 'Người dùng'}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{userInfo?.email || 'Chưa cập nhật email'}</p>
                                    <span className="inline-block mt-1.5 text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full font-medium capitalize">
                                        {userInfo?.access || 'user'}
                                    </span>
                                </div>
                                <button
                                    onClick={handleAccountClick}
                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                                >
                                    <Settings className="w-4 h-4 mr-3 text-gray-400" />
                                    Thông tin tài khoản
                                </button>
                                <div className="border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-3" />
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
