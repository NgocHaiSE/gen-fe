import { Button, Form, Input, Rate } from 'antd';
import { useState } from 'react';

function ListArticles() {
  const [article, setArticle] = useState('Tự động hóa và tương lai của lao động');
  const [isShow, setIsShow] = useState(true);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [value, setValue] = useState(3);

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newComment = { name, comment };
    setComments([...comments, newComment]);
    setName('');
    setComment('');
    console.log(newComment);
  };
  const showMore = () => {
    if (isShow) {
      setArticle(
        'Trong thời đại công nghệ 4.0, việc tự động hóa các quy trình sản xuất và kinh doanh đã trở nên phổ biến hơn bao giờ hết. Từ robot hàn, máy in 3D cho đến trí tuệ nhân tạo (AI), những công nghệ này đã giúp các doanh nghiệp tăng năng suất, giảm chi phí và cải thiện chất lượng sản phẩm. Tuy nhiên, với sự phát triển của tự động hóa, cũng đặt ra câu hỏi về tương lai của lao động.Theo một số nghiên cứu, dự kiến rằng trong tương lai, có đến 800 triệu việc làm trên toàn cầu sẽ bị thay thế bởi các công nghệ tự động hóa. Các ngành nghề như sản xuất, bán lẻ, dịch vụ khách hàng và thậm chí cả lĩnh vực y tế đang trở thành mục tiêu của sự tự động hóa. Vì vậy, có nhiều lo ngại rằng việc tự động hóa sẽ dẫn đến mất việc làm hàng loạt và tăng lên tình trạng thất nghiệp.Tuy nhiên, không phải ai cũng đồng ý với quan điểm này. Các nhà lãnh đạo và chuyên gia về công nghệ cho rằng, việc tự động hóa sẽ tạo ra các việc làm mới và nâng cao kỹ năng cho nhân viên. Các công nghệ mới sẽ tạo ra những công việc mới như quản lý hệ thống tự động, thiết kế, lắp ráp và sửa chữa các thiết bị tự động hóa. Ngoài ra, nhân viên sẽ được đào tạo để làm việc với các công nghệ mới, từ đó giúp tăng năng suất và hiệu quả cho doanh nghiệp.Tuy nhiên, để tận dụng được tiềm năng của công nghệ tự động hóa, các doanh nghiệp cần phải có chiến lược và kế hoạch phù hợp. Các doanh nghiệp cần tập trung vào việc đào tạo và phát triển kỹ năng cho nhân viên, đồng thời tạo ra các công việc mới phù',
      );
    } else {
      setArticle('Tự động hóa và tương lai của lao động');
    }
    setIsShow(!isShow);
  };
  return (
    <div>
      <h2>Bài báo</h2>
      <p>{article}</p>
      <Button type="primary" onClick={showMore}>
        {isShow && <div>xem thêm</div>}
        {!isShow && <div>ẩn bớt</div>}
      </Button>
      <br />
      <br />
      <br />
      <span>
        <Rate tooltips={desc} onChange={setValue} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
      <br />
      <br />

      <Form onSubmitCapture={handleSubmit}>
        <Form.Item label="Tên" htmlFor="name">
          <Input type="text" id="name" value={name} onChange={handleNameChange} required />
        </Form.Item>
        <Form.Item label="Bình luận" htmlFor="comment">
          <Input.TextArea id="comment" value={comment} onChange={handleCommentChange} required />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} htmlType="submit">
          Gửi bình luận
        </Button>
      </Form>
      <div>
        {comments.map((comment, index) => (
          <div key={index} style={{ backgroundColor: '#eee', padding: '10px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{comment.name}:</p>
            <p style={{ paddingLeft: '20px' }}>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListArticles;
