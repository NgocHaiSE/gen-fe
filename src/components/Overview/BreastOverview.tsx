const BreastOverview = () => {
    return (
        <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-gray-200 pb-2">UNG THƯ VÚ</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">1. Dịch tễ</h2>
                <p className="indent-6 text-justify leading-7 text-sm">
                    Ung thư vú là loại ung thư phổ biến nhất ở phụ nữ trên toàn thế giới. Theo GLOBOCAN 2020,
                    có khoảng 2,3 triệu ca mắc mới ung thư vú trên toàn cầu, chiếm 11,7% tổng số các ca ung thư mới.
                    Tại Việt Nam, ung thư vú đứng đầu về tỷ lệ mắc ở phụ nữ với khoảng 21.555 ca mới mỗi năm.
                </p>
                <p className="indent-6 text-justify leading-7 text-sm mt-2">
                    Tỷ lệ sống sót sau 5 năm của ung thư vú phụ thuộc vào giai đoạn phát hiện. Khi phát hiện sớm
                    ở giai đoạn I, tỷ lệ sống sót có thể đạt trên 90%. Việc tầm soát định kỳ đóng vai trò quan
                    trọng trong việc phát hiện sớm bệnh.
                </p>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">2. Nguyên nhân và yếu tố nguy cơ</h2>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm text-teal-700">2.1. Yếu tố không thể thay đổi:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Giới tính: Phụ nữ có nguy cơ cao hơn nam giới gấp 100 lần</li>
                        <li>Tuổi: Nguy cơ tăng theo tuổi, đặc biệt sau 50 tuổi</li>
                        <li>Di truyền: Đột biến gen BRCA1 và BRCA2 làm tăng nguy cơ 40-80%</li>
                        <li>Tiền sử gia đình có người mắc ung thư vú</li>
                        <li>Có tiền sử bệnh lý tuyến vú lành tính</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">2.2. Yếu tố có thể thay đổi:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Béo phì, đặc biệt sau mãn kinh</li>
                        <li>Ít hoạt động thể chất</li>
                        <li>Sử dụng rượu bia</li>
                        <li>Liệu pháp hormone thay thế sau mãn kinh</li>
                        <li>Không sinh con hoặc sinh con muộn (sau 30 tuổi)</li>
                        <li>Không cho con bú</li>
                    </ul>
                </div>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">3. Triệu chứng lâm sàng</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                    <li>Khối u ở vú: Thường không đau, có thể di động hoặc dính</li>
                    <li>Thay đổi da vú: Da sần như vỏ cam, co kéo da</li>
                    <li>Thay đổi núm vú: Co kéo, tiết dịch bất thường</li>
                    <li>Hạch nách: Sưng to, dính</li>
                    <li>Đau vú: Ít gặp trong giai đoạn sớm</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">4. Chẩn đoán</h2>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm text-teal-700">4.1. Chẩn đoán hình ảnh:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Nhũ ảnh (Mammography): Phương pháp tầm soát tiêu chuẩn</li>
                        <li>Siêu âm vú: Bổ sung cho nhũ ảnh, đặc biệt với mô vú đặc</li>
                        <li>MRI vú: Đánh giá mức độ lan rộng, sàng lọc nhóm nguy cơ cao</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">4.2. Sinh thiết:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Sinh thiết kim lõi (Core needle biopsy): Phương pháp tiêu chuẩn</li>
                        <li>Sinh thiết cắt bỏ hoàn toàn (Excisional biopsy)</li>
                        <li>Xét nghiệm mô bệnh học và hóa mô miễn dịch</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">4.3. Xét nghiệm gen:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Thụ thể Estrogen (ER) và Progesterone (PR)</li>
                        <li>HER2/neu</li>
                        <li>Ki-67</li>
                        <li>Xét nghiệm đột biến gen BRCA1/BRCA2</li>
                    </ul>
                </div>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">5. Phân loại</h2>
                <p className="text-justify leading-7 text-sm">
                    Ung thư vú được phân loại thành các nhóm dựa trên biểu hiện thụ thể hormone và HER2:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-justify mt-2">
                    <li>Luminal A: ER+/PR+, HER2-, Ki-67 thấp - Tiên lượng tốt nhất</li>
                    <li>Luminal B: ER+/PR+, HER2+/-, Ki-67 cao</li>
                    <li>HER2 dương tính: ER-/PR-, HER2+</li>
                    <li>Triple negative: ER-/PR-/HER2- - Tiên lượng kém nhất</li>
                </ul>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="font-bold text-teal-800">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>1. GLOBOCAN 2020: Global Cancer Statistics</li>
                        <li>2. Hướng dẫn chẩn đoán và điều trị ung thư vú - Bộ Y tế Việt Nam</li>
                        <li>3. NCCN Guidelines - Breast Cancer</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BreastOverview;
