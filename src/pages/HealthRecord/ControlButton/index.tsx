import { SaveOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { FloatButton, message, Tooltip } from 'antd';

export default ({ handleSubmit, link }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <Tooltip title={'Save'} color="#1890ff">
      <FloatButton
        type="primary"
        shape="square"
        icon={<SaveOutlined />}
        onClick={async () => {
          try {
            await handleSubmit();
            navigate(`/${link.replace('record', 'cancer')}/health-record`);
          } catch (err) {
            messageApi.open({
              type: 'error',
              content: 'Hãy thử lại',
            });
          }
        }}
      ></FloatButton>
    </Tooltip>
  );
};
