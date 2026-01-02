const LiverOverview = () => {
    return (
        <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-gray-200 pb-2">UNG THƯ GAN</h1>

            <div className="prose prose-blue max-w-none text-gray-700">
                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">1. Dịch tễ</h2>
                <p className="indent-6 text-justify leading-7 text-sm">
                    Theo Globocal 2020, Ung thư gan (UTG) là loại ung thư thường gặp nhất và là nguyên nhân hàng
                    đầu gây tử vong tại Việt Nam. Tại Việt Nam chưa có số liệu quốc gia được công bố chính thức
                    về xuất độ UTG. Một nghiên cứu đã ghi nhận số liệu về ung thư gan và viêm gan virus B (HBV)
                    và viêm gan virus C (HCV) tại miền Trung và miền Nam Việt Nam trong giai đoạn từ 2010 đến
                    2016. Theo nghiên cứu, trong số 24.091 trường hợp được ghi nhận, khoảng 62,3% trường hợp có
                    nhiễm virus viêm gan B (HBV) mạn và 26% trường hợp có nhiễm virus viêm gan C (HCV) mạn.
                </p>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">2. Nguyên nhân và yếu tố nguy cơ</h2>
                <p className="text-justify leading-7 text-sm">
                    - Virus viêm gan B (HBV): Theo Tổ chức Y tế Thế giới (WHO) năm 2016, tỷ lệ nhiễm HBV ở người lớn
                    tại Việt Nam dao động từ 8,2% đến 19%. Các nghiên cứu phân tích gộp đã chỉ ra rằng nguy cơ mắc
                    ung thư gan ở những người nhiễm HBV cao hơn 15-20 lần so với những người không nhiễm.
                </p>
                <p className="text-justify leading-7 text-sm mt-2">
                    - Virus viêm gan C (HCV): Tỷ lệ nhiễm HCV ở người lớn tại Việt Nam khoảng 1-3,3%. Nguy cơ mắc
                    ung thư gan ở những người có kháng thể kháng HCV gấp 17 lần so với những người không có kháng thể.
                </p>
                <p className="text-justify leading-7 text-sm mt-2">
                    - Đồng nhiễm HBV và HCV: Đồng nhiễm HBV và HCV làm tăng nguy cơ mắc ung thư gan. Trong một
                    nghiên cứu với 24.091 trường hợp ung thư gan tại miền Trung và miền Nam Việt Nam từ năm 2010
                    đến 2016, tỷ lệ đồng nhiễm HBV và HCV đạt 2,7%.
                </p>
                <p className="text-justify leading-7 text-sm mt-2">
                    - Sử dụng đồ uống có cồn: Nguy cơ UTBMTBG tăng 16% ở những người sử dụng từ 3 đơn vị đồ uống
                    có cồn trở lên mỗi ngày và tăng 22% ở những người sử dụng từ 6 đơn vị đồ uống có cồn trở lên mỗi ngày.
                </p>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">2.1. Phòng ngừa UTBMTBG:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Nên sử dụng vaccin chủng ngừa HBV cho trẻ em, nhất là trẻ sơ sinh để ngăn ngừa việc nhiễm HBV.</li>
                        <li>Nên điều trị viêm gan virus C cho đến khi bệnh nhân đạt được đáp ứng virus bền vững (SVR).</li>
                        <li>Nên điều trị các bệnh lý chuyển hóa như bệnh gan nhiễm mỡ không do rượu (NAFLD), bệnh viêm gan thoái hóa mỡ không do rượu (NASH).</li>
                    </ul>
                </div>

                <h2 className="text-xl font-bold text-teal-800 mt-6 mb-3">3. Chẩn đoán ung thư gan</h2>

                <div className="pl-4 mt-2">
                    <p className="font-bold text-sm text-teal-700">3.1. Khám lâm sàng và các xét nghiệm cận lâm sàng:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Tìm hiểu các yếu tố nguy cơ của bệnh nhân: tiền sử nhiễm HBV và/hoặc HCV</li>
                        <li>Tiền sử gia đình có người bị nhiễm HBV và/hoặc HCV hoặc đã được chẩn đoán UTBMTBG</li>
                        <li>Thói quen sử dụng đồ uống có cồn (số lượng, tần suất, thời gian)</li>
                        <li>Tiếp xúc với các chất độc hại hoặc hóa chất</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">3.2. Hình ảnh học:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Siêu âm 2D và siêu âm Doppler mạch máu gan</li>
                        <li>Siêu âm có chất tương phản (CEUS)</li>
                        <li>Chụp cắt lớp vi tính (CT) và cộng hưởng từ (MRI)</li>
                        <li>PET và PET/CT</li>
                    </ul>
                </div>

                <div className="pl-4 mt-4">
                    <p className="font-bold text-sm text-teal-700">3.3. Chỉ dấu sinh học:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-justify">
                        <li>Alpha-fetoprotein (AFP): Ngưỡng giá trị bình thường là 20 ng/ml, ngưỡng chẩn đoán là 400 ng/ml</li>
                        <li>AFP-L3: Ngưỡng giá trị bình thường là 5%</li>
                        <li>PIVKA II (DCP): Ngưỡng giá trị bình thường là 40 mAU/ml</li>
                    </ul>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="font-bold text-teal-800">Tài liệu tham khảo:</h3>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>1. GLOBOCAN 2020: Estimated cancer incidence, mortality and prevalence worldwide</li>
                        <li>2. Bộ Y tế Việt Nam - Hướng dẫn chẩn đoán và điều trị ung thư gan</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LiverOverview;
