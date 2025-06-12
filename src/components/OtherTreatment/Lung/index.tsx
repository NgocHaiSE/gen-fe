import '../style-other-treatment.css';

const LungTreatment = () => {
  return (
    <>
      <h1>UNG THƯ PHỔI</h1>
      <p>
        Điều trị ung thư phổi không tế bào nhỏ là điều trị đa mô thức. Các phương pháp điều trị với
        ung thư phổi không tế bào nhỏ phổ biến hiện nay gồm có: Phẫu thuật, hóa trị, xạ trị, điều
        trị nhắm trúng đích phân tử, điều trị liệu pháp miễn dịch. Việc điều trị căn cứ nhiều nhất
        vào giai đoạn của bệnh.
      </p>
      <div className="hinh1-overview">
        <img src="/other_treatment/lung_hinh1.png"></img>
        <p> Hình 1. Các phương pháp cắt phổi ở giai đoạn sớm </p>
      </div>
      <h2> Giai đoạn I, II, IIIA </h2>
      <ul className="ul-class">
        <li>
          {' '}
          + Phẫu thuật là phương pháp được lựa chọn hàng đầu. Phẫu thuật cắt thùy phổi + vét hạch là
          phương pháp phổ biến nhất hiện nay. Sau phẫu thuật tùy vào diện cắt và tình trạng di căn
          hạch trung thất mà có các chỉ định điều trị bổ trợ phía sau
        </li>
        <li>+ Giai đoạn IIIA không có khả năng phẫu thuật: điều trị hóa xạ trị đồng thời.</li>
      </ul>

      <h2>Giai đoạn IIIB-IV</h2>
      <p>
        {' '}
        Điều trị hóa xạ trị đồng thời đối với giai đoạn IIIB hoặc điều trị toàn thân như giai đoạn
        IV. Giai đoạn này không còn khả năng điều trị triệt căn. Mục tiêu của điều trị đối với bệnh
        nhân giai đoạn này là kéo dài thời gian sống và duy trì chất lượng cuộc sống càng lâu càng
        tốt, đồng thời giảm thiểu các tác dụng phụ do quá trình điều trị. Các yếu tố chính ảnh hưởng
        đến lựa chọn điều trị giai đoạn này là thể trạng bệnh nhân (PS), số lượng các vị trí di căn,
        mô bệnh học vảy hay không vảy, tình trạng đột biến gen: EGFR, ALK, ROS1, BRAF V600E... và
        tình trạng bộc lộ PD-L1.
      </p>

      <p> Đối với mỗi loại đột biến gen sẽ có các thuốc điều trị đích tương ứng với từng loại: </p>
      <ul className="ul-class">
        <li>
          {' '}
          - Đột biến gen EGFR (+): điều trị thuốc TKIs như Erlotinib, Gefitinib, Afatinib,
          Osimertinib.
        </li>
        <li> - Đột biến ALK (+): điều trị thuốc Crizotinib, Ceritinib, Brigatinib, Alectinib.</li>
        <li> - Đột biến ROS1 (+): điều trị thuốc Crizotinib, Ceritinib. </li>
        <li> - BRAF V600E: điều trị Dabrafenib + Trametinib. </li>
        <li>
          {' '}
          - PD-L1 (+): có thế điều trị các thuốc miễn dịch hoặc kết hợp hóa trị liệu và miễn dịch{' '}
        </li>
        <li> - Hóa trị liệu </li>
      </ul>
    </>
  );
};

export default LungTreatment;
