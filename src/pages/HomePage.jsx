import React, { useState, useEffect } from 'react';

// 전역 변수로 count 값을 관리
var initCount = 1;

export default function HomePage() {
  const [count, setCount] = useState(initCount);

  // 키 값에 맞는 텍스트를 저장하는 객체
  const texts = {
    1: '당신안에서는 늑대 두마리가 싸우고 있습니다',
    2: '검은 늑대는, 당신의 화,시기,질투,후회,오만, 죄책감이자',
    3: '당신의 자아입니다',
    4: '흰 늑대는, 기쁨, 평화, 사랑, 희망, 평온함, 진실, 연민이며',
    5: '당신의 믿음입니다',
    6: '흰 늑대가 검은 늑대를 무찌르길 바라겠지만',
    7: '당신은 검은 늑대에게도 먹이를 주어야 해요',
    8: '그렇지 않으면 당신은 망가질 겁니다',
    9: '당신의 늑대를 관리하기 위한',
    10: 'Inverse Faust',
  };

  useEffect(() => {
    if (initCount >= 10) {
      return;
    }

    const interval = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + 1;
        initCount = newCount;
        return newCount;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="flex flex-col justify-between items-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 bg-white">
      {/* 텍스트 */}
      {initCount === 10 && (
        <img
          src="src/assets/inversefaust.png"
          alt="inversefaust"
          className="w-full h-auto max-w-xs object-contain"
        />
      )}
      <div className={`w-full text-center ${initCount >= 10 ? '' : 'mt-40'}`}>
        <span
          className="text-white text-xl md:text-2xl lg:text-3xl font-bold 
                       bg-black bg-opacity-50 px-4 py-2 rounded"
        >
          {texts[count]}
        </span>
      </div>

      {/* 늑대 이미지 */}
      <div className="flex justify-center items-center w-full mb-8">
        <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
          {/* 흰 늑대 이미지 */}
          <div className="flex justify-center items-center">
            <img
              src="src/assets/white_wolf.png"
              alt="White Wolf"
              className="w-full h-auto max-w-xs object-contain"
            />
          </div>
          {/* 검은 늑대 이미지 */}
          <div className="flex justify-center items-center">
            <img
              src="src/assets/black_wolf.png"
              alt="Black Wolf"
              className="w-full h-auto max-w-xs object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
