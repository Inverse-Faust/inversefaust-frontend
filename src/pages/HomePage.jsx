import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux'; // react-redux에서 useSelector를 가져옴

// HPBar 컴포넌트
function HPBar_White({ hp }) {
  const maxHp = 100; // 최대 HP 값 설정
  const hpPercentage = (hp / maxHp) * 100; // HP 퍼센트 계산

  // HP에 따라 색상 변경 (예: 50% 이하일 때 빨간색)
  const hpBarColor = hp > 20 ? 'bg-green-500' : 'bg-red-500';

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

function HPBar_Black({ hp }) {
  const maxHp = 100; // 최대 HP 값 설정
  const hpPercentage = (hp / maxHp) * 100; // HP 퍼센트 계산

  // HP에 따라 색상 변경 (예: 50% 이하일 때 빨간색)
  const hpBarColor = 20 < hp && hp < 80 ? 'bg-green-500' : 'bg-red-500';

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
      }, 4000);

      // 컴포넌트가 언마운트될 때 타이머를 정리
      return () => clearTimeout(timer);
    }
  }, [messages]); // 메시지가 변경될 때마다 실행

  const getWolfImage = (hp, type) => {
    if (hp > 80) {
      return type === 'white'
        ? 'https://inversefaust.s3.ap-northeast-2.amazonaws.com/white_wolf_happy.png'
        : 'https://inversefaust.s3.ap-northeast-2.amazonaws.com/black_wolf_happy.png';
    } else if (hp > 20) {
      return type === 'white'
        ? 'https://inversefaust.s3.ap-northeast-2.amazonaws.com/white_wolf.png'
        : 'https://inversefaust.s3.ap-northeast-2.amazonaws.com/black_wolf.png';
    } else {
      return type === 'white'
        ? 'https://inversefaust.s3.ap-northeast-2.amazonaws.com/white_wolf_sad.png'
        : 'https://inversefaust.s3.ap-northeast-2.amazonaws.com/black_wolf_mad.png';
    }
  };

  return (
    <div
      className="flex flex-col justify-end items-center h-full w-full bg-cover bg-center p-4 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://inversefaust.s3.ap-northeast-2.amazonaws.com/background.png')",
      }}
    >
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex-grow"></div>{' '}
        <img
          src={
            'https://inversefaust.s3.ap-northeast-2.amazonaws.com/faustlogo.png'
          }
          alt="faustlogo"
          className="w-full h-auto max-w-[150px] object-contain mb-8"
          style={{ transform: 'scale(1.2)' }}
        />
        <div className="flex-grow"></div>{' '}
        {/* This empty div pushes the content down */}
        {/* 방법 1: margin-bottom 사용 */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-3xl mt-auto mb-28">
          {/* 방법 2: flex-grow 사용 (이 방법을 사용할 경우 위의 div class에서 mb-8을 제거하고 아래 주석을 해제하세요) */}
          {/* <div className="grid grid-cols-2 gap-4 w-full max-w-3xl mt-auto"> */}
          {/* 흰 늑대 섹션 */}
          <div className="flex flex-col justify-end items-center">
            <img
              src={getWolfImage(whiteWolfHp, 'white')}
              alt="White Wolf"
              className="w-full h-auto max-w-[150px] object-contain mb-8"
              style={{ transform: 'scale(3.0)' }}
            />
            <HPBar_White hp={whiteWolfHp} />
          </div>
          {/* 검은 늑대 섹션 */}
          <div className="flex flex-col justify-end items-center">
            <img
              src={getWolfImage(blackWolfHp, 'black')}
              alt="Black Wolf"
              className="w-full h-auto max-w-[150px] object-contain mb-8"
              style={{ transform: 'scale(3.0)' }}
            />
            <HPBar_Black hp={blackWolfHp} />
          </div>
        </div>
        {/* 방법 2를 사용할 경우 아래 div를 추가하세요 */}
        {/* <div className="flex-grow-[0.5]"></div> */}
      </div>

      {/* 화면 중앙에 메시지 표시 */}
      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#737379] text-white p-4 rounded-lg shadow-lg text-center w-[80%] max-w-[400px] opacity-85">
          {visibleMessage}
        </div>
      )}
    </div>
  );
}
