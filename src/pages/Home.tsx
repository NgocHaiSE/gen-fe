import { Link } from 'react-router-dom'
import {
    BarChart3,
    Database,
    FileText,
    TestTube,
    Users,
    ClipboardList,
    ArrowRight,
    Sparkles,
    Home as HomeIcon
} from 'lucide-react'

interface FeatureCardProps {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    link: string
    iconBg: string
    stats?: string
}

function FeatureCard({ title, description, icon: Icon, link, iconBg, stats }: FeatureCardProps) {
    return (
        <Link
            to={link}
            className="group relative bg-white rounded-xl shadow-sm border border-slate-light p-6 hover:shadow-lg transition-all duration-300 flex flex-col min-h-[240px]"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>

                {stats && (
                    <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold rounded-full shadow-sm">
                        {stats}
                    </span>
                )}
            </div>

            <h3 className="text-lg font-bold text-teal-900 mb-2 group-hover:text-teal-600 transition-colors">
                {title}
            </h3>

            <p className="text-sm text-slate-medium leading-relaxed mb-4 flex-1">
                {description}
            </p>

            <div className="flex items-center text-teal-600 font-medium text-sm group-hover:text-teal-700 transition-colors mt-auto">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
        </Link>
    )
}

export default function Home() {
    const features: FeatureCardProps[] = [
        {
            title: 'Thư Viện Phân Lập DNA',
            description: 'Thư viện phân lập DNA của tối thiểu 100 gen đích liên quan đến sự đáp ứng của thuốc điều trị một số loại ung thư phổ biến từ 400 đối tượng nghiên cứu người Việt Nam.',
            icon: BarChart3,
            link: '/dna-library',
            iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        },
        {
            title: 'Kết Quả Giải Trình Tự',
            description: 'Kết quả giải trình tự toàn bộ của tối thiểu 100 gen và gen đột biến của 400 đối tượng nghiên cứu người Việt Nam liên quan đến đáp ứng điều trị một số loại ung thư bằng giải trình tự gen thế hệ mới.',
            icon: ClipboardList,
            link: '/tests/add-test',
            iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
        },
        {
            title: 'Danh Sách Thuốc Điều Trị Đích',
            description: 'Danh sách thuốc đích các loại ung thư phổ biến ở 400 đối tượng người Việt và 7000 đối tượng trên Thế giới được Việt Nam và FDA phê duyệt.',
            icon: TestTube,
            link: '/medicines-list',
            iconBg: 'bg-gradient-to-br from-teal-500 to-teal-600'
        },
        {
            title: 'Bộ Dữ liệu Giải Trình Tự Gen',
            description: 'Bộ CSDL giải trình tự của 457 bệnh nhân Việt Nam kết hợp với 97.370 bản ghi dữ liệu quốc tế. Tổng hợp từ các cơ sở dữ liệu quốc tế uy tín như COSMIC, CIViC, OncoKB và DGIdb, nhóm nghiên cứu đã chuẩn hóa.',
            icon: Database,
            link: '/cosmic-samples',
            iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            stats: 'Cập nhật'
        },
        {
            title: 'Cơ Sở Dữ Liệu Mối Quan Hệ',
            description: 'CSDL về mối quan hệ giữa các đột biến gen của tối thiểu 65 thuốc điều trị đích các loại ung thư phổ biến ở 400 đối tượng người Việt Nam và hơn 97.000 đối tượng trên thế giới.',
            icon: FileText,
            link: '/over-view/drug',
            iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
        },
    ]

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                            <HomeIcon className="w-7 h-7 text-teal-500" />
                            TRANG CHỦ
                        </h1>
                        <p className="text-slate-medium">
                            Truy cập nhanh vào các báo cáo, cơ sở dữ liệu và công cụ quản lý bệnh nhân.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-teal-900 mb-2">Tổng hợp Báo Cáo và Cơ Sở Dữ Liệu</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <FeatureCard {...feature} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
