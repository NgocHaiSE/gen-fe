const ColorectalOverview = () => {
    return (
        <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-medical-primary mb-6 border-b border-gray-200 pb-2">UNG THƯ ĐẠI TRỰC TRÀNG</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Dịch tễ</h2>
                <p className="indent-6 text-justify leading-7 text-sm">
                    Ung thư đại trực tràng (UTĐTT) là loại ung thư phổ biến thứ 3 trên thế giới. Theo GLOBOCAN 2020,
                    có khoảng 1,9 triệu ca mắc mới và 935.000 ca tử vong. Tại Việt Nam, UTĐTT đứng thứ 5 về tỷ lệ
                    mắc và tử vong do ung thư.
                </p>
                <p className="indent-6 text-justify leading-7 text-sm mt-2">
                    Tỷ lệ mắc UTĐTT tăng theo tuổi, đặc biệt sau 50 tuổi. Tuy nhiên, gần đây có xu hướng tăng
                    ở người trẻ tuổi. Nếu được phát hiện sớm ở giai đoạn I, tỷ lệ sống sót sau 5 năm có thể
                    đạt trên 90%.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Nguyên nhân và yếu tố nguy cơ</h2>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm">2.1. Yếu tố nguy cơ không thể thay đổi:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Tuổi: Nguy cơ tăng đáng kể sau 50 tuổi</li>
                        <li>Tiền sử cá nhân polyp đại trực tràng hoặc UTĐTT</li>
                        <li>Bệnh viêm ruột mạn tính: Viêm loét đại tràng, bệnh Crohn</li>
                        <li>Tiền sử gia đình: UTĐTT, hội chứng Lynch, FAP</li>
                        <li>Hội chứng di truyền: Lynch (HNPCC), FAP, MAP</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm">2.2. Yếu tố nguy cơ có thể thay đổi:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Chế độ ăn nhiều thịt đỏ, thịt chế biến sẵn</li>
                        <li>Chế độ ăn ít chất xơ, rau quả</li>
                        <li>Béo phì và thừa cân</li>
                        <li>Ít vận động thể chất</li>
                        <li>Hút thuốc lá</li>
                        <li>Uống rượu bia</li>
                        <li>Đái tháo đường type 2</li>
                    </ul>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. Triệu chứng lâm sàng</h2>
                <p className="text-justify leading-7 text-sm">
                    Triệu chứng phụ thuộc vào vị trí khối u:
                </p>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm">U đại tràng phải:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Thiếu máu thiếu sắt không rõ nguyên nhân</li>
                        <li>Mệt mỏi, sụt cân</li>
                        <li>Đau bụng mơ hồ</li>
                        <li>Khối u sờ thấy ở bụng phải</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm">U đại tràng trái và trực tràng:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Thay đổi thói quen đại tiện</li>
                        <li>Phân có máu, nhầy</li>
                        <li>Phân nhỏ, dẹt</li>
                        <li>Táo bón xen kẽ tiêu chảy</li>
                        <li>Đau quặn bụng, đầy hơi</li>
                    </ul>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. Chẩn đoán</h2>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm">4.1. Nội soi đại tràng:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Phương pháp tiêu chuẩn vàng cho tầm soát và chẩn đoán</li>
                        <li>Cho phép sinh thiết tổn thương</li>
                        <li>Cắt polyp nếu phát hiện</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm">4.2. Chẩn đoán hình ảnh:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>CT scan bụng-chậu có cản quang: Đánh giá giai đoạn</li>
                        <li>MRI trực tràng: Đánh giá xâm lấn tại chỗ</li>
                        <li>PET/CT: Đánh giá di căn xa</li>
                        <li>CT ngực: Phát hiện di căn phổi</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm">4.3. Xét nghiệm:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>CEA: Marker theo dõi sau điều trị</li>
                        <li>Công thức máu: Phát hiện thiếu máu</li>
                        <li>Chức năng gan, thận</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm">4.4. Xét nghiệm gen:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>MSI (Microsatellite Instability): Liên quan đến hội chứng Lynch</li>
                        <li>KRAS, NRAS: Dự đoán đáp ứng với thuốc anti-EGFR</li>
                        <li>BRAF V600E: Tiên lượng và đáp ứng điều trị</li>
                        <li>HER2: Xem xét điều trị đích</li>
                    </ul>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="font-bold text-gray-700">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>1. GLOBOCAN 2020: Global Cancer Statistics</li>
                        <li>2. NCCN Guidelines - Colorectal Cancer</li>
                        <li>3. Hướng dẫn chẩn đoán và điều trị ung thư đại trực tràng - Bộ Y tế Việt Nam</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ColorectalOverview;
