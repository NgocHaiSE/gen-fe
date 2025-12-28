const LungTreatment = () => {
    return (
        <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-slate-light pb-2">UNG THƯ PHỔI - CÁC ĐIỀU TRỊ KHÁC</h1>

            <div className="prose max-w-none text-ink-black">
                <p className="indent-6 text-justify leading-7 text-sm">
                    Điều trị ung thư phổi không tế bào nhỏ là điều trị đa mô thức. Các phương pháp điều trị với
                    ung thư phổi không tế bào nhỏ phổ biến hiện nay gồm có: Phẫu thuật, hóa trị, xạ trị, điều
                    trị nhắm trúng đích phân tử, điều trị liệu pháp miễn dịch. Việc điều trị căn cứ nhiều nhất
                    vào giai đoạn của bệnh.
                </p>

                <div className="my-6 text-center">
                    <img src="/other_treatment/lung_hinh1.png" alt="Các phương pháp cắt phổi" className="max-w-full mx-auto rounded-lg shadow-sm" />
                    <p className="text-sm text-slate-medium mt-2 italic">Hình 1. Các phương pháp cắt phổi ở giai đoạn sớm</p>
                </div>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">Giai đoạn I, II, IIIA</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li>Phẫu thuật là phương pháp được lựa chọn hàng đầu. Phẫu thuật cắt thùy phổi + vét hạch là phương pháp phổ biến nhất hiện nay. Sau phẫu thuật tùy vào diện cắt và tình trạng di căn hạch trung thất mà có các chỉ định điều trị bổ trợ phía sau.</li>
                    <li>Giai đoạn IIIA không có khả năng phẫu thuật: điều trị hóa xạ trị đồng thời.</li>
                </ul>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">Giai đoạn IIIB-IV</h2>
                <p className="text-justify leading-7 text-sm">
                    Điều trị hóa xạ trị đồng thời đối với giai đoạn IIIB hoặc điều trị toàn thân như giai đoạn
                    IV. Giai đoạn này không còn khả năng điều trị triệt căn. Mục tiêu của điều trị đối với bệnh
                    nhân giai đoạn này là kéo dài thời gian sống và duy trì chất lượng cuộc sống càng lâu càng
                    tốt, đồng thời giảm thiểu các tác dụng phụ do quá trình điều trị.
                </p>
                <p className="text-justify leading-7 text-sm mt-2">
                    Các yếu tố chính ảnh hưởng đến lựa chọn điều trị giai đoạn này là thể trạng bệnh nhân (PS),
                    số lượng các vị trí di căn, mô bệnh học vảy hay không vảy, tình trạng đột biến gen: EGFR, ALK,
                    ROS1, BRAF V600E... và tình trạng bộc lộ PD-L1.
                </p>

                <h2 className="text-xl font-bold text-teal-900 mt-6 mb-3">Điều trị đích theo đột biến gen</h2>
                <p className="text-justify leading-7 text-sm mb-3">
                    Đối với mỗi loại đột biến gen sẽ có các thuốc điều trị đích tương ứng với từng loại:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-justify">
                    <li><strong className="text-teal-700">Đột biến gen EGFR (+):</strong> điều trị thuốc TKIs như Erlotinib, Gefitinib, Afatinib, Osimertinib.</li>
                    <li><strong className="text-teal-700">Đột biến ALK (+):</strong> điều trị thuốc Crizotinib, Ceritinib, Brigatinib, Alectinib.</li>
                    <li><strong className="text-teal-700">Đột biến ROS1 (+):</strong> điều trị thuốc Crizotinib, Ceritinib.</li>
                    <li><strong className="text-teal-700">BRAF V600E:</strong> điều trị Dabrafenib + Trametinib.</li>
                    <li><strong className="text-teal-700">PD-L1 (+):</strong> có thể điều trị các thuốc miễn dịch hoặc kết hợp hóa trị liệu và miễn dịch.</li>
                    <li><strong className="text-teal-700">Hóa trị liệu:</strong> đối với các trường hợp không có đột biến gen.</li>
                </ul>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <h3 className="font-bold text-teal-900">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-slate-medium mt-2 space-y-1">
                        <li>1. Hướng dẫn chẩn đoán và điều trị ung thư phổi - Bộ Y tế Việt Nam</li>
                        <li>2. NCCN Guidelines - Non-Small Cell Lung Cancer</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LungTreatment;
