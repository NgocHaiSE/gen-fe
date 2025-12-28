import { useState } from 'react'
import LungOverview from '../components/Overview/LungOverview'
import LiverOverview from '../components/Overview/LiverOverview'
import BreastOverview from '../components/Overview/BreastOverview'
import ThyroidOverview from '../components/Overview/ThyroidOverview'
import ColorectalOverview from '../components/Overview/ColorectalOverview'
import PatientList from './PatientList'

export default function Overview({ type }: { type: string }) {
    const [activeTab, setActiveTab] = useState<'info' | 'patients'>('info')

    const renderContent = () => {
        if (activeTab === 'patients') {
            return <PatientList type={type} />
        }

        switch (type) {
            case 'lung-cancer':
                return <LungOverview />
            case 'liver-cancer':
                return <LiverOverview />
            case 'breast-cancer':
                return <BreastOverview />
            case 'thyroid-cancer':
                return <ThyroidOverview />
            case 'colorectal-cancer':
                return <ColorectalOverview />
            default:
                return (
                    <div className="p-10 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-600">Nội dung đang được cập nhật cho {type}</h2>
                    </div>
                )
        }
    }

    return (
        <div className="w-full space-y-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'info'
                        ? 'bg-white text-medical-accent shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Thông tin chung
                </button>
                <button
                    onClick={() => setActiveTab('patients')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'patients'
                        ? 'bg-white text-medical-accent shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Danh sách bệnh nhân
                </button>
            </div>

            {renderContent()}
        </div>
    )
}
