import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Redux의 useDispatch 훅 가져오기
import { addToCart } from '../store/cartSlice'; // cartSlice에서 addToCart 액션 가져오기

export default function CardSection({ filteredCards, contractedData }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeSpent, setTimeSpent] = useState(''); // 시간을 입력받기 위한 상태
  const [purpose, setPurpose] = useState(''); // 목적을 입력받기 위한 상태
  const dispatch = useDispatch(); // Redux dispatch 사용

  // 모달 닫기
  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
    setTimeSpent(''); // 모달이 닫힐 때 입력된 값 초기화
    setPurpose('');
  };

  // 모달 열기
  const openModal = cardName => {
    setSelectedCard(cardName);
    setIsModalOpen(true);
    setPurpose(contractedData[cardName][0].purpose); // 첫 번째 목적을 기본으로 설정
  };

  // 전송 버튼 클릭 시 카트에 데이터 추가
  const handleSend = () => {
    if (selectedCard && timeSpent) {
      // 선택된 activityId와 purpose를 찾음
      const selectedActivity = contractedData[selectedCard].find(
        item => item.purpose === purpose
      );

      // 카트에 추가할 데이터를 dispatch
      dispatch(
        addToCart({
          title: selectedCard,
          timeSpent: timeSpent,
          purpose: purpose,
          activityId: selectedActivity.activityId, // 선택된 activityId 추가
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
        {filteredCards.map(cardName => (
          <div
            key={cardName}
            className="bg-white rounded-lg shadow-md p-4 flex cursor-pointer w-full"
            onClick={() => openModal(cardName)}
          >
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-xl font-bold mb-2">{cardName}</h2>
              <p className="text-gray-600">
                {contractedData[cardName].map(item => item.purpose).join(', ')}
              </p>
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
            <h2 className="text-2xl font-bold mb-4">{selectedCard}</h2>

            {/* 시간 선택 옵션 */}
            <label className="block text-lg mb-2">몇 분 하셨나요?</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="분을 입력하세요"
              min="0"
              step="1" //1분 단위
              value={timeSpent}
              onChange={e => setTimeSpent(e.target.value)}
            />

            {/* 목적 선택 옵션 */}
            <div className="w-full relative">
              <label className="block text-lg mb-2">어떤 목적이었나요?</label>
              <select
                className="w-full p-2 border rounded-lg max-w-full"
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
              >
                {contractedData[selectedCard].map(item => (
                  <option key={item.purpose} value={item.purpose}>
                    {item.purpose}
                  </option>
                ))}
              </select>
            </div>

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
                입력
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
