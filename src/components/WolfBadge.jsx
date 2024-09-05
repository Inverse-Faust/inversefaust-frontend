import { useState } from 'react';
import WolfIcon from '../Icons/WolfIcon';

export default function WolfBadge() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 목업 메시지
  const messages = [
    {
      id: 'black',
      sender: 'bot',
      text: '왜 밥이 안 나와? 내가 얼마나 기다렸는지 알아?!',
    },
    {
      id: 'white',
      sender: 'bot',
      text: '안녕하세요! 만나서 정말 기뻐요!',
    },
    { id: 'black', sender: 'bot', text: '배고파! 지금 당장 밥 줘!' },
    {
      id: 'white',
      sender: 'bot',
      text: '와! 여기 너무 좋아요! 놀고 싶어요!',
    },
  ];

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleToggleChat}
          className="p-3 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800"
        >
          <WolfIcon />
        </button>
      </div>

      {isChatOpen && (
        <div className="absolute bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          {/* 채팅 창 헤더 */}
          <div className="p-3 bg-gray-500 text-white rounded-t-lg">
            늑대들의 메세지
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map(message => (
              <div key={message.text} className="flex mb-2 items-center">
                {/* 프로필 뱃지 */}
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                  {/* id에 따라 글씨 색상 변경 */}
                  {message.id === 'black' ? (
                    <img
                      src="src/assets/blackwolfchat.png"
                      alt="Black Wolf"
                      className="w-8 h-8 object-cover"
                    />
                  ) : (
                    <img
                      src="src/assets/whitewolfchat.png"
                      alt="White Wolf"
                      className="w-8 h-8 object-cover"
                    />
                  )}
                </div>

                {/* 메시지 내용 */}
                <div
                  className={`p-2 rounded-lg flex-1 ${
                    message.sender === 'bot'
                      ? 'bg-gray-100'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {/* 메시지 텍스트 색상 변경 */}
                  <span
                    className={`${
                      message.id === 'black' ? 'text-red-500' : 'text-blue-500'
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 채팅 창 닫기 버튼 */}
          <div className="p-2 text-right">
            <button
              onClick={handleToggleChat}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
