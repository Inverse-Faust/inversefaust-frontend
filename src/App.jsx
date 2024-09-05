import React from 'react';
import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 자식 라우트가 렌더링되는 위치 */}
      <div className="flex-grow flex flex-col justify-center items-center bg-black w-full">
        <div className="w-full bg-gray-700">
          <Outlet />
        </div>
      </div>
      {/* 하단 네비게이션 바 */}
      <div className="w-full">
        <Bottom />
      </div>
    </div>
  );
}

export default App;
