import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

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
      {/* HP 텍스트 (바 안에 숫자로 명확하게 표시) */}
      {/* <span className="absolute inset-0 flex justify-center items-center text-white font-bold">
        {hp} / 100
      </span> */}
    </div>
  );
}

export default function HomePage() {
  const data = useLoaderData();
  const whiteWolfHp = data.white;
  const blackWolfHp = data.black;

  const getWolfImage = (hp, type) => {
    if (hp > 50) {
      return type === 'white'
        ? 'src/assets/white_wolf_happy.png'
        : 'src/assets/black_wolf_happy.png';
    } else if (hp > 10) {
      return type === 'white'
        ? 'src/assets/white_wolf.png'
        : 'src/assets/black_wolf.png';
    } else {
      return type === 'white'
        ? 'src/assets/white_wolf_sad.png'
        : 'src/assets/black_wolf_mad.png';
    }
  };

  return (
    <div
      className="flex flex-col justify-end items-center p-4 min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/background.png')",
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
    </div>
  );
}
