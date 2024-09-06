import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CardSection from '../components/CardSection';
import CartIcon from '../Icons/CartIcon';
import Cart from '../components/Cart'; // Cart 컴포넌트 import
import { useLoaderData } from 'react-router-dom';

export default function ActivityPage() {
  const mockData = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // 모달 상태 추가

  // 목업 데이터

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

  // 장바구니 모달을 토글하는 함수
  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-60px)] w-full">
      {/* flex container로 SearchBar와 CartIcon을 가로로 배치 */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-4 bg-red space-x-4">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <CartIcon onClick={toggleCart} />
        {/* 클릭 시 모달 토글 */}
      </div>
      <CardSection filteredCards={filteredCards} />

      {/* 장바구니 모달 조건부 렌더링 */}
      {isCartOpen && <Cart />}
    </div>
  );
}
