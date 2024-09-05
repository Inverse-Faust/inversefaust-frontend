import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    // 1초마다 숫자를 증가시키되, 4초가 지나면 멈춤
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < 4) {
          return prevCount + 1;
        } else {
          clearInterval(interval); // 4가 되면 인터벌을 멈춤
          return prevCount;
        }
      });
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-60px)] relative">
      {/* 숫자가 사진 상단에 표시되도록 수정 */}
      <div className="absolute top-10 w-full flex justify-center items-center">
        {count <= 4 && <span className="text-white text-4xl">{count}</span>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* 흰 늑대 이미지 */}
        <div className="flex justify-center relative">
          <img
            src="src/assets/white_wolf.png"
            alt="White Wolf"
            className="w-64 h-64 object-cover"
          />
        </div>
        {/* 검은 늑대 이미지 */}
        <div className="flex justify-center relative">
          <img
            src="src/assets/black_wolf.png"
            alt="Black Wolf"
            className="w-64 h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
