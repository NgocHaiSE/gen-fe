import { Info, Search, Database, BarChart3, Pill, Dna, Activity, FlaskConical } from 'lucide-react'

export default function Dashboard() {
    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                            <Info className="w-7 h-7 text-teal-500" />
                            Giới thiệu hệ thống
                        </h1>
                        <p className="text-slate-medium">
                            Công cụ hỗ trợ chẩn đoán và điều trị ung thư dựa trên giải trình tự gen thế hệ mới (NGS)
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Introduction */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-teal-500" />
                    Về công nghệ
                </h2>
                <div className="text-gray-600 space-y-4 text-justify leading-relaxed">
                    <p>
                        Công nghệ y tế tiên tiến đã mang lại những đột phá trong chẩn đoán và điều trị ung thư.
                        Trong số đó, phần mềm phát hiện đột biến gen đang thu hút sự quan tâm đặc biệt của các bác sĩ lâm sàng tại Việt Nam.
                        Sử dụng công nghệ <strong className="text-teal-700">giải trình tự thế hệ tiếp theo (Next-Generation Sequencing - NGS)</strong>,
                        phần mềm này cung cấp một công cụ mạnh mẽ cho việc chẩn đoán và lựa chọn phương pháp điều trị cá nhân hóa cho bệnh nhân ung thư.
                    </p>
                    <p>
                        Phần mềm phát hiện đột biến gen dựa trên dữ liệu giải trình tự gen thế hệ mới (NGS), cho phép bác sĩ xác định
                        và phân tích các gen đích một cách chính xác và chi tiết. Thông qua việc phân tích đột biến gen trong khối u,
                        phần mềm cung cấp thông tin quan trọng về cơ chế phân tử của bệnh ung thư và tiên lượng khả năng đáp ứng điều trị.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureCard
                    icon={Search}
                    iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
                    title="Tìm kiếm"
                    description="Cung cấp thông tin chi tiết về thuốc, gen và đột biến liên quan đến 5 loại ung thư phổ biến ở Việt Nam. Dữ liệu được thu thập từ các nguồn uy tín trên toàn cầu như COSMIC, CIViC, OncoKB và DGIdb."
                />
                <FeatureCard
                    icon={Database}
                    iconBg="bg-gradient-to-br from-teal-500 to-teal-600"
                    title="Lưu trữ"
                    description="Hệ thống lưu trữ kết quả xét nghiệm bệnh nhân chi tiết, đầy đủ và được mã hoá an toàn. Đảm bảo tính bảo mật cao và chỉ cho phép những người được ủy quyền truy cập vào dữ liệu."
                />
                <FeatureCard
                    icon={BarChart3}
                    iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
                    title="Trình bày"
                    description="Kết quả xét nghiệm được hiển thị dưới dạng bảng đầy đủ và rõ ràng, giúp bác sĩ dễ dàng đọc và hiểu thông tin. Biểu đồ thống kê trực quan giúp theo dõi dữ liệu hiệu quả."
                />
                <FeatureCard
                    icon={Pill}
                    iconBg="bg-gradient-to-br from-rose-500 to-rose-600"
                    title="Hỗ trợ điều trị"
                    description="Giúp các bác sĩ lâm sàng tạo đơn thuốc phù hợp với dữ liệu đã được kiểm chứng. Sử dụng công nghệ phát hiện đột biến gen liên quan đến sự đáp ứng của thuốc điều trị."
                />
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                    <Dna className="w-5 h-5 text-teal-500" />
                    Lợi ích của hệ thống
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <BenefitCard
                        number="01"
                        title="Chẩn đoán chính xác"
                        description="Xác định đúng đột biến gen liên quan đến bệnh ung thư và tìm ra phương pháp điều trị phù hợp nhất."
                    />
                    <BenefitCard
                        number="02"
                        title="Điều trị cá nhân hóa"
                        description="Phân tích đặc điểm gen của khối u để xác định chính xác thuốc điều trị đích hoạt động hiệu quả."
                    />
                    <BenefitCard
                        number="03"
                        title="Theo dõi tiến triển"
                        description="Tinh chỉnh và điều chỉnh kế hoạch điều trị dựa trên thông tin chính xác về đáp ứng của khối u."
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    value="5"
                    label="Loại ung thư"
                    icon={Activity}
                    color="text-blue-600"
                    bg="bg-blue-50"
                />
                <StatCard
                    value="177"
                    label="Gen được phân tích"
                    icon={Dna}
                    color="text-teal-600"
                    bg="bg-teal-50"
                />
                <StatCard
                    value="68+"
                    label="Thuốc điều trị đích"
                    icon={Pill}
                    color="text-purple-600"
                    bg="bg-purple-50"
                />
                <StatCard
                    value="97K+"
                    label="Bản ghi dữ liệu"
                    icon={FlaskConical}
                    color="text-rose-600"
                    bg="bg-rose-50"
                />
            </div>
        </div>
    )
}

function FeatureCard({
    icon: Icon,
    iconBg,
    title,
    description
}: {
    icon: React.ElementType
    iconBg: string
    title: string
    description: string
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-teal-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    )
}

function BenefitCard({
    number,
    title,
    description
}: {
    number: string
    title: string
    description: string
}) {
    return (
        <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border border-teal-100">
            <div className="text-3xl font-bold text-teal-500/30 mb-2">{number}</div>
            <h3 className="font-bold text-teal-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
    )
}

function StatCard({
    value,
    label,
    icon: Icon,
    color,
    bg
}: {
    value: string
    label: string
    icon: React.ElementType
    color: string
    bg: string
}) {
    return (
        <div className={`${bg} rounded-xl p-4 border border-slate-light`}>
            <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-600 mt-1">{label}</div>
        </div>
    )
}
