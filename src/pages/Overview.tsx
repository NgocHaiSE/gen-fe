import LungOverview from '../components/Overview/LungOverview'
import LiverOverview from '../components/Overview/LiverOverview'
import BreastOverview from '../components/Overview/BreastOverview'
import ThyroidOverview from '../components/Overview/ThyroidOverview'
import ColorectalOverview from '../components/Overview/ColorectalOverview'

export default function Overview({ type }: { type: string }) {
    const renderContent = () => {
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
            {renderContent()}
        </div>
    )
}
