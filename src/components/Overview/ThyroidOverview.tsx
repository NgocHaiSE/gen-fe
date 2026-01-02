const ThyroidOverview = () => {
    return (
        <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-gray-200 pb-2">UNG THƯ TUYẾN GIÁP</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">1. Dịch tễ</h2>
                <p className="indent-6 text-justify leading-7 text-sm">
                    Ung thư tuyến giáp là loại ung thư nội tiết phổ biến nhất. Theo GLOBOCAN 2020, có khoảng
                    586.000 ca mắc mới trên toàn thế giới. Tại Việt Nam, ung thư tuyến giáp đứng thứ 7 về tỷ lệ
                    mắc ở phụ nữ. Bệnh thường gặp ở nữ giới nhiều hơn nam giới với tỷ lệ 3:1.
                </p>
                <p className="indent-6 text-justify leading-7 text-sm mt-2">
                    Ung thư tuyến giáp có tiên lượng tốt hơn nhiều loại ung thư khác, với tỷ lệ sống sót
                    sau 5 năm đạt trên 90% đối với ung thư biểu mô nhú (papillary carcinoma).
                </p>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">2. Phân loại mô bệnh học</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                    <li><strong>Ung thư biểu mô nhú (Papillary carcinoma):</strong> Chiếm 80-85%, tiên lượng tốt nhất</li>
                    <li><strong>Ung thư biểu mô nang (Follicular carcinoma):</strong> Chiếm 10-15%</li>
                    <li><strong>Ung thư biểu mô tủy (Medullary carcinoma):</strong> Chiếm 3-5%, xuất phát từ tế bào C</li>
                    <li><strong>Ung thư biểu mô không biệt hóa (Anaplastic carcinoma):</strong> Chiếm 1-2%, tiên lượng xấu nhất</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">3. Nguyên nhân và yếu tố nguy cơ</h2>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm text-teal-700">3.1. Yếu tố nguy cơ:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Tiếp xúc với bức xạ ion hóa, đặc biệt trong thời thơ ấu</li>
                        <li>Tiền sử gia đình có người mắc ung thư tuyến giáp</li>
                        <li>Hội chứng di truyền: MEN2A, MEN2B</li>
                        <li>Bệnh tuyến giáp có sẵn: Bướu giáp đa nhân, viêm tuyến giáp Hashimoto</li>
                        <li>Thiếu hoặc thừa iod</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">3.2. Đột biến gen liên quan:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>BRAF V600E: Gặp trong 40-60% ung thư nhú</li>
                        <li>RET/PTC: Gặp trong ung thư nhú, đặc biệt sau phơi nhiễm phóng xạ</li>
                        <li>RAS: Gặp trong ung thư nang và ung thư nhú biến thể nang</li>
                        <li>RET: Đột biến dòng mầm gặp trong ung thư tủy di truyền</li>
                    </ul>
                </div>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">4. Triệu chứng lâm sàng</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                    <li>Nhân giáp: Phát hiện tình cờ hoặc khi sờ thấy</li>
                    <li>Hạch cổ: Sưng to, thường ở nhóm hạch cảnh</li>
                    <li>Triệu chứng chèn ép: Khó nuốt, khó thở, khàn tiếng</li>
                    <li>Đau: Ít gặp, có thể gặp trong ung thư không biệt hóa</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">5. Chẩn đoán</h2>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm text-teal-700">5.1. Chẩn đoán hình ảnh:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Siêu âm tuyến giáp: Phương pháp chẩn đoán đầu tay</li>
                        <li>CT/MRI cổ: Đánh giá mức độ lan rộng</li>
                        <li>Xạ hình tuyến giáp với I-131</li>
                        <li>PET/CT: Đánh giá di căn xa</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">5.2. Chọc hút kim nhỏ (FNA):</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Phương pháp chẩn đoán tiêu chuẩn cho nhân giáp</li>
                        <li>Phân loại theo hệ thống Bethesda</li>
                        <li>Xét nghiệm phân tử bổ sung khi cần (BRAF, RAS, RET/PTC)</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">5.3. Xét nghiệm máu:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>TSH, FT4, FT3</li>
                        <li>Thyroglobulin (Tg): Marker theo dõi sau điều trị</li>
                        <li>Calcitonin: Đặc hiệu cho ung thư tủy</li>
                        <li>CEA: Theo dõi ung thư tủy</li>
                    </ul>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="font-bold text-teal-800">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>1. GLOBOCAN 2020: Global Cancer Statistics</li>
                        <li>2. American Thyroid Association Guidelines</li>
                        <li>3. Hướng dẫn chẩn đoán và điều trị ung thư tuyến giáp - Bộ Y tế Việt Nam</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ThyroidOverview;
