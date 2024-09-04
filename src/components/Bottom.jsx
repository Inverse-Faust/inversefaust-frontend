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
      label: 'Write',
      route: '/diarywrite',
      icon: <PencilIcon />,
    },
    {
      id: 3,
      label: 'Food',
      route: '/foodwrite',
      icon: <MeatIcon />,
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
    <div className="MaterialYouBottomNavigationBar w-full h-24 bg-zinc-600 flex-col justify-center items-center inline-flex fixed bottom-0">
      <div className="Tabs self-stretch h-full w-full flex justify-center items-center">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`grow shrink basis-0 self-stretch h-full flex-col justify-center items-center gap-1.5 inline-flex ${activeTab === tab.id ? 'bg-gray-500' : ''}`}
            onClick={() => handleClick(tab.id, tab.route)}
          >
            <div className="Icon w-full h-8 px-5 py-1 rounded-3xl justify-center items-center flex">
              {tab.icon}
            </div>
            <div className="Label self-stretch text-center text-stone-300 text-xs font-medium font-['Roboto'] leading-none tracking-wide">
              {tab.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
