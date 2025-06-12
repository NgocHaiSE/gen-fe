import '../style-other-treatment.css';

const ThyroidTreatment = () => {
  return (
    <>
      <h1>UNG THƯ TUYẾN GIÁP</h1>
      <h2>A. Phẫu thuật </h2>
      <div className="hinh1-overview">
        <img src="/other_treatment/thyroid_hinh1.png"></img>
      </div>
      <p>
        Hình 1. Tuyến giáp chứa khối u và sau khi cắt 1 thuỳ tuyến giáp - cắt toàn bộ tuyến giáp{' '}
      </p>

      <p>
        {' '}
        <i> Với ung thư tuyến giáp biệt hóa: </i>{' '}
      </p>
      <p>Chỉ định cắt tuyến giáp toàn bộ trong các trường hợp:</p>
      <ul className="ul-class">
        <li> • Tiền sử xạ trị vùng cổ </li>
        <li> • U kích thước lớn hơn 4cm hoặc đã xâm lấn các cấu trúc lân cận </li>
        <li> • Có tổn thương thùy đối bên </li>
        <li> • Có di căn hạch cổ </li>
        <li> • Có di căn xa </li>
        <li> • Ung thư tuyến giáp tái phát </li>
      </ul>
      <p>
        {' '}
        Ngoài những trường hợp chỉ định cắt giáp toàn bộ bệnh nhân được chỉ định cắt một thùy và eo
        tuyến giáp.{' '}
      </p>

      <p>
        {' '}
        <i> Với hạch cổ: </i>{' '}
      </p>
      <ul className="ul-class">
        <li>
          {' '}
          • Chưa có di căn hạch: vét hạch cổ trung tâm dự phòng khi u kích thước lớn hoặc u xâm lấn
          cấu trúc lân cận.{' '}
        </li>
        <li> • Có di căn hạch cổ: vét nhóm hạch có bằng chứng di căn. </li>
      </ul>

      <p>
        {' '}
        <i> Với ung thư tuyến giáp thể tuỷ: </i>{' '}
      </p>
      <p> Cắt toàn bộ tuyến giáp cùng vét hạch cổ với nhóm hạch có bằng chứng di căn.</p>

      <p>
        {' '}
        <i> Với ung thư tuyến giáp thể không biệt hóa: </i>{' '}
      </p>
      <p>
        {' '}
        Chỉ định cắt giáp toàn bộ + vét hạch cổ triệt căn khi bệnh còn khả năng phẫu thuật. Tuy bệnh
        thường ở giai đoạn muộn và không còn khả năng phẫu thuật, nên thường chỉ phẫu thuật triệu
        chứng như mở khí quản hay mở thông dạ dày, sau đó hoá xạ trị.
      </p>

      <h2>
        {' '}
        B. Điều trị Iod phóng xạ (I<sup>131</sup> ){' '}
      </h2>
      <p>
        {' '}
        Điều trị Iod phóng xạ giúp giảm tỷ lệ tái phát ở nhóm bệnh nhân nguy cơ cao, chỉ định cho
        ung thư thể biệt hóa (nhú, nang) nguy cơ cao như đa ổ, u T3, T4, di căn hạch, di căn xa và
        có nồng độ Tg cao sau phẫu thuật cắt giáp toàn bộ. Trước khi điều trị I<sup>131</sup>, bệnh
        nhân bắt buộc phải được phẫu thuật cắt toàn bộ tuyến giáp.
      </p>
      <div className="hinh1-overview">
        <img src="/other_treatment/thyroid_hinh2.png"></img>
      </div>

      <h2> C. Điều trị nội tiết </h2>
      <p>
        {' '}
        Điều trị nội tiết bằng levothyroxin sau phẫu thuật để giảm nồng độ TSH (hormone kích thích
        các tế bào giáp lành cũng như tế bào ung thư), qua đó hạn chế sự phát triển của tế bào tuyến
        giáp.
      </p>

      <h2> D. Các biện pháp khác: </h2>
      <p>
        {' '}
        <i> Xạ trị chiếu ngoài: </i>{' '}
      </p>
      <p>
        {' '}
        Với ung thư tuyến giáp thể biệt hoá và thể tuỷ, chỉ định xạ trị là rất hạn chế và thường chỉ
        được chỉ định cho những trường hợp không có khả năng phẫu thuật, tại những vị trí tổn thương
        không cắt bỏ được bằng phẫu thuật.
      </p>
      <p>
        {' '}
        Trong ung thư tuyến giáp thể không biệt hoá, sau phẫu thuật bệnh nhân thường được xạ trị bổ
        trợ với mục đích kiểm soát được bệnh.
      </p>
      <p>
        {' '}
        <i> Điều trị hoá chất và điều trị đích: </i>{' '}
      </p>
      <p>
        {' '}
        Hóa trị được chỉ định trong trường hợp ung thư tuyến giáp thể không biệt hóa nhưng kết quả
        thường hạn chế. Điều trị đích với các thuốc ức chế TKI được dùng trong ung thư tuyến giáp
        thể biệt hoá đã kháng với I131 và ung thư tuyến giáp thể không biệt hoá.
      </p>
    </>
  );
};

export default ThyroidTreatment;
