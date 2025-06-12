import { PageContainer } from '@ant-design/pro-components';
import '../style-overview.css';

const LiverOverview = () => {
  return (
    <PageContainer>
      <h1>UNG THƯ GAN</h1>
      <h2>1. Dịch tễ</h2>
      <p>
        Theo Globocal 2020, Ung thư gan (UTG) là loại ung thư thường gặp nhất và là nguyên nhân hàng
        đầu gây tử vong tại Việt Nam. Tại Việt Nam chưa có số liệu quốc gia được công bố chính thức
        về xuất độ UTG. Một nghiên cứu đã ghi nhận số liệu về ung thư gan và viêm gan virus B (HBV)
        và viêm gan virus C (HCV) tại miền Trung và miền Nam Việt Nam trong giai đoạn từ 2010 đến
        2016. Theo nghiên cứu, trong số 24.091 trường hợp được ghi nhận, khoảng 62,3% trường hợp có
        nhiễm virus viêm gan B (HBV) mạn và 26% trường hợp có nhiễm virus viêm gan C (HCV) mạn. Điều
        này có nguyên nhân từ mức độ lây nhiễm cao của virus viêm gan B trong nước, và ước tính
        khoảng 12,3% nam giới và 8,8% nữ giới ở Việt Nam mắc viêm gan B mạn. Việc tiêm chủng phòng
        viêm gan B cho trẻ em tại Việt Nam đã giảm tỷ lệ mắc viêm gan B mạn.
      </p>
      <h2>2. Nguyên nhân và yếu tố nguy cơ</h2>
      <div>
        <img src="/overviewImage/hinh1-liver-cancer.jpg" alt="" />
      </div>
      <p>
        - Virus viêm gan B (HBV): Theo Tổ chức Y tế Thế giới (WHO) năm 2016, dựa trên nghiên cứu từ
        2003 đến 2014, tỷ lệ nhiễm HBV ở người lớn tại Việt Nam dao động từ 8,2% đến 19%. Các nghiên
        cứu phân tích gộp đã chỉ ra rằng nguy cơ mắc ung thư gan ở những người nhiễm HBV cao hơn
        15-20 lần so với những người không nhiễm. Tỷ lệ nguy cơ bị ung thư gan trong đời của người
        nhiễm HBV mạn khoảng 10-25%. Có nhiều yếu tố có thể tăng nguy cơ mắc ung thư gan ở người
        nhiễm HBV mạn, bao gồm các yếu tố về đặc điểm (nam giới, tuổi cao, có tiền sử gia đình bị
        ung thư gan), về virus (mức độ nhân bản HBV cao, kiểu HBV, thời gian nhiễm HBV, đồng nhiễm
        với HCV, HIV, HDV), về tình trạng lâm sàng (có xơ gan) và về môi trường và lối sống (phơi
        nhiễm với aflatoxin, nghiện rượu nặng, hút thuốc lá).
      </p>
      <p>
        - Virus viêm gan C (HCV): Theo Tổ chức Y tế Thế giới (WHO) năm 2016, dựa trên nghiên cứu từ
        2003 đến 2014, tỷ lệ nhiễm HCV ở người lớn tại Việt Nam khoảng 1-3,3%. Phân tích gộp từ một
        số nghiên cứu bệnh chứng cho thấy nguy cơ mắc ung thư gan ở những người có kháng thể kháng
        HCV gấp 17 lần so với những người không có kháng thể.
      </p>
      <p>
        - Đồng nhiễm HBV và HCV: Đồng nhiễm HBV và HCV làm tăng nguy cơ mắc ung thư gan. Trong một
        nghiên cứu với 24.091 trường hợp ung thư gan tại miền Trung và miền Nam Việt Nam từ năm 2010
        đến 2016, tỷ lệ đồng nhiễm HBV và HCV đạt 2,7%.
      </p>
      <p>
        - Sử dụng đồ uống có cồn: một phân tích gộp trên 19 nghiên cứu tiến cứu ghi nhận nguy cơ
        UTBMTBG tăng 16% ở những người sử dụng từ 3 đơn vị đồ uống có cồn trở lên mỗi ngày và tăng
        22% ở những người sử dụng từ 6 đơn vị đồ uống có cồn trở lên mỗi ngày, và nguy cơ này cũng
        tăng ngay cả khi chỉ sử dụng lượng cồn thấp nhất mỗi ngày (25g mỗi ngày, tương ứng với 2 đơn
        vị đồ uống có cồn mỗi ngày).
      </p>
      <p>
        <b>2.1. Phòng ngừa UTBMTBG </b>
      </p>
      <ul className="ul-class">
        <li>
          - Nên sử dụng vaccin chủng ngừa HBV cho trẻ em, nhất là trẻ sơ sinh để ngăn ngừa việc
          nhiễm HBV. Nên điều trị lâu dài và hiệu quả cho các bệnh nhân nhiễm HBV mạn và có bệnh lý
          gan đang hoạt động.
        </li>
        <li>
          - Nên điều trị viêm gan virus C cho đến khi bệnh nhân đạt được đáp ứng virus bền vững
          (sustained virologic response - SVR). Nguy cơ UTBMTBG sẽ giảm đáng kể nếu các bệnh nhân
          viêm gan virus C mạn đạt được SVR. Tuy nhiên, ngay cả khi đạt được SVR, các bệnh nhân lớn
          tuổi, số lượng tiểu cầu thấp, và/hoặc có xơ gan vẫn có nguy cơ UTBMTBG cao và cần được tầm
          soát.
        </li>
        <li>
          - Nên điều trị các bệnh lý chuyển hóa như bệnh gan nhiễm mỡ không do rượu (Non-alcoholic
          Fatty Liver Disease - NAFLD), bệnh viêm gan thoái hóa mỡ không do rượu (Non-alcoholic
          Steatohepatitis - NASH) vì các bệnh lý này làm tăng nguy cơ UTBMTBG, nhất là khi đã có xơ
          gan. Các hội chứng chuyển hóa, đặc biệt là tiểu đường và béo phì, làm tăng nguy cơ UTBMTBG
          trên các bệnh nhân bị NASH..
        </li>
      </ul>
      <h2>3. Chẩn đoán ung thư gan</h2>
      <p>
        Triệu chứng sớm của ung thư phổi thường nghèo nàn và không đặc hiệu, thường dễ nhầm lẫn với
        các bệnh lý hô hấp khác. Bệnh thường được phát hiện tình cờ khi bệnh nhân đi khám định kỳ
        thông qua XQ phổi hoặc chụp CT lồng ngực.
      </p>
      <p>
        <b>3.1. Khám lâm sàng và các xét nghiệm cận lâm sàng </b>
      </p>
      <ul className="ul-class">
        <li>
          <b>- Tìm hiểu các yếu tố nguy cơ của bệnh nhân: </b>
        </li>
        <li>&emsp; + Tiền sử nhiễm HBV và/hoặc HCV, hoặc đang điều trị cho hai loại virus này.</li>
        <li>
          &emsp; + Tiền sử gia đình có người bị nhiễm HBV và/hoặc HCV hoặc đã được chẩn đoán
          UTBMTBG.
        </li>
        <li>&emsp; + Tiếp xúc với máu qua truyền máu hoặc sử dụng kim tiêm chung.</li>
        <li>&emsp; + Thói quen sử dụng đồ uống có cồn (số lượng, tần suất, thời gian, ...).</li>
        <li>&emsp; + Tiếp xúc với các chất độc hại hoặc hóa chất.</li>
        <li>&emsp; + Lý do đến khám bệnh và triệu chứng có thể liên quan.</li>
        <li>
          <b> - Khám lâm sàng: </b>
        </li>
        <li>
          &emsp; + Phần lớn các trường hợp UTBMTBG chỉ có đau bụng mơ hồ hoặc được phát hiện tình
          cờ.
        </li>
        <li>&emsp; + Đánh giá toàn trạng, dấu hiệu sinh tồn, tình trạng vàng da niêm mạc.</li>
        <li>&emsp; + Khám tổng thể, khám bụng, chú ý đến kích thước gan</li>
        <li>
          <b>- Các xét nghiệm cận lâm sàng cần làm: </b>
        </li>
        <li>
          &emsp; + Xét nghiệm máu để đánh giá công thức máu, chức năng đông máu, và mức đường huyết.
        </li>
        <li>
          &emsp; + Xét nghiệm chức năng gan và thận, bao gồm các chỉ số ALT, AST, bilirubin,
          albumin, ure, creatinine trong máu.
        </li>
        <li>
          &emsp; + Xét nghiệm miễn dịch để phát hiện virus viêm gan B và C, bằng các xét nghiệm
          HBsAg và AntiHCV.
        </li>
        <li>
          &emsp; + Xét nghiệm các dấu ấn sinh học của UTBMTBG bao gồm AFP, AFP-L3, PIVKA II (DCP).
        </li>
        <li>&emsp; + Các dấu ấn ung thư khác (nếu cần): CEA, CA 19.9, PSA, CA 12.5, …</li>
        <li>&emsp; + X quang phổi thẳng.</li>
        <li>&emsp; + Siêu âm Doppler mạch máu gan.</li>
        <li>&emsp; + CT scan bụng có cản quang (và MRI bụng có tương phản từ nếu cần).</li>
        <li>
          <b>Các hội chứng cận u</b>
        </li>
        <li>
          &emsp; - Hội chứng Pancoast – Tobias: do u chèn ép đám rối thần kinh cánh tay, gây ra: đau
          vai, chi trên, ở mặt trong cánh tay, cẳng tay, teo cơ mô út.
        </li>
        <li>
          &emsp; - Hội chứng Claude – Bernard – Horner: do u chèn ép đám rối thần kinh giao cảm cổ,
          gây ra: đồng tử co, sụp mi, hẹp khe mi, nửa mặt đỏ.
        </li>
        <li>&emsp; - Hội chứng Pierre – Marrie: ngón tay ngón chân dùi trống.</li>
        <li>&emsp; - Hội chứng Cushing.</li>
        <li>&emsp; - Hội chứng tăng tiết hormone chống bài niệu.</li>
      </ul>
      <p>
        <b>3.2. Hình ảnh học </b>
      </p>
      <p>
        <b>3.2.1 Siêu âm </b>
      </p>
      <p>
        <b>a. Siêu âm 2D và siêu âm Doppler mạch máu gan: </b>
      </p>
      <p>
        - Siêu âm 2D và siêu âm Doppler thường được sử dụng làm phương pháp tầm soát và theo dõi
        UTBMTBG do tính thuận tiện và chi phí thấp. Tuy nhiên, chúng không đủ để chẩn đoán UTBMTBG.
      </p>
      <p>
        - Siêu âm 2D được sử dụng để đánh giá hình dạng, vị trí, số lượng và kích thước của khối u
        gan, cũng như tình trạng bệnh lý gan nền và dịch ổ bụng, cũng như các tổn thương liên quan
        trong ổ bụng.
      </p>
      <p>
        - Siêu âm Doppler mạch máu gan cho phép đánh giá tình trạng cung cấp máu của khối u, sự xâm
        lấn của khối u vào các mạch máu xung quanh, đặc biệt là tĩnh mạch cửa và tĩnh mạch chủ dưới.
      </p>
      <p>
        - Hệ thống Dữ liệu và Báo cáo hình ảnh Gan (The Liver Imaging Reporting And Data System -
        LI-RADS) khuyến nghị sử dụng siêu âm không tiêm chất tương phản để tầm soát và theo dõi
        UTBMTBG ở các bệnh nhân có xơ gan và các yếu tố nguy cơ cao khác.
      </p>
      <p>
        <b>b. Siêu âm có chất tương phản (contrast-enhanced ultrasound - CEUS)</b>
      </p>
      <p>
        Siêu âm có chất tương phản được sử dụng để chẩn đoán UTBMTBG. Trong quá trình sinh UTBMTBG,
        có những thay đổi chính bao gồm sự hình thành mạch, biến đổi tế bào gan và giảm số lượng
        cũng như chức năng của tế bào Kupffer. Trong đó, những thay đổi quan trọng nhất để chẩn đoán
        UTBMTBG là sự thay đổi về huyết động của các nốt, bao gồm tăng lưu lượng động mạch và giảm
        lưu lượng tĩnh mạch cửa.
      </p>
      <p>
        Các vi bóng khí trong CEUS được phagocytosis bởi tế bào Kupffer, do đó hình ảnh tế bào
        Kupffer có thể quan sát được. Điều này giúp phân biệt được các khối u ác tính với vùng gan
        xung quanh do khối u ít hoặc không chứa tế bào Kupffer. Hình ảnh đặc trưng của UTBMTBG trên
        CEUS là sự tăng cường mạnh trong giai đoạn động mạch (arterial phase hyperenhancement -
        APHE) và sau đó là sự giảm cường độ trong khoảng 60 giây.
      </p>
      <p>
        CEUS có độ nhạy cao trong việc phát hiện các tình trạng giảm cường độ mạch máu trong giai
        đoạn động mạch và nó hiển thị rõ ràng hơn dấu hiệu "thải thuốc" nhanh (xảy ra sớm, xảy ra
        trong khoảng thời gian 55-60 giây) đối với các bệnh ác tính không phải là UTBMTBG, và dấu
        hiệu "thải thuốc" chậm (sau 60 giây) đối với UTBMTBG.
      </p>
      <p>
        <b>3.2.2. Chụp cắt lớp vi tính (CT) và cộng hưởng từ (MRI): </b>
      </p>
      <p>
        Chụp cắt lớp vi tính (CT) và cộng hưởng từ (MRI) đóng vai trò quan trọng trong chẩn đoán và
        đưa ra quyết định điều trị UTBMTBG bằng cách mô tả chi tiết hình thái và động học tưới máu
        gan. Tổn thương UTBMTBG thường đi kèm với sự thay đổi điển hình là tăng nguồn cấp máu từ
        động mạch và giảm nguồn cấp máu từ tĩnh mạch cửa. Để chẩn đoán UTBMTBG, thông thường cần
        tiến hành CT đa dãy đầu dò đủ 4 thì và/hoặc MRI động có thì động mạch trễ, thì tĩnh mạch cửa
        và thì muộn (khoảng 3-5 phút sau khi tiêm chất tương phản từ).
      </p>
      <p>
        CT động và MRI động cho phép đánh giá mức độ phân bố mạch máu trong khối u, với hình ảnh
        điển hình của UTBMTBG là sự tăng cường mạnh trong giai đoạn động mạch và sau đó là sự giảm
        cường độ trong thì tĩnh mạch cửa và/hoặc thì muộn. MRI cũng có khả năng phát hiện các khối u
        nhỏ, đặc biệt là những khối u có kích thước dưới 2cm, thông qua việc sử dụng nhiều chuỗi
        xung và đặc biệt là chuỗi xung khuếch tán, giúp tăng tính nhạy trong quá trình chẩn đoán.
      </p>
      <p>
        MRI có khả năng phân biệt UTBMTBG và các tổn thương khác trong gan như u máu, u tuyến
        (adenoma), tăng sinh dạng nốt khu trú (focal nodular hyperplasia-FNH), di căn gan hoặc nốt
        tân tạo trong xơ gan. Trong nhiều nghiên cứu về giá trị chẩn đoán UTBMTBG, MRI thường có độ
        nhạy cao hơn CT, đạt độ chuyên biệt từ 85% đến 100%, đặc biệt đối với những tổn thương nhỏ.
        Gần đây, các nghiên cứu khuyến nghị sử dụng chất tương phản từ gan-mật gadoxetate disodium
        (Gd-EOB-DTPA) trong quá trình chụp MRI, với khả năng chẩn đoán cao hơn so với CT động và MRI
        sử dụng các chất tương phản khác.
      </p>
      <p>
        Hình ảnh điển hình của UTBMTBG trên CT/MRI là giảm đậm độ ở thì chưa tiêm thuốc, ngấm thuốc
        mạnh ở thì động mạch (arterial phase hyperenhancement - APHE) và thải thuốc (wash-out) ở thì
        tĩnh mạch cửa hay thì muộn. Ngoài giá trị chẩn đoán, CT/MRI còn được sử dụng để theo dõi và
        đánh giá sau điều trị UTBMTBG.
      </p>
      <p>
        <b>3.2.3. PET và PET/CT: </b>
      </p>
      <p>
        Phương pháp chụp PET và PET/CT đóng vai trò quan trọng trong quá trình chẩn đoán UTBMTBG.
        Tuy nhiên, chỉ khoảng 40% các trường hợp UTBMTBG có khả năng hấp thu Fluorodeoxyglucose F18
        (18F) trong quá trình chụp PET và PET/CT. Đặc biệt, các trường hợp UTBMTBG có tính chất biệt
        hóa cao thường cho kết quả âm tính trong quá trình chụp PET và PET/CT. Mặc dù vậy, PET và
        PET/CT vẫn rất hữu ích trong việc phát hiện các tổn thương di căn ngoài gan của UTBMTBG, đặc
        biệt là trong những trường hợp không tìm thấy tổn thương UTBMTBG mới hoặc tiến triển tại gan
        sau quá trình điều trị.
      </p>
      <p>
        Ngoài ra, có thể sử dụng phương pháp PET/CT với chất tương phản 11C-Choline để phát hiện tổn
        thương tại gan và ngoài gan một cách tốt hơn so với sử dụng chất tương phản 18F.
      </p>
      <p>
        <b>3.2.4. Các xét nghiệm khác </b>
      </p>
      <p>
        - Xạ hình xương bằng máy SPECT, SPECT/CT với 99mTc-MDP để đánh giá tổn thương di căn xương,
        chẩn đoán giai đoạn bệnh trước điều trị, theo dõi đáp ứng điều trị, đánh giá tái phát và di
        căn.
      </p>
      <p>
        - Xạ hình thận chức năng bằng máy SPECT, SPECT/CT với 99mTc-DTPA để đánh giá chức năng thận
        trước điều trị và sau điều trị.
      </p>
      <p>
        - Xạ hình - SPECT gan với 99mTc-Sulfure Colloid: hình ảnh khối choán chỗ trong gan, áp dụng
        trong một số trường hợp.
      </p>
      <p>- Xạ hình gan mật trong một số trường hợp.</p>
      <p>
        <b>3.3. Chỉ dấu sinh học </b>
      </p>
      <p>
        <b>3.3.1. Alpha-fetoprotein (AFP): </b>
      </p>
      <p>
        AFP (alpha-fetoprotein) có vai trò chưa được hiểu rõ. AFP có thể tăng trong trường hợp viêm
        gan hoạt động và xơ gan, và có thể giảm sau khi điều trị viêm gan bằng các thuốc đối phó với
        viêm gan virus B (HBV) và virus C (HCV). Ngưỡng giá trị bình thường của AFP là 20 ng/ml, và
        ngưỡng giá trị chẩn đoán là 400 ng/ml. AFP có thể được kết hợp với siêu âm để sàng lọc
        UTBMTBG trên các nhóm người có nguy cơ.
      </p>
      <p>
        <b>3.3.2. Lens culinaris agglutinin-reactive fraction of AFP (AFP-L3): </b>
      </p>
      <p>
        Có thể được dùng để phân biệt sự gia tăng AFP trong các trường hợp UTBMTBG với các trường
        hợp u lành tính ở gan. Ngưỡng giá trị bình thường của AFP-L3 là 5%.
      </p>
      <p>
        <b>
          3.3.3. Prothrombin induced by vitamin K absence-II (PIVKA II) hay còn gọi là
          Des-gamma-carboxyprothrombin (DCP) II:{' '}
        </b>
      </p>
      <p>
        PIVKA II là một prothombin bất thường, tăng trong huyết thanh của các trường hợp UTBMTBG.
        Ngưỡng giá trị bình thường của PIVKA II là 40 mAU/ml.
      </p>
      <p>
        <b>3.3.4. Một số chỉ dấu sinh học khác trong huyết thanh </b>
      </p>
      <p>
        Các chỉ dấu sinh học khác như Glypican-3 (GPC3), Golgi protein 73 (GP73), Osteopontin,
        circulating cell free DNA, và các microRNA chưa có vai trò rõ ràng về chuyên môn lẫn hiệu
        quả về kinh tế.
      </p>
      <p>
        <b>3.3.5. Kết hợp các chỉ dấu sinh học trong huyết thanh: </b>
      </p>
      <p>
        Sự kết hợp các chỉ dấu sinh học AFP, AFP-L3 và PIVKA II trong huyết thanh làm tăng độ nhạy
        trong sàng lọc và chẩn đoán UTBMTBG nên hay được sử dụng trong thực tế lâm sàng.
      </p>
      <p>
        <b>3.4. Sinh thiết gan:</b>
      </p>
      <p>
        Trong trường hợp gan bị tổn thương mà không đáp ứng đủ các tiêu chuẩn chẩn đoán, sinh thiết
        gan có thể được thực hiện khi cần thiết mà không có nguy cơ cao về chảy máu hoặc lan truyền
        tế bào ung thư. Kết quả của sinh thiết gan cần được so sánh với các thông tin từ hình ảnh và
        chỉ dấu sinh học để quyết định liệu có cần tiếp tục thực hiện sinh thiết lại hay tiếp tục
        theo dõi. Nếu quyết định tiếp tục theo dõi, thì sau hai tháng cần đánh giá lại tổn thương
        bằng cách sử dụng hình ảnh và chỉ dấu sinh học.
      </p>
    </PageContainer>
  );
};

export default LiverOverview;
