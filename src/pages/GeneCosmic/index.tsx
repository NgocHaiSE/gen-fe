import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleFilled,
  PauseCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { Button, Modal, Table, Tag } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchAliase from './search/SearchAliase';
import SearchDisease from './search/SearchDisease';
import SearchName from './search/SearchName';
import SearchTherapie from './search/SearchTherapie';

export default function NewTable() {
  const [searchData, setSearchData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const genData = [
    {
      id: 1,
      name: 'ALK',
      aliases: ['ALK', 'ALK1', 'CD246', 'NBLST3'],
      diseases: ['Lung', 'Non-small', 'Cell', 'Carcinoma'],
      therapies: ['Crizotinib'],
      count1: 66,
      count2: 59,
      count3: 231,
      count4: 2,
    },
    {
      id: 2,
      name: 'AKT1',
      aliases: ['ALK', 'ALK1', 'PKB', 'PRKBA', 'RAC'],
      diseases: [' Melanoma'],
      therapies: ['Capivasertib'],
      count1: 8,
      count2: 8,
      count3: 15,
      count4: 0,
    },
    {
      id: 3,
      name: 'ARAF',
      aliases: ['A-RAF', 'ARAF', 'PFS2', 'RAFA1'],
      diseases: ['Lung', 'Non-small', 'Cell', 'Carcinoma'],
      therapies: ['Crizotinib'],
      count1: 66,
      count2: 59,
      count3: 231,
      count4: 2,
    },
  ];

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
      render: () => (
        <>
          <Button type="primary" onClick={showModal}>
            EDIT
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>name</p>
          </Modal>

          <Button type="primary" onClick={showModal}>
            DELETE
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <div style={{ display: 'flex', width: '100%', backgroundColor: '#001529' }}>
        <div>
          <SearchName genes={genData} setSearchData={setSearchData} />
        </div>
        <div>
          <SearchAliase genes={genData} setSearchData={setSearchData} />
        </div>
        <div>
          <SearchDisease genes={genData} setSearchData={setSearchData} />
        </div>
        <div>
          <SearchTherapie genes={genData} setSearchData={setSearchData} />
        </div>
      </div>

      <Table columns={columns} dataSource={searchData || genData} />
    </div>
  );
}
