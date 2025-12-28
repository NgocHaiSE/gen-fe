import { Outlet } from 'react-router-dom'
import loginBg from '../assets/login_background.png'

export default function AuthLayout() {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="w-full max-w-md relative z-10">
                <Outlet />
            </div>
            {/* Overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-black/10 z-0" />
        </div>
    )
}
