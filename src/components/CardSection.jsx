import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Redux의 useDispatch 훅 가져오기
import { addToCart } from '../store/cartSlice'; // cartSlice에서 addToCart 액션 가져오기

export default function CardSection({ filteredCards }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeSpent, setTimeSpent] = useState(''); // 시간을 입력받기 위한 상태
  const [purpose, setPurpose] = useState('휴식하기'); // 목적을 입력받기 위한 상태
  const dispatch = useDispatch(); // Redux dispatch 사용

  // 모달 닫기
  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
    setTimeSpent(''); // 모달이 닫힐 때 입력된 값 초기화
    setPurpose('휴식하기');
  };

  // 모달 열기
  const openModal = card => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // 전송 버튼 클릭 시 카트에 데이터 추가
  const handleSend = () => {
    if (selectedCard && timeSpent) {
      // 카트에 추가할 데이터를 dispatch
      dispatch(
        addToCart({
          title: selectedCard.title,
          timeSpent: timeSpent,
          purpose: purpose,
        })
      );

      alert('카트에 추가되었습니다!');
      closeModal(); // 모달 닫기
    } else {
      alert('시간을 입력해주세요.');
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-1 gap-3 w-full mt-6">
        {filteredCards.map(card => (
          <div
            key={card.activityId}
            className="bg-white rounded-lg shadow-md p-4 flex cursor-pointer w-full"
            onClick={() => openModal(card)}
          >
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-xl font-bold mb-2">{card.activityName}</h2>
              <p className="text-gray-600">{card.purpose}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 창 */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // 배경을 클릭하면 모달 닫기
        >
          <div
            className={`bg-white rounded-lg p-6 w-3/4 max-w-lg transform transition-transform duration-300 ${
              isModalOpen ? 'scale-100' : 'scale-50'
            }`}
            onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
            <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
            <p className="text-gray-600 mb-4">{selectedCard.description}</p>

            {/* 시간 선택 옵션 */}
            <label className="block text-lg mb-2">몇 시간 하셨나요?</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="시간을 입력하세요"
              min="0"
              step="0.5" // 0.5 단위로 시간 입력 (30분 단위)
              value={timeSpent}
              onChange={e => setTimeSpent(e.target.value)}
            />

            {/* 행위 선택 옵션 */}
            <label className="block text-lg mb-2">어떤 목적이였나요?</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
            >
              <option>휴식하기</option>
              <option>공부하기</option>
            </select>

            {/* 닫기 및 전송 버튼 */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={closeModal}
              >
                닫기
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleSend}
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
