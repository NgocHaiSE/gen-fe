import { useState } from 'react';
const LungArticle = ({ article }) => {
  let check = [];
  for (let i = 0; i < article.length; i++) {
    check[i] = false;
  }
  const [showAbstract, setShowAbstract] = useState(check);
  const [showAffiliation, setShowAffiliation] = useState(check);

  // ẩn hiện
  const toggleAbstract = (index) => {
    setShowAbstract((prev) => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };
  const toggleAffiliation = (index) => {
    setShowAffiliation((pre) => {
      const newArray = [...pre];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };
  return (
    <div>
      {article.map((lung, index) => (
        <div
          key={lung.Index2}
          style={{
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            marginRight: '50px',
            marginLeft: '50px',
          }}
        >
          <p style={{ fontWeight: 'bold', marginBottom: '5px', color: 'blue', fontSize: '18px' }}>
            {lung.Article_citation}
          </p>
          <p style={{ marginBottom: '5px', color: 'green', fontSize: '16px' }}>
            {lung.Heading_title}
          </p>
          <p style={{ marginBottom: '5px', color: 'red', fontSize: '14px' }}>{lung.Authors}</p>
          <p
            style={{
              marginBottom: '5px',
              color: 'brown',
              fontSize: '16px',
              marginRight: '20px',
              cursor: 'pointer',
              display: 'inline-block',
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f1f1f1',
              transition: 'background-color 0.3s',
            }}
            onClick={() => toggleAffiliation(index)}
          >
            Affiliation
          </p>
          {showAffiliation[index] && (
            <p style={{ marginBottom: '5px', color: 'orange', fontSize: '12px' }}>
              {lung.Affiliation}
            </p>
          )}
          <p style={{ marginBottom: '5px', color: 'purple', fontSize: '10px' }}>
            {lung.Identifiers}
          </p>
          <p
            style={{
              marginBottom: '5px',
              color: 'brown',
              fontSize: '16px',
              marginRight: '20px',
              cursor: 'pointer',
              display: 'inline-block',
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#f1f1f1',
              transition: 'background-color 0.3s',
            }}
            onClick={() => toggleAbstract(index)}
          >
            Abstract
          </p>
          {showAbstract[index] && (
            <p
              style={{ marginBottom: '5px', color: 'brown', fontSize: '16px', marginRight: '20px' }}
            >
              {lung.Abstract}
            </p>
          )}
          <p style={{ marginBottom: '5px', color: 'gray', fontSize: '12px' }}>
            {lung.Article_citation}
          </p>
          <p style={{ marginBottom: '5px', color: 'teal', fontSize: '16px' }}>{lung.Free_label}</p>
        </div>
      ))}
    </div>
  );
};

export default LungArticle;
