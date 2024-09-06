import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

export default function WolfBadge() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messages = useSelector(state => state.messages);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="absolute bottom-4 right-4">
        <img
          src="https://inversefaust.s3.ap-northeast-2.amazonaws.com/inversefaust.png"
          alt="Black Wolf"
          className="w-20 h-20 object-contain"
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
                    <img
                      src="https://inversefaust.s3.ap-northeast-2.amazonaws.com/babywolf.png"
                      alt="Black Wolf"
                      className="w-8 h-8 object-cover"
                    />
                  </div>

                  {/* 메시지 내용 */}
                  <div className="p-2 rounded-lg flex-1 bg-gray-100">
                    <span className="text-black">{message.text}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
