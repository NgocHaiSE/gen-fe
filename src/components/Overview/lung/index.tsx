import '../style-overview.css';

const LungOverview = () => {
  return (
    <>
      <h1>UNG THƯ PHỔI</h1>
      <h2>1. Dịch tễ</h2>
      <p>
        Ung thư phổi (UTP) là một dạng ung thư phổ biến và đã gây tử vong trong nhiều thập kỷ qua,
        là nguyên nhân chính dẫn đến tử vong do ung thư trên toàn thế giới. Theo số liệu GLOBOCAN
        2020, trên toàn cầu có 2.206.771 ca mắc mới UTP (chiếm 11,4%) và 1.761.144 ca tử vong (chiếm
        18,0%) do ung thư phổi. Tại Việt Nam, trong năm 2020, UTP được xếp thứ hai về tỷ lệ mắc mới
        và tỷ lệ tử vong, sau ung thư gan (chiếm tỷ lệ tử vong 18% trong tổng số các ca tử vong do
        ung thư).
      </p>
      <p>
        Theo phân loại của Tổ chức Y tế Thế giới (WHO), UTP được chia thành hai nhóm chính dựa trên
        đặc điểm mô bệnh học, đó là ung thư phổi không tế bào nhỏ (UTPKTBN) chiếm khoảng 85-90% và
        ung thư phổi tế bào nhỏ (chiếm 10-15%).
      </p>
      <h2>2. Nguyên nhân và yếu tố nguy cơ</h2>
      <p>
        - Nguyên nhân: Ung thư phát triển từ tổn thương DNA về mặt di truyền và những sự biến
        đổi ngoại di truyền (epigenetic). Những đột biến này ảnh hưởng đến các chức năng bình thường
        của tế bào, bao gồm sự tăng sinh tế bào, quá trình chết theo chương trình của tế bào
        (apoptosis) và sửa chữa DNA. Tổn thương tích lũy càng nhiều thì nguy cơ mắc ung thư càng
        tăng lên.[1]
      </p>
      <p>- Yếu tố nguy cơ:</p>
      <p>
        <b>1. Thuốc lá:</b>
      </p>
      <ul className="ul-class">
        <li>
          - Hút thuốc được xem là yếu tố nguy cơ chính gây ra ung thư phổi. Trong khói thuốc lá, có
          chứa nhiều hydrocarbon thơm, trong đó chất 3 - 4 Benzopyren là chất gây ung thư đã được
          chứng minh trên thực nghiệm.
        </li>
        <li>
          - Trong các nước phát triển, 90% số ca tử vong do ung thư phổi ở nam giới trong năm 2000
          được cho là do hút thuốc, tỉ lệ này đối với phụ nữ là 70%[2]. Hút thuốc cũng là nguyên
          nhân gây ra khoảng 85% số ca mắc bệnh.[3]
        </li>
        <li>
          - Người không hút thuốc cũng có nguy cơ mắc ung thư phổi do tiếp xúc với khói thuốc (hút
          thuốc thụ động). Nguy cơ mắc bệnh tăng lên khoảng 20–30% đối với những người sống cùng với
          người hút thuốc và 16–19% đối với những người làm việc trong môi trường có khói thuốc.[4]
        </li>
      </ul>
      <p>
        <b>2. Amiăng</b>
      </p>
      <ul className="ul-class">
        <li>
          - Amiăng là một chất gây ra nhiều bệnh phổi khác nhau, bao gồm ung thư phổi, thường gặp ở
          những công nhân sản xuất tấm lợp fibro xi măng. Hút thuốc lá và tiếp xúc với amiăng làm
          tăng nguy cơ mắc ung thư phổi [5]. Đối với những người hút thuốc và tiếp xúc với amiăng,
          nguy cơ mắc bệnh tăng từ 45 -90 lần so với người không tiếp xúc.[6]
        </li>
      </ul>
      <p>
        <b>3. Ô nhiễm không khí</b>
      </p>
      <ul className="ul-class">
        <li>
          Khí quyển chứa nhiều chất gây ung thư như 3-4 benzopyren, hydrocarbon thơm đa vòng, các
          muối như thạch tín, arsen, niken và crom. Các hạt vật chất nhỏ (bụi PM2.5) và các chất độc
          có trong khí thải xe cộ, nhà máy,... liên quan đến tăng nguy cơ nhẹ mắc ung thư phổi[7].
          Theo ước tính, ô nhiễm không khí ngoài trời là một trong những nguyên nhân gây ra một số
          trường hợp mắc ung thư phổi.
        </li>
        <li>
          Ngoài ra có thể kể đến những căn nguyên khác như điều kiện lao động, nhiễm độc nước, nhiễm
          phóng xạ, chế độ ăn uống, thói quen sinh hoạt, yếu tố di truyền….
        </li>
        <li>
          Trong đó có căn nguyên di truyền đang ngày càng được nghiên cứu và làm rõ ở mức độ tế bào
          và phân tử, cụ thể là đi sâu vào nghiên cứu những đột biến nhiễm sắc thể, đột biến gen
          liên quan.
        </li>
        <li>Khoảng 8% số ca ung thư phổi có nguyên nhân tới từ các yếu tố di truyền.[8]</li>
        <li>
          Một người có quan hệ họ hàng với người bị ung thư phổi thì nguy cơ mắc bệnh sẽ tăng lên
          2,4 lần. Điều này khả năng là do sự kết hợp gen.[9]
        </li>
      </ul>
      <h2>3. Lâm sàng</h2>
      <p>
        Triệu chứng sớm của ung thư phổi thường nghèo nàn và không đặc hiệu, thường dễ nhầm lẫn với
        các bệnh lý hô hấp khác. Bệnh thường được phát hiện tình cờ khi bệnh nhân đi khám định kỳ
        thông qua XQ phổi hoặc chụp CT lồng ngực.
      </p>
      <p>Giai đoạn muộn bệnh có triệu chứng lâm sàng rõ rệt:</p>
      <ul className="ul-class">
        <li>
          <b>Triệu chứng hô hấp</b>
        </li>
        <li>
          &emsp; - Ho: ho khan hoặc ho có đờm, có thể kéo dài không đỡ hoặc kèm theo ho ra máu.
        </li>
        <li>&emsp; - Đau tức ngực: thường đau ở vị trí tương ứng với tổn thương.</li>
        <li>&emsp; - Khó thở: do u quá to chèn ép hoặc tràn dịch màng phổi gây nên.</li>
        <li>
          <b>Triệu chứng do chèn ép</b>
        </li>
        <li>&emsp; - Khàn tiếng: do u chèn ép dây thần kinh thanh quản quặt ngược.</li>
        <li>&emsp; - Phù áo khoác: do chèn ép tĩnh mạch chủ trên.</li>
        <li>&emsp; - Khó nuốt: khi u to chèn ép thực quản.</li>
        <li>
          <b>Triệu chứng do di căn</b>
        </li>
        <li>&emsp; - Hạch thượng đòn</li>
        <li>&emsp; - Di căn xương: sưng, đau tại vị trí di căn, có thể có gãy xương do di căn.</li>
        <li>&emsp; - Di căn não: hội chứng tăng áp lực nội sọ, dấu hiệu liệt thần kinh khu trú.</li>
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

      <h2>4. Cận lâm sàng</h2>
      <p>
        - XQ phổi thẳng nghiêng : Là phương pháp chẩn đoán ban đầu hiệu quả, đơn giản, rẻ tiền giúp
        phát hiện sớm các tổn thương ung thư phổi. Một số hình ảnh nghi ngờ trên XQ như: khối, nốt
        mờ trên nhu mô, hình ảnh tràn dịch màng phổi, xẹp phổi....
      </p>
      <p>
        - Chụp cắt lớp vi tính lồng ngực : Chụp cắt lớp vi tính lồng ngực giúp xác định được kích
        thước, số lượng u, bờ khối u có tua gai, có múi hay không đều. Ngoài ra còn thấy khối u có
        di căn vào hạch rốn phổi, trung thất, u có dính vào các động mạch lớn hoặc các bộ phận khác,
        khối u làm tiêu xương sườn hoặc xương cột sống; tràn dịch khoang màng phổi, tràn dịch màng
        tim,….Chụp cắt lớp vi tính lồng ngực còn giúp định hướng cho sinh thiết làm giải phẫu bệnh
        để chẩn đoán ung thư phổi.
      </p>
      <p>
        - Nội soi phế quản: Đây là phương pháp giúp phát hiện các tổn thương u tại vị trí trung tâm,
        xâm lấn vào khí phế quản hoặc các tổn thương từ ngoài chèn vào. Ngoài ra nội soi phế quản
        còn giúp sinh thiết tổn thương u làm GPB.
      </p>
      <div className="hinh1-overview">
        <img src="/overviewImage/hinh1-lung-overview.png"></img>
      </div>
      <br />
      <p>
        - Chụp cắt lớp vi tính ổ bụng, siêu âm ổ bụng: CT và SÂ ổ bụng giúp đánh giá các tổn thương
        di căn tại ổ bụng như di căn gan, di căn hạch ổ bụng, di căn thượng thận...
      </p>
      <p>
        - Chụp cắt lớp vi tính/chụp cộng hưởng từ sọ não, cột sống: Giúp đánh giá các tổn thương di
        căn não, di căn cột sống, phát hiện các tổn thương chèn ép tủy sống để có biện pháp xử lý
        kịp thời, phòng tránh các tai biến bất lợi cho bệnh nhân như liệt 2 chi dưới.
      </p>
      <p>- Xạ hình xương: Đánh giá các tổn thương di căn xương.</p>
      <p>- Sinh thiết làm giải phẫu bệnh: là tiêu chuẩn vàng để chẩn đoán</p>
      <p>- Tế bào học</p>
      <ul className="ul-class">
        <li>+ Hạch thượng đòn</li>
        <li>+ Dịch màng phổi, màng tim</li>
        <li>+ Các vị trí di căn khác gần bề mặt da</li>
      </ul>

      <p>
        - PET/CT: Là phương pháp chẩn đoán hình ảnh toàn diện nhất để đánh giá ung thư phổi. PET/CT
        giúp xác định khối u phổi nguyên phát, các tổn thương di căn hạch trung thất, các tổn thương
        di căn xa tại các vị trí khác trên cơ thể chỉ với 1 lần chụp. Từ đó giúp cho việc chẩn đoán
        bệnh, chẩn đoán giai đoạn chính xác để điều trị đúng và có hiệu quả hơn.
      </p>
      <p>
        - Các chất chỉ điểm u: giúp định hướng chẩn đoán xác định u nguyên phát tại phổi hay chẩn
        đoán phân biệt u di căn từ vị trí khác.
      </p>
      <p>- Các xét nghiệm máu: công thức máu, sinh hóa máu, chức năng gan thận, đông máu cơ bản</p>
      <p>- Các thăm dò chức năng: điện tâm đồ, siêu âm tim, đo chức năng hô hấp</p>
      <p>- XN gen: Xác định đột biến gen giúp chỉ định thuốc điều trị đích…</p>
      <h2>Tài liệu tham khảo: </h2>
      <ul className="ul-class">
        <li>
          1. Brown, K. and S. KeatsJJ, Chapter 8 Holland–Frei CancerMedicine . People’s Medical
          Publishing House USA. 2010.
        </li>
        <li>
          2. Peto, R., J. Boreham, and A.D. Lopez, Mortality from smoking in developed countries.
          1996: Oxford university press.
        </li>
        <li>
          3. Ruano-Ravina, A., A. Figueiras, and J. Barros-Dios, Lung cancer and related risk
          factors: an update of the literature. Public health, 2003. 117(3): p. 149-156.
        </li>
        <li>4. Organization, W.H., Frequently asked questions about second hand smoke. 2011.</li>
        <li>
          5. O'Reilly, K.M., et al., Asbestos-related lung disease. American family physician, 2007.
          75(5): p. 683-688.
        </li>
        <li>
          6. Tobias, J.S. and D. Hochhauser, Cancer and its management. 2014: John Wiley & Sons.
        </li>
        <li>
          7. Goldberg, M., A systematic review of the relation between long-term exposure to ambient
          air pollution and chronic diseases. Reviews on environmental health, 2008. 23(4): p.
          243-298.
        </li>
        <li>
          8. Yang, I.A., J.W. Holloway, and K.M. Fong, Genetic susceptibility to lung cancer and
          co-morbidities. Journal of thoracic disease, 2013. 5(Suppl 5): p. S454.
        </li>
        <li>
          9. Kern, J. and G. McLennan, Fishman's Pulmonary Diseases and Disorders. 1802,
          McGraw-Hill. hlm.
        </li>
      </ul>
    </>
  );
};

export default LungOverview;
