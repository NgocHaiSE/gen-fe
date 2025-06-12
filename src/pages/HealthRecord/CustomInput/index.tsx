import { useModel } from '@umijs/max';
import React, { useState } from 'react';
import { Checkbox, Input, Radio, Select, Space } from 'antd';
import CustomTable from '../CustomTable';
import './customInput.css';
export default ({ ques }) => {
  const { isView } = useModel('viewPage');
  const [selectedValue, setSelectedValue] = useState(ques.answer);
  const handleOnChangeCheckbox = (choiceId, checked) => {
    console.log(ques);

    ques.answer[choiceId] = checked;
  };
  const handleOnChangeText = (value, otherValue = false) => {
    console.log(ques);

    if (otherValue) {
      ques.otherValue = value;
    } else ques.answer = value;
  };
  const handleOnChangeRadio = (value) => {
    ques.answer = value;
  };
  if (ques.type === 'checkbox') {
    return (
      <>
        {ques?.listChoice?.map((choice, choiceId) => {
          if (choice.includes('Khác (ghi rõ):'))
            return (
              <div key={choiceId} className="sub-cell">
                <Checkbox
                  className={isView ? 'is-disabled' : ''}
                  disabled={isView}
                  defaultChecked={ques.answer[choiceId]}
                  onChange={(e) => {
                    handleOnChangeCheckbox(choiceId, e.target.checked);
                  }}
                >
                  {choice}
                </Checkbox>{' '}
                <Input.TextArea
                  disabled={isView}
                  autoSize={true}
                  defaultValue={ques?.otherValue}
                  onChange={(e) => handleOnChangeText(e.target.value, true)}
                />
              </div>
            );
          return (
            <div style={{ height: '48px' }} className="sub-cell" key={choiceId}>
              <Checkbox
                disabled={isView}
                defaultChecked={ques.answer[choiceId]}
                onChange={(e) => {
                  handleOnChangeCheckbox(choiceId, e.target.checked);
                }}
              >
                {choice}
              </Checkbox>
            </div>
          );
        })}
      </>
    );
  }
  if (ques.type === 'text') {
    return (
      <>
        <Input
          disabled={isView}
          defaultValue={ques?.answer}
          className="input"
          onChange={(e) => {
            handleOnChangeText(e.target.value);
          }}
          suffix={ques?.unit}
          prefix={ques?.prefix}
        ></Input>
      </>
    );
  }
  if (ques.type === 'number') {
    return (
      <>
        <Input
          disabled={isView}
          className="input"
          onChange={(e) => {
            handleOnChangeText(e.target.value);
          }}
          suffix={ques?.unit}
          prefix={ques?.prefix}
          type="number"
        ></Input>
      </>
    );
  }
  if (ques.type === 'textarea') {
    return (
      <>
        <Input.TextArea
          disabled={isView}
          style={{ width: '100%' }}
          onChange={(e) => {
            handleOnChangeText(e.target.value);
          }}
          prefix={ques?.prefix}
        ></Input.TextArea>
      </>
    );
  }
  if (ques.type === 'none') {
    return (
      <div style={{ height: '48px' }} className="sub-cell">
        {ques.question}
      </div>
    );
  }
  if (ques.type === 'title') {
    return <div>{ques.question}</div>;
  }
  if (ques.type === 'radio') {
    return (
      <Radio.Group
        disabled={isView}
        onChange={(e) => {
          handleOnChangeRadio(e.target.value);
        }}
        defaultValue={ques?.answer}
      >
        <Space direction={ques?.horizontal ? 'horizontal' : 'vertical'}>
          {ques?.listChoice?.map((choice, choiceId) => {
            if (choice.includes('Khác (ghi rõ):'))
              return (
                <div key={choiceId} className="sub-cell">
                  <Radio value={choice} key={choiceId} className="full-width">
                    {choice}
                  </Radio>{' '}
                  <Input.TextArea
                    disabled={isView}
                    autoSize={true}
                    defaultValue={ques?.otherValue}
                    onChange={(e) => handleOnChangeText(e.target.value, true)}
                  />
                </div>
              );
            return (
              <Radio value={choice} key={choiceId}>
                {choice}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    );
  }
  if (ques.type === 'date') {
    return (
      <Input
        disabled={isView}
        type="date"
        onChange={(e) => {
          handleOnChangeText(e.target.value);
        }}
        suffix={ques?.unit}
        prefix={ques?.prefix}
      ></Input>
    );
  }
  if (ques.type === 'select') {
    return (
      <Select
        disabled={isView}
        style={{ width: '100%' }}
        options={ques.listChoice.map((choice) => ({ label: choice, value: choice }))}
        value={ques?.answer}
        onChange={(e) => {
          handleOnChangeText(e);
          setSelectedValue(e);
        }}
      />
    );
  }
  // if (ques.type === 'select') {
  //   return (
  //     <>
  //       <input
  //         list={ques?.key}
  //         disabled={isView}
  //         style={{ width: '100%' }}
  //         value={ques?.answer}
  //         onChange={(e) => {
  //           handleOnChangeText(e.target.value);
  //         }}
  //       />
  //       <datalist id={ques?.key}>
  //         {ques.listChoice.map((choice) => (
  //           <option key={choice} value={choice} />
  //         ))}
  //       </datalist>
  //     </>
  //   );
  // }
  if (ques.type === 'table') {
    return <CustomTable record={ques} />;
  }
};
