import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { geneMutationArticlesEp } from '../EndPoint';

const articles = () => {
  const [dataArticles, setDataArticles] = useState<
    Array<{
      gene: String;
      cancerType: String;
      level: String;
      alteration: String;
      drug: String;
      key: String;
      title: String;
      journal: String;
      pubDate: String;
      volume: String;
      issue: String;
      authors: String;
      elocationId: String;
      reference: String;
      link: String;
      abstract: String;
      page: Number;
    }>
  >([]);

  const currentLocation = location.pathname;
  const id = currentLocation.replace('/mutation/', '');

  const fetchDataArticles = async (id: any) => {
    const response = await fetch(`${geneMutationArticlesEp}/${id}`);
    const data = await response.json();
    const articles = data.mutationEffectPmids.map((article: any) => {
      return {};
    });
    setDataArticles(articles);
  };

  useEffect(() => {
    fetchDataArticles(id).catch((error) => console.error(error));
  }, []);

  console.log(dataArticles);

  const columns: ProColumns[] = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Tạp chí',
      dataIndex: 'journal',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Ngày xuất bản',
      dataIndex: 'pubDate',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Số',
      dataIndex: 'issue',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Trang',
      dataIndex: 'pages',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Tác giả',
      dataIndex: 'authors',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Tham chiếu',
      dataIndex: 'reference',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      hideInSearch: true,
      align: 'center',
      render: (text, dataArticles) =>
        dataArticles.link ? (
          <a
            href={dataArticles.link.toString()}
            style={{ textDecoration: 'underline' }}
            target="_blank"
          >
            Xem
          </a>
        ) : (
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${dataArticles.key}`}
            style={{ textDecoration: 'underline' }}
            target="_blank"
          >
            Xem
          </a>
        ),
    },
    {
      title: 'Tóm tắt',
      dataIndex: 'abstract',
      hideInSearch: true,
      align: 'center',
    },
  ];

  return (
    <>
      <Descriptions title="Thông tin cơ bản">
        <Descriptions.Item label="Gene">{dataArticles[0]?.gene}</Descriptions.Item>
        <Descriptions.Item label="Đột biến">{dataArticles[0]?.alteration}</Descriptions.Item>
        <Descriptions.Item label="Oncogenic">{dataArticles[0]?.cancerType}</Descriptions.Item>
        <Descriptions.Item label="Mutation Effect">{dataArticles[0]?.drug}</Descriptions.Item>
      </Descriptions>

      <ProTable
        columns={columns}
        dataSource={dataArticles}
        toolbar={{
          title: 'CÁC BÀI BÁO LIÊN QUAN',
          settings: [],
        }}
        rowKey="key"
        search={false}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default articles;
