import { Input } from 'antd';
import { useState } from 'react';

export default function SeachArticle({ Articles, setSearchData, setIsSearch, paginate }) {
  const [search, setSearch] = useState('');
  const searchArticle = () => {
    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      const ListArticles = Articles.filter((Article) => {
        return (
          (Article.Heading_title &&
            Article.Heading_title.toLowerCase().includes(search.toLowerCase())) ||
          (Article.Abstract && Article.Abstract.toLowerCase().includes(search.toLowerCase()))
        );
      });
      setSearchData(ListArticles);
    } else {
      setSearchData([]);
    }
    setIsSearch(true);
    paginate(1);
    setSearch('');
  };
  //   const handleKeyPress = (event) => {
  //     if (event.key === 'Enter') {
  //         searchArticle();
  //     }
  //   };

  return (
    <Input.Search
      placeholder="Tìm kiếm theo title/Abstract"
      onSearch={searchArticle}
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      // onKeyPress={handleKeyPress}//Enter thì thực hiện hàm handleKeyPress
      style={{ margin: '10px 0 10px 50px' }}
    />
  );
}
