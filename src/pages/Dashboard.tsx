import { InfoCard } from '../components/InfoCard'

export default function Dashboard() {
    return (
        <div className="p-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative p-8 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50/50">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-medical-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <h1 className="text-2xl font-bold text-teal-900 mb-4 relative z-10 uppercase">
                        CÔNG CỤ HỖ TRỢ CHẨN ĐOÁN VÀ ĐIỀU TRỊ UNG THƯ
                    </h1>

                    <div className="text-gray-600 space-y-4 max-w-4xl relative z-10 text-justify leading-relaxed">
                        <p>
                            - Công nghệ y tế tiên tiến đã mang lại những đột phá trong chẩn đoán và điều trị ung thư.
                            Trong số đó, phần mềm phát hiện đột biến gen đang thu hút sự quan tâm đặc biệt của các bác sĩ lâm sàng tại Việt Nam.
                            Sử dụng công nghệ giải trình tự thế hệ tiếp theo (Next-Generation Sequencing - NGS), phần mềm này cung cấp một công cụ mạnh mẽ
                            cho việc chẩn đoán và lựa chọn phương pháp điều trị cá nhân hóa cho bệnh nhân ung thư.
                        </p>
                        <p>
                            - Phần mềm phát hiện đột biến gen dựa trên dữ liệu giải trình tự gen thế hệ mới (NGS), cho phép bác sĩ xác định
                            và phân tích các gen đích một cách chính xác và chi tiết. Thông qua việc phân tích đột biến gen trong khối u,
                            phần mềm cung cấp thông tin quan trọng về cơ chế phân tử của bệnh ung thư và tiên lượng khả năng đáp ứng điều trị.
                        </p>
                        <p>
                            - Với khả năng xác định đúng đột biến gen liên quan đến bệnh ung thư và tìm ra phương pháp điều trị phù hợp,
                            phần mềm giúp các bác sĩ lâm sàng chẩn đoán và dự đoán đáp ứng điều trị tốt hơn. Bằng cách phân tích đặc điểm gen của khối u,
                            phần mềm có thể xác định chính xác thuốc điều trị đích hoạt động hiệu quả và phù hợp. Điều này giúp tăng cường khả năng lựa chọn
                            phương pháp điều trị cá nhân hóa và giảm nguy cơ sử dụng những loại thuốc kém hiệu quả hoặc có tác dụng phụ đối với từng bệnh nhân.
                        </p>
                        <p>
                            - Sử dụng phần mềm phát hiện đột biến gen cũng mang lại lợi ích đáng kể trong việc cải thiện chăm sóc cho bệnh nhân ung thư.
                            Bác sĩ lâm sàng có thể tinh chỉnh và điều chỉnh kế hoạch điều trị dựa trên thông tin chính xác về đáp ứng của khối u
                            với từng phương pháp điều trị. Đồng thời, theo dõi sự tiến triển và hiệu quả của các phương pháp điều trị theo thời gian.
                            Điều này giúp tối ưu hóa quá trình điều trị, cải thiện chất lượng cuộc sống và cơ hội phục hồi cho bệnh nhân ung thư.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 relative z-10">
                        <InfoCard
                            index={1}
                            href="#"
                            title="Tìm kiếm"
                            desc="Phần mềm tìm kiếm được xây dựng để cung cấp thông tin chi tiết về thuốc, gen và đột biến liên quan đến 5 loại ung thư phổ biến ở Việt Nam. Dữ liệu này được thu thập từ các nguồn uy tín trên toàn cầu, giúp các bác sĩ tra cứu và tìm hiểu về các phương pháp điều trị và yếu tố di truyền của ung thư một cách dễ dàng."
                        />
                        <InfoCard
                            index={2}
                            href="#"
                            title="Lưu trữ"
                            desc="Phần mềm có hệ thống lưu trữ kết quả xét nghiệm bệnh nhân chi tiết, đầy đủ và được mã hoá an toàn. Hệ thống này đảm bảo tính bảo mật cao và chỉ cho phép những người được ủy quyền truy cập vào dữ liệu. Kết quả xét nghiệm được lưu trữ một cách an toàn và không thể bị thay đổi hay truy cập trái phép."
                        />
                        <InfoCard
                            index={3}
                            href="#"
                            title="Trình bày"
                            desc="Kết quả xét nghiệm được hiển thị dưới dạng bảng đầy đủ và rõ ràng, giúp bác sĩ dễ dàng đọc và hiểu thông tin. Bảng hiển thị này được tổ chức một cách logic, giúp định rõ trạng thái di truyền và đáp ứng điều trị của bệnh nhân. Bằng cách cung cấp một cái nhìn tổng quan về các thông số quan trọng liên quan đến gen và đột biến."
                        />
                        <InfoCard
                            index={4}
                            href="#"
                            title="Hỗ trợ điều trị"
                            desc="Phần mềm hỗ trợ của chúng tôi giúp các bác sĩ lâm sàng tạo đơn thuốc phù hợp với dữ liệu đã được kiểm chứng. Nó sử dụng công nghệ phát hiện đột biến gen liên quan đến sự đáp ứng của thuốc điều trị, đóng vai trò quan trọng trong việc hỗ trợ các bác sĩ. Với dữ liệu được cập nhật từ các nguồn uy tín trên toàn cầu, phần mềm cung cấp các công cụ tra cứu thông tin thuốc."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
