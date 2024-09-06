import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux'; // react-redux에서 useSelector를 가져옴

// HPBar 컴포넌트
function HPBar({ hp }) {
  const maxHp = 100; // 최대 HP 값 설정
  const hpPercentage = (hp / maxHp) * 100; // HP 퍼센트 계산

  // HP에 따라 색상 변경 (예: 50% 이하일 때 빨간색)
  const hpBarColor = hp > 50 ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="relative w-full bg-gray-300 h-6 rounded-full overflow-hidden">
      {/* HP 바 */}
      <div
        className={`${hpBarColor} h-full`}
        style={{ width: `${hpPercentage}%` }}
      ></div>
    </div>
  );
}

export default function HomePage() {
  const data = useLoaderData();
  const whiteWolfHp = data.white;
  const blackWolfHp = data.black;

  const messages = useSelector(state => state.messages); // Redux에서 메시지를 가져옴
  const [visibleMessage, setVisibleMessage] = useState(null); // 표시할 메시지 상태
  const [showMessage, setShowMessage] = useState(false); // 메시지 표시 여부

  useEffect(() => {
    if (messages && messages.length > 0) {
      // 새 메시지가 있으면 이를 표시하고 5초 후에 숨김
      const latestMessage = messages[messages.length - 1]; // 가장 최근 메시지
      setVisibleMessage(latestMessage.text);
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false); // 5초 후 메시지 숨기기
      }, 5000);

      // 컴포넌트가 언마운트될 때 타이머를 정리
      return () => clearTimeout(timer);
    }
  }, [messages]); // 메시지가 변경될 때마다 실행

  const getWolfImage = (hp, type) => {
    if (hp > 50) {
      return type === 'white'
        ? '/src/assets/white_wolf_happy.png'
        : '/src/assets/black_wolf_happy.png';
    } else if (hp > 10) {
      return type === 'white'
        ? '/src/assets/white_wolf.png'
        : '/src/assets/black_wolf.png';
    } else {
      return type === 'white'
        ? '/src/assets/white_wolf_sad.png'
        : '/src/assets/black_wolf_mad.png';
    }
  };

  return (
    <div
      className="flex flex-col justify-end items-center p-4 min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/background.png')",
      }}
    >
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
          {/* 흰 늑대 섹션 */}
          <div className="flex flex-col justify-center items-center">
            <img
              src={getWolfImage(whiteWolfHp, 'white')}
              alt="White Wolf"
              className="w-full h-auto max-w-xs object-contain mb-2"
            />
            <HPBar hp={whiteWolfHp} />
          </div>
          {/* 검은 늑대 섹션 */}
          <div className="flex flex-col justify-center items-center">
            <img
              src={getWolfImage(blackWolfHp, 'black')}
              alt="Black Wolf"
              className="w-full h-auto max-w-xs object-contain mb-2"
            />
            <HPBar hp={blackWolfHp} />
          </div>
        </div>
      </div>

      {/* 화면 중앙에 메시지 표시 */}
      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-center">
          {visibleMessage}
        </div>
      )}
    </div>
  );
}
