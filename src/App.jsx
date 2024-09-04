import React from 'react';
import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 자식 라우트가 렌더링되는 위치 */}
      <div className="flex-grow bg-gray-600">
        <Outlet />
      </div>
      {/* 하단 네비게이션 바 */}
      <Bottom />
    </div>
  );
}

export default App;
