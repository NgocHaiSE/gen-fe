const BreastTreatment = () => {
    return (
        <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-slate-light pb-2">UNG THƯ VÚ - CÁC ĐIỀU TRỊ KHÁC</h1>

            <div className="prose max-w-none text-ink-black">
                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">1. Nguyên tắc điều trị</h2>
                <p className="text-justify leading-7 text-sm">
                    Điều trị ung thư vú là điều trị đa mô thức, kết hợp nhiều phương pháp khác nhau tùy thuộc vào
                    giai đoạn bệnh, phân loại phân tử và tình trạng sức khỏe của bệnh nhân.
                </p>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">2. Các phương pháp điều trị</h2>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.1. Phẫu thuật</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong>Phẫu thuật bảo tồn vú:</strong> Cắt rộng u + xạ trị bổ trợ</li>
                    <li><strong>Phẫu thuật cắt tuyến vú toàn bộ:</strong> Cắt toàn bộ tuyến vú kèm hoặc không kèm tái tạo</li>
                    <li><strong>Sinh thiết hạch cửa:</strong> Đánh giá di căn hạch nách</li>
                    <li><strong>Nạo vét hạch nách:</strong> Khi có di căn hạch</li>
                </ul>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.2. Xạ trị</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li>Xạ trị bổ trợ sau phẫu thuật bảo tồn</li>
                    <li>Xạ trị thành ngực sau cắt tuyến vú toàn bộ</li>
                    <li>Xạ trị di căn xương, não</li>
                </ul>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.3. Hóa trị</h3>
                <p className="text-justify leading-7 text-sm mb-2">Các phác đồ hóa trị phổ biến:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li>AC-T: Doxorubicin + Cyclophosphamide → Taxane</li>
                    <li>TC: Docetaxel + Cyclophosphamide</li>
                    <li>CMF: Cyclophosphamide + Methotrexate + 5-FU</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">3. Điều trị đích theo phân loại</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong className="text-teal-700">ER/PR dương tính:</strong> Điều trị nội tiết (Tamoxifen, ức chế Aromatase)</li>
                    <li><strong className="text-teal-700">HER2 dương tính:</strong> Trastuzumab, Pertuzumab, T-DM1</li>
                    <li><strong className="text-teal-700">Triple negative:</strong> Hóa trị, ức chế PARP (nếu có BRCA), miễn dịch trị liệu</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">4. Điều trị miễn dịch</h2>
                <p className="text-justify leading-7 text-sm">
                    Pembrolizumab kết hợp hóa trị cho ung thư vú triple negative giai đoạn sớm và di căn với PD-L1 dương tính.
                </p>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <h3 className="font-bold text-teal-900">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-slate-medium mt-2 space-y-1">
                        <li>1. Hướng dẫn chẩn đoán và điều trị ung thư vú - Bộ Y tế Việt Nam</li>
                        <li>2. NCCN Guidelines - Breast Cancer</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BreastTreatment;
