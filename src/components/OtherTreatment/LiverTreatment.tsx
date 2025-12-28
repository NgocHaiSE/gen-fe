const LiverTreatment = () => {
    return (
        <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-slate-light pb-2">UNG THƯ GAN - CÁC ĐIỀU TRỊ KHÁC</h1>

            <div className="prose max-w-none text-ink-black">
                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">1. Nguyên tắc điều trị UTBMTBG</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li>Điều trị UTBMTBG ở giai đoạn còn khả năng điều trị.</li>
                    <li>Điều trị bệnh lý nền hay yếu tố nguy cơ (ví dụ như viêm gan siêu vi B hoặc C, xơ gan...).</li>
                    <li>Điều trị nội khoa kết hợp chăm sóc giảm nhẹ (giai đoạn muộn).</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">2. Các phương pháp điều trị</h2>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.1. Phẫu thuật cắt gan</h3>
                <p className="text-justify leading-7 text-sm">
                    Đây được xem như một phương pháp điều trị triệt căn đối với UTBMTBG, thậm chí an toàn ngay
                    cả đối với các bệnh nhân có xơ gan. Tại Việt Nam, phẫu thuật cắt gan nên được thực hiện đối với các trường hợp:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify mt-2">
                    <li>Phần gan có khối u dự kiến cắt bỏ được</li>
                    <li>Thể tích gan còn lại phù hợp với bệnh nhân</li>
                    <li>Chức năng gan là Child-Pugh A đến B7</li>
                    <li>Điểm hoạt động cơ thể (PS) 0-2, không có di căn xa</li>
                </ul>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.2. Phẫu thuật ghép gan</h3>
                <p className="text-justify leading-7 text-sm">
                    Ghép gan là phương pháp duy nhất có thể giúp bệnh nhân điều trị cả UTBMTBG có bệnh lý gan
                    nền. Tiêu chuẩn Milan là tiêu chuẩn vàng để ghép gan cho UTBMTBG.
                </p>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.3. Phá hủy khối u tại chỗ (đốt u)</h3>
                <p className="text-justify leading-7 text-sm">
                    Có thể thực hiện bằng sóng cao tần (RFA), vi sóng (MWA), tiêm cồn (PEI) hoặc đốt lạnh (cryoablation)
                    trên bệnh nhân có PS 0-2, chức năng gan là Child Pugh A,B, không có di căn xa.
                </p>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.4. Nút mạch hóa chất (TACE)</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li>Nút mạch hóa chất thường quy (cTACE)</li>
                    <li>Nút mạch sử dụng hạt nhúng hóa chất (DEB-TACE)</li>
                </ul>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.5. Xạ trị trong chọn lọc (SIRT)</h3>
                <p className="text-justify leading-7 text-sm">
                    Sử dụng hạt vi cầu phóng xạ Ytrium-90 bơm vào động mạch nuôi khối u gan.
                </p>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">3. Điều trị toàn thân</h2>
                <p className="text-justify leading-7 text-sm mb-3 italic">Điều trị đích và điều trị miễn dịch:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong className="text-teal-700">Sorafenib:</strong> thuốc ức chế đa kinase đường uống, ức chế VEGFR-2 và BRAF.</li>
                    <li><strong className="text-teal-700">Regorafenib:</strong> thuốc ức chế đa kinase, tác động vào quá trình sinh mạch máu.</li>
                    <li><strong className="text-teal-700">Pembrolizumab:</strong> thuốc ức chế chốt kiểm soát miễn dịch.</li>
                </ul>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <h3 className="font-bold text-teal-900">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-slate-medium mt-2 space-y-1">
                        <li>1. Hướng dẫn chẩn đoán và điều trị ung thư gan - Bộ Y tế Việt Nam</li>
                        <li>2. AASLD Guidelines - Hepatocellular Carcinoma</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LiverTreatment;
