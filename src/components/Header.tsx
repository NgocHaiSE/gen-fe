import { useState } from 'react'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/token'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        removeToken()
        navigate('/user/login')
    }

    return (
        <header className="h-12 bg-teal-900 shadow-sm flex items-center justify-between px-4 z-20 sticky top-0">
            {/* Logo and Title */}
            <div className="flex items-center">
                <div className="w-7 h-7 mr-2 bg-white rounded flex items-center justify-center overflow-hidden p-0.5">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-base font-semibold tracking-wide text-white">UNG THƯ</h1>
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
                        <span className="text-sm font-medium text-white hidden md:block">doctor</span>
                        <ChevronDown className="w-4 h-4 text-white/70 hidden md:block" />
                    </button>

                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-20">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">Doctor</p>
                                    <p className="text-xs text-gray-500">doctor@example.com</p>
                                </div>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Thông tin tài khoản
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Đăng xuất
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

