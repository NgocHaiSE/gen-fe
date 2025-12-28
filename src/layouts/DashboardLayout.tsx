import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function DashboardLayout() {
    return (
        <div className="flex flex-col h-screen w-full bg-off-white overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 scroll-smooth">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
