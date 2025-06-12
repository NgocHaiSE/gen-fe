import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleFilled,
  PauseCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Link to={`/cosmic-gene/${text}`}>{text}</Link>,
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'aliases',
    dataIndex: 'aliases',
    key: 'aliases',
    render: (_, { aliases }) => (
      <>
        {aliases.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </>
    ),
  },
  {
    title: 'diseases',
    key: 'diseases',
    dataIndex: 'diseases',
    render: (_, { diseases }) => (
      <>
        {diseases.map((tag) => (
          <Tag color="pink" key={tag}>
            <CheckCircleTwoTone />
            <Link to="/">{tag}</Link>
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'therapies',
    key: 'therapies',
    dataIndex: 'therapies',
    render: (_, { therapies }) => (
      <>
        {therapies.map((tag) => (
          <Tag color="purple" key={tag}>
            <CloseCircleTwoTone />
            <Link to="/">{tag}</Link>
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: [<QuestionCircleFilled />, ' Count'],
    key: 'count1',
    dataIndex: 'count1',
    sorter: (a, b) => a.count1 - b.count1,
  },
  {
    title: [<PlusCircleFilled />, ' Count'],
    key: 'count2',
    dataIndex: 'count2',
    sorter: (a, b) => a.count2 - b.count2,
  },
  {
    title: [<PauseCircleFilled />, ' Count'],
    key: 'count3',
    dataIndex: 'count3',
    sorter: (a, b) => a.count3 - b.count3,
  },
  {
    title: [<MinusCircleFilled />, ' Count'],
    dataIndex: 'count4',
    key: 'count',
    sorter: (a, b) => a.count4 - b.count4,
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <Link to="/">delete</Link>,
  },
];
export default columns;
// .count {
//     text-align: center;
//   }
