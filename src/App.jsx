import React from 'react';
import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';
import WolfBadge from './components/WolfBadge';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 자식 라우트가 렌더링되는 위치 */}
      <div className="flex-grow flex flex-col justify-center items-center bg-black w-full">
        <div className="relative w-full bg-white">
          {/* Outlet을 통해 자식 컴포넌트 렌더링 */}
          <Outlet />
          <WolfBadge />
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
