import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookIcon from '../Icons/BookIcon';
import HomeIcon from '../Icons/HomeIcon';
import MeatIcon from '../Icons/MeatIcon';
import PencilIcon from '../Icons/PencilIcon';

export default function Bottom() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  // 각 탭의 정보를 배열로 정의
  const tabs = [
    {
      id: 1,
      label: 'Home',
      route: '/',
      icon: <HomeIcon />,
    },
    {
      id: 2,
      label: 'Activty',
      route: '/foodwrite',
      icon: <MeatIcon />,
    },
    {
      id: 3,
      label: 'Write',
      route: '/diarywrite',
      icon: <PencilIcon />,
    },
    {
      id: 4,
      label: 'My Diary',
      route: '/diarysee',
      icon: <BookIcon />,
    },
  ];

  const handleClick = (tabId, route) => {
    setActiveTab(tabId);
    navigate(route);
  };

  return (
    <div className="MaterialYouBottomNavigationBar w-full bg-zinc-600 flex justify-center items-center">
      <div className="Tabs w-full flex justify-center items-center max-w-4xl">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`grow shrink basis-0 h-16 flex flex-col justify-center items-center gap-1.5 ${
              activeTab === tab.id ? 'bg-gray-500' : ''
            }`}
            onClick={() => handleClick(tab.id, tab.route)}
          >
            <div className="Icon w-full h-8 px-5 py-1 rounded-3xl flex justify-center items-center">
              {tab.icon}
            </div>
            <div className="Label w-full text-center text-stone-300 text-xs font-medium leading-none tracking-wide">
              {tab.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
