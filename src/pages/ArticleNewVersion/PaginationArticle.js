import { currentPage as crPage } from '@/shared/CurrentPage';
import { Pagination, Select } from 'antd';

import { useEffect, useState } from 'react';

import * as lung_article from './data/lung_article_.json';
import * as colorectal_article from './data/colorectal_article_.json';
import * as hepatocellular_article from './data/hepatocellular_article_.json';
import * as breast_article from './data/breast_article_.json';
import * as thyroid_article from './data/thyroid_article_.json';
import LungArticle from './LungArticle';
import SeachArticle from './search/SeachArticle';

const { Option } = Select;

function PaginationArticle() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('All');
  const [searchData, setSearchData] = useState([]);
  const [articleConverted, setArticleConverted] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  
  const pageSize = 5;
  const locationPage = crPage(location.pathname);

  let articleData;
  let articleDataDC;


  useEffect(() => {
    switch (locationPage) {
      case 'lungCancerPage':
        articleData = lung_article;
        break;
      case 'liverCancerPage':
        articleData = hepatocellular_article;
        break;
      case 'breastCancerPage':
        articleData = breast_article;
        break;
      case 'thyroidCancerPage':
        articleData = thyroid_article;
        break;
      case 'colorectalCancerPage':
        articleData = colorectal_article;
        break;
      default:
        articleData = null;
        break;
    }

    articleDataDC = articleData ? Object.values(articleData) : [];
    setArticleConverted(articleDataDC);
    setSearchData(articleDataDC);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);

    setIsSearch(false);

    setCurrentPage(1);
  };

  const handleSearchDataChange = (data) => {
    setSearchData(data);

    setIsSearch(true);

    setCurrentPage(1);
  };


  const filteredArticles = articleConverted ? articleConverted.filter((article) => {
        if (filterValue === 'All') {
          return true;
        }

        return article.Category === parseInt(filterValue, 10);
      })
      : [];

  const currentArticle = filteredArticles.slice(
    (currentPage - 1) * pageSize,

    currentPage * pageSize,
  );

  const totalItems = isSearch ? searchData.length : filteredArticles.length;

  const currentArticleSearch = isSearch
    ? searchData.slice(
        (currentPage - 1) * pageSize,

        currentPage * pageSize,
      )
    : null;

  return (
    <div>
      <div
        style={{
          display: 'flex',

          justifyContent: 'center',

          alignItems: 'center',

          marginBottom: '20px',
        }}
      >
        <div style={{ flex: 1 }}>
          <SeachArticle
            Articles={articleConverted}
            setSearchData={handleSearchDataChange}
            setIsSearch={setIsSearch}
            paginate={handlePageChange}
          />
        </div>

        <p
          style={{
            flex: 1,

            textAlign: 'center',

            position: 'fixed',

            top: '0',

            right: '0',
          }}
        >
          {totalItems}
        </p>

        <div
          style={{
            flex: 1,

            display: 'flex',

            justifyContent: 'center',

            alignItems: 'center',
          }}
        >
          <label style={{ marginRight: '10px', fontWeight: 'bold' }} htmlFor="filter">
            Filter by Category:
          </label>

          <Select
            id="filter"
            style={{ width: '200px' }}
            value={filterValue}
            onChange={handleFilterChange}
          >
            <Option value="All">All</Option>

            <Option value="1">Liên quan đến gen đột biến</Option>

            <Option value="0">Không liên quan đến gen đột biến</Option>
          </Select>
        </div>
      </div>

      {isSearch ? (
        <LungArticle article={currentArticleSearch} />
      ) : (
        <LungArticle article={currentArticle} />
      )}

      <div
        style={{
          display: 'flex',

          justifyContent: 'center',

          alignItems: 'center',
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PaginationArticle;
