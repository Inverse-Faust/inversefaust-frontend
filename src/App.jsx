import React from 'react';
import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';
import WolfBadge from './components/WolfBadge';

function App() {
  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      <div className="flex-grow flex flex-col w-full max-w-4xl mx-auto">
        <div className="relative w-full bg-white flex-grow overflow-hidden">
          <Outlet />
          <WolfBadge />
        </div>
        <div className="relative w-full bg-white">
          <Bottom />
        </div>
      </div>
    </div>
  );
}

export default App;
