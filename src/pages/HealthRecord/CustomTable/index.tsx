import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import CustomInput from '../CustomInput';

export default ({ record, isAddRow = true }) => {
  if (!record) return;
  const [rows, addRow] = useState(record.body?.length);
  const handleAddRow = () => {
    const newRow = record.body[0].map((item, index) => {
      return { ...item, answer: '' };
    });
    record.body.push(newRow);
    addRow(rows + 1);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            {record?.header?.map((title, titleId) => (
              <th key={titleId}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {record?.body?.map((res, resId) => {
            return (
              <tr key={resId}>
                {res.map((ques, quesId) => {
                  return (
                    <td key={quesId}>
                      <CustomInput quesId={quesId} ques={ques} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isAddRow && (
        <Button icon={<PlusOutlined />} className="mt-4" onClick={handleAddRow}>
          Thêm hàng
        </Button>
      )}{' '}
    </>
  );
};
