import { Form, Radio } from 'antd';
import { Divider } from 'rc-menu';

const items = [
  {
    label: 'Compare',
    name: 'compare',
    valuePropName: 'checked',
    options: [
      {
        name: 'Population',
        value: 'population',
      },
      {
        name: 'Cancer sites',
        value: 'cancer-sites',
      },
    ],
  },
  {
    label: 'Indicator',
    name: 'indicator',
    options: [
      {
        name: 'Inc.',
        value: 'inc',
      },
      {
        name: 'Mort',
        value: 'mort',
      },
      {
        name: 'Prev',
        value: 'prev',
      },
    ],
  },
  {
    label: 'Sex',
    name: 'sex',
    options: [
      {
        name: 'Both',
        value: 'both',
      },
      {
        name: 'Males',
        value: 'males',
      },
      {
        name: 'Females',
        value: 'Females',
      },
    ],
  },
  {
    label: 'Age groups',
    name: 'age-groups',
  },
  {
    label: 'Indicator',
    name: 'indicator',
    options: [
      {
        name: 'Number',
        value: 'number',
      },
      {
        name: 'ARS (Word)',
        value: 'ars',
      },
      {
        name: 'Crude rate',
        value: 'crude-rate',
      },
      {
        name: 'Cum.risk',
        value: 'cum-risk',
      },
    ],
  },
  {
    label: 'Population',
    name: 'population',
    children: [
      {
        name: 'Choose a population: ',
      },
    ],
  },
  {
    label: 'Group Colon, Rectum, Anus',
    value: 'Group-Colon-Rectum-Anus',
  },
  {
    label: 'Include NMSC',
  },
  {
    label: 'Include NMSC in other cancers',
  },
  {
    label: 'More options',
  },
];
const SliderComponents = () => {
  return (
    <Form>
      <Form.Item label="Compare" name="compare" valuePropName="checked">
        <Radio.Group>
          <Radio value="population">Population</Radio>
          <Radio value="cancer_sites">Cancer sites</Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      <Form.Item></Form.Item>
    </Form>
  );
};

export default SliderComponents;
