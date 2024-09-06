import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function WolfBadge() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messages = useSelector(state => state.messages); // Redux에서 메시지 불러오기

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      <div className="absolute bottom-4 right-4">
        <img
          src="/assets/inversefaust.png"
          alt="Black Wolf"
          className="w-20 h-20 object-contain" // 크기를 32x32로 설정
          onClick={handleToggleChat}
        />
      </div>

      {isChatOpen && (
        <div className="absolute bottom-24 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          {/* 채팅 창 헤더 */}
          <div className="p-3 bg-gray-500 text-white rounded-t-lg">
            AI의 조언
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages &&
              messages.map((message, index) => (
                <div key={index} className="flex mb-2 items-center">
                  {/* 프로필 뱃지 */}
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                    {/* id에 따라 글씨 색상 변경 */}
                    <img
                      src="/assets/babywolf.png"
                      alt="Black Wolf"
                      className="w-8 h-8 object-cover" // 크기를 32x32로 설정
                    />
                  </div>

                  {/* 메시지 내용 */}
                  <div className="p-2 rounded-lg flex-1 bg-gray-100">
                    {/* 메시지 텍스트 */}
                    <span className="text-black">{message.text}</span>
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
