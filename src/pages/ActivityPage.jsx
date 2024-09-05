import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CardSection from '../components/CardSection';
import CartIcon from '../Icons/CartIcon';

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  // 목업 데이터: 카드 섹션에 표시될 예시 데이터
  const mockData = [
    {
      id: 1,
      title: '유튜브 시청하기',
      description: 'A majestic white wolf in the forest.',
      imageUrl: 'src/assets/white_wolf.png',
    },
    {
      id: 2,
      title: '운동하기',
      description: 'A fierce black wolf in the wild.',
      imageUrl: 'src/assets/black_wolf.png',
    },
    {
      id: 3,
      title: '명상하기',
      description: 'A clever fox in the mountains.',
      imageUrl: 'src/assets/fox.png',
    },
    {
      id: 4,
      title: '야식',
      description: 'An eagle soaring through the sky.',
      imageUrl: 'src/assets/eagle.png',
    },
  ];

  // 검색어에 따라 카드 필터링
  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term !== '') {
      const filtered = mockData.filter(card =>
        card.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(mockData);
    }
  };

  // 초기 상태로 목업 데이터를 설정
  useEffect(() => {
    setFilteredCards(mockData);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-60px)] w-full">
      {/* flex container로 SearchBar와 CartIcon을 가로로 배치 */}
      <div className="flex items-center justify-between w-full max-w-lg mb-4">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="w-4" />
        <CartIcon />
      </div>
      <CardSection filteredCards={filteredCards} />
    </div>
  );
}
