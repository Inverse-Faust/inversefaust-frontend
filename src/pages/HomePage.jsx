import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-end items-center p-4 min-h-[calc(100vh-60px)] w-full">
      {/* 늑대 이미지 */}
      <div className="flex justify-center items-center w-full">
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
