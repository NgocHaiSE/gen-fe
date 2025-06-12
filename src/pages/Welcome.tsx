import { useAccess, useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * For each individual card, components are extracted for reusable styles
 * @param param0
 * @returns
 */

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        Tìm hiểu thêm {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const access = useAccess();
  return (
    <Card
      style={{
        borderRadius: 8,
      }}
      bodyStyle={{
        backgroundImage:
          initialState?.settings?.navTheme === 'realDark'
            ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
            : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
      }}
    >
      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
        }}
      >
        <div
          style={{
            fontSize: '30px',
            color: token.colorTextHeading,
          }}
        >
          CÔNG CỤ HỖ TRỢ CHẨN ĐOÁN VÀ ĐIỀU TRỊ UNG THƯ
        </div>
        <p
          style={{
            fontSize: '14px',
            color: token.colorTextSecondary,
            lineHeight: '22px',
            marginTop: 16,
            marginBottom: 32,
            width: '100%',
          }}
        >
          - Công nghệ y tế tiên tiến đã mang lại những đột phá trong chẩn đoán và điều trị ung thư.
          Trong số đó, phần mềm phát hiện đột biến gen đang thu hút sự quan tâm đặc biệt của các bác
          sĩ lâm sàng tại Việt Nam. Sử dụng công nghệ giải trình tự thế hệ tiếp theo
          (Next-Generation Sequencing - NGS), phần mềm này cung cấp một công cụ mạnh mẽ cho việc
          chẩn đoán và lựa chọn phương pháp điều trị cá nhân hóa cho bệnh nhân ung thư.
          <br />
          - Phần mềm phát hiện đột biến gen dựa trên dữ liệu giải trình tự gen thế hệ mới (NGS), cho
          phép bác sĩ xác định và phân tích các gen đích một cách chính xác và chi tiết. Thông qua
          việc phân tích đột biến gen trong khối u, phần mềm cung cấp thông tin quan trọng về cơ chế
          phân tử của bệnh ung thư và tiên lượng khả năng đáp ứng điều trị.
          <br />
          - Với khả năng xác định đúng đột biến gen liên quan đến bệnh ung thư và tìm ra phương pháp
          điều trị phù hợp, phần mềm giúp các bác sĩ lâm sàng chẩn đoán và dự đoán đáp ứng điều trị
          tốt hơn. Bằng cách phân tích đặc điểm gen của khối u, phần mềm có thể xác định chính xác
          thuốc điều trị đích hoạt động hiệu quả và phù hợp. Điều này giúp tăng cường khả năng lựa
          chọn phương pháp điều trị cá nhân hóa và giảm nguy cơ sử dụng những loại thuốc kém hiệu
          quả hoặc có tác dụng phụ đối với từng bệnh nhân.
          <br />- Sử dụng phần mềm phát hiện đột biến gen cũng mang lại lợi ích đáng kể trong cải
          thiện chăm sóc cho bệnh nhân ung thư. Bác sĩ lâm sàng có thể tinh chỉnh và điều chỉnh kế
          hoạch điều trị dựa trên thông tin chính xác về đáp ứng của khối u với từng phương pháp
          điều trị. Đồng thời, theo dõi sự tiến triển và hiệu quả của các phương pháp điều trị theo
          thời gian. Điều này giúp tối ưu hóa quá trình điều trị, cải thiện chất lượng cuộc sống và
          cơ hội phục hồi cho bệnh nhân ung thư.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <InfoCard
            index={1}
            href="/drug"
            title="Tìm kiếm"
            desc="Phần mềm tìm kiếm được xây dựng để cung cấp thông tin chi tiết về thuốc, gen và đột biến liên quan đến 5 loại ung thư phổ biến ở Việt Nam. Dữ liệu này được thu thập từ các nguồn uy tín trên toàn cầu, giúp các bác sĩ tra cứu và tìm hiểu về các phương pháp điều trị và yếu tố di truyền của ung thư một cách dễ dàng. Phần mềm cung cấp thông tin chính xác và đáng tin cậy, hỗ trợ bác sĩ trong việc tìm kiếm thông tin quan trọng để đưa ra quyết định điều trị."
          />
          <InfoCard
            index={2}
            title="Lưu trữ"
            href=""
            desc="Phần mềm có hệ thống lưu trữ kết quả xét nghiệm bệnh nhân chi tiết, đầy đủ và được mã hoá an toàn. Hệ thống này đảm bảo tính bảo mật cao và chỉ cho phép những người được ủy quyền truy cập vào dữ liệu. Kết quả xét nghiệm được lưu trữ một cách an toàn và không thể bị thay đổi hay truy cập trái phép. Hệ thống lưu trữ đảm bảo sự bảo mật và tin cậy của thông tin y tế, góp phần quan trọng vào quyền riêng tư và các quá trình chẩn đoán, điều trị và nghiên cứu ung thư."
          />
          <InfoCard
            index={3}
            title="Trình bày"
            href=""
            desc="Kết quả xét nghiệm được hiển thị dưới dạng bảng đầy đủ và rõ ràng, giúp bác sĩ dễ dàng đọc và hiểu thông tin. Bảng hiển thị này được tổ chức một cách logic, giúp định rõ trạng thái di truyền và đáp ứng điều trị của bệnh nhân. Bằng cách cung cấp một cái nhìn tổng quan về các thông số quan trọng liên quan đến gen và đột biến, phần mềm giúp tăng cường khả năng giao tiếp và truyền đạt thông tin giữa các chuyên gia y tế và bệnh nhân."
          />
          <InfoCard
            index={4}
            title="Hỗ trợ điều trị"
            href=""
            desc="Phần mềm hỗ trợ của chúng tôi giúp các bác sĩ lâm sàng tạo đơn thuốc phù hợp với dữ liệu đã được kiểm chứng. Nó sử dụng công nghệ phát hiện đột biến gen liên quan đến sự đáp ứng của thuốc điều trị, đóng vai trò quan trọng trong việc hỗ trợ các bác sĩ. Với dữ liệu được cập nhật từ các nguồn uy tín trên toàn cầu, phần mềm cung cấp các công cụ tra cứu thông tin thuốc, tác dụng phụ, tương tác và liều lượng khuyến nghị dựa trên thông tin gen và đáp ứng của bệnh nhân. Điều này giúp bác sĩ đưa ra quyết định tối ưu về thuốc, liều lượng và phương pháp điều trị cho từng bệnh nhân. Phần mềm đóng vai trò quan trọng trong đảm bảo tính chính xác và hiệu quả của quyết định điều trị, giúp tăng khả năng đạt được kết quả tốt trong điều trị ung thư."
          />
        </div>
      </div>
    </Card>
  );
};

export default Welcome;
