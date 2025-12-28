const ColorectalTreatment = () => {
    return (
        <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-slate-light pb-2">UNG THƯ ĐẠI TRỰC TRÀNG - CÁC ĐIỀU TRỊ KHÁC</h1>

            <div className="prose max-w-none text-ink-black">
                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">1. Nguyên tắc điều trị</h2>
                <p className="text-justify leading-7 text-sm">
                    Điều trị ung thư đại trực tràng là điều trị đa mô thức, phụ thuộc vào vị trí u, giai đoạn bệnh,
                    tình trạng gen và thể trạng bệnh nhân.
                </p>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">2. Phẫu thuật</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong>Ung thư đại tràng:</strong> Cắt đoạn đại tràng + nạo vét hạch mạc treo</li>
                    <li><strong>Ung thư trực tràng giữa/thấp:</strong> Cắt toàn bộ mạc treo trực tràng (TME)</li>
                    <li><strong>Phẫu thuật nội soi:</strong> Là tiêu chuẩn khi có chỉ định</li>
                    <li><strong>Di căn gan có thể cắt được:</strong> Phẫu thuật cắt di căn gan</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">3. Hóa trị</h2>
                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">3.1. Hóa trị bổ trợ</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong>FOLFOX:</strong> 5-FU + Leucovorin + Oxaliplatin</li>
                    <li><strong>CAPOX:</strong> Capecitabine + Oxaliplatin</li>
                    <li><strong>Capecitabine đơn thuần:</strong> Cho giai đoạn II nguy cơ cao, bệnh nhân lớn tuổi</li>
                </ul>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">3.2. Hóa xạ trị tiền phẫu</h3>
                <p className="text-justify leading-7 text-sm">
                    Ung thư trực tràng T3-T4 hoặc N+: Xạ trị kết hợp Capecitabine hoặc 5-FU.
                </p>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">4. Điều trị đích</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong className="text-teal-700">Bevacizumab:</strong> Kháng VEGF, kết hợp hóa trị cho giai đoạn di căn</li>
                    <li><strong className="text-teal-700">Cetuximab, Panitumumab:</strong> Kháng EGFR (chỉ định khi RAS wild-type)</li>
                    <li><strong className="text-teal-700">Regorafenib:</strong> Thuốc ức chế đa kinase cho bước điều trị sau</li>
                    <li><strong className="text-teal-700">TAS-102 (Trifluridine/Tipiracil):</strong> Điều trị bước sau</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">5. Điều trị miễn dịch</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong className="text-teal-700">Pembrolizumab:</strong> Bước đầu cho MSI-H/dMMR giai đoạn di căn</li>
                    <li><strong className="text-teal-700">Nivolumab + Ipilimumab:</strong> MSI-H/dMMR sau thất bại hóa trị</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">6. Xét nghiệm gen cần thiết</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong>KRAS, NRAS:</strong> Dự đoán đáp ứng với anti-EGFR</li>
                    <li><strong>BRAF V600E:</strong> Tiên lượng và điều trị đích</li>
                    <li><strong>MSI/MMR:</strong> Chỉ định điều trị miễn dịch</li>
                    <li><strong>HER2:</strong> Điều trị đích khi dương tính</li>
                </ul>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <h3 className="font-bold text-teal-900">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-slate-medium mt-2 space-y-1">
                        <li>1. Hướng dẫn chẩn đoán và điều trị ung thư đại trực tràng - Bộ Y tế Việt Nam</li>
                        <li>2. NCCN Guidelines - Colorectal Cancer</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ColorectalTreatment;
