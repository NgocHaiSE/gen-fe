const ThyroidTreatment = () => {
    return (
        <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-slate-light pb-2">UNG THƯ TUYẾN GIÁP - CÁC ĐIỀU TRỊ KHÁC</h1>

            <div className="prose max-w-none text-ink-black">
                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">1. Nguyên tắc điều trị</h2>
                <p className="text-justify leading-7 text-sm">
                    Điều trị ung thư tuyến giáp phụ thuộc vào loại mô bệnh học, giai đoạn bệnh và các yếu tố nguy cơ.
                    Phần lớn ung thư tuyến giáp biệt hóa có tiên lượng tốt.
                </p>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">2. Các phương pháp điều trị</h2>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.1. Phẫu thuật</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong>Cắt thùy giáp:</strong> Đối với vi ung thư nhú, u nhỏ &lt; 1cm</li>
                    <li><strong>Cắt tuyến giáp toàn phần:</strong> Phương pháp tiêu chuẩn cho đa số trường hợp</li>
                    <li><strong>Nạo vét hạch cổ:</strong> Hạch trung tâm và/hoặc hạch bên cổ khi có chỉ định</li>
                </ul>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.2. Điều trị I-131 (Iod phóng xạ)</h3>
                <p className="text-justify leading-7 text-sm">
                    Chỉ định sau phẫu thuật cắt tuyến giáp toàn phần đối với ung thư biệt hóa để:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify mt-2">
                    <li>Tiêu hủy mô giáp còn sót lại</li>
                    <li>Điều trị di căn hạch và di căn xa</li>
                    <li>Giúp theo dõi Thyroglobulin sau điều trị</li>
                </ul>

                <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">2.3. Điều trị ức chế TSH</h3>
                <p className="text-justify leading-7 text-sm">
                    Sử dụng Levothyroxine liều cao để ức chế TSH, giảm nguy cơ tái phát đối với ung thư biệt hóa.
                </p>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">3. Điều trị đích</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong className="text-teal-700">Sorafenib, Lenvatinib:</strong> Ung thư tuyến giáp biệt hóa kháng I-131</li>
                    <li><strong className="text-teal-700">Vandetanib, Cabozantinib:</strong> Ung thư tuyến giáp thể tủy tiến triển</li>
                    <li><strong className="text-teal-700">Selpercatinib, Pralsetinib:</strong> Ung thư có đột biến RET</li>
                    <li><strong className="text-teal-700">Larotrectinib, Entrectinib:</strong> Ung thư có đột biến NTRK</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">4. Xạ trị ngoài</h2>
                <p className="text-justify leading-7 text-sm">
                    Chỉ định cho ung thư không biệt hóa, ung thư kháng I-131, hoặc di căn xương, não gây chèn ép.
                </p>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <h3 className="font-bold text-teal-900">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-slate-medium mt-2 space-y-1">
                        <li>1. Hướng dẫn chẩn đoán và điều trị ung thư tuyến giáp - Bộ Y tế Việt Nam</li>
                        <li>2. American Thyroid Association Guidelines</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ThyroidTreatment;
