import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CardSection from '../components/CardSection';
import CartIcon from '../Icons/CartIcon';
import Cart from '../components/Cart'; // Cart 컴포넌트 import
import { useLoaderData } from 'react-router-dom';

export default function ActivityPage() {
  const contractedData = useLoaderData(); // useLoaderData를 통해 mockData 로드
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // 모달 상태 추가

  // 검색어에 따라 카드 필터링
  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term !== '') {
      const filtered = Object.keys(contractedData).filter(activityName =>
        activityName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(Object.keys(contractedData));
    }
  };

  // 초기 상태로 mockData를 설정
  useEffect(() => {
    setFilteredCards(Object.keys(contractedData));
  }, [contractedData]);

  // 장바구니 모달을 토글하는 함수
  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-white overflow-hidden">
      {/* 상단 섹션: 검색바와 장바구니 아이콘 */}
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto p-4 space-x-4">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <CartIcon onClick={toggleCart} />
      </div>

      {/* 카드 섹션 */}
      <div className="flex-grow overflow-y-auto w-full max-w-3xl mx-auto px-4">
        <CardSection
          filteredCards={filteredCards}
          contractedData={contractedData}
        />
      </div>

      {/* 장바구니 모달 */}
      {isCartOpen && <Cart />}
    </div>
  );
}
