import { Input, Layout } from 'antd';
import { useState } from 'react';
const { Header } = Layout;

export default function SearchTherapie({ genes, setSearchData }) {
  const [search, setSearch] = useState('');
  const searchGen = () => {
    if (search.trim()) {
      setSearchData(
        genes.filter((gen) =>
          gen.therapies.some((therapie) => therapie.toLowerCase().includes(search.toLowerCase())),
        ),
        // some là chỉ để kiểm tra có hoặc không tức trả về true/ false
        // còn filer thì trả về mảng các phần tử thỏa mãn điều kiện nào đó
      );
    } else {
      setSearchData(null);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchGen();
    }
  };

  return (
    <Header className="site-layout-background" style={{ padding: 10 }}>
      <Input.Search
        placeholder="Genes therapies"
        onSearch={searchGen}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyPress={handleKeyPress} //Enter thì thực hiện hàm handleKeyPress
        style={{ margin: '10px 0' }}
      />
    </Header>
  );
}
