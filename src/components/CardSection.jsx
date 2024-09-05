import React, { useState } from 'react';

export default function CardSection({ filteredCards }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 닫기
  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  // 모달 열기
  const openModal = card => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-1 gap-3 w-full mt-6">
        {filteredCards.map(card => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 flex cursor-pointer w-full"
            onClick={() => openModal(card)}
          >
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-xl font-bold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
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
            />

            {/* 행위 선택 옵션 */}
            <label className="block text-lg mb-2">어떤 목적이였나요?</label>
            <select className="w-full p-2 border rounded-lg">
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
                onClick={() => alert('전송되었습니다!')}
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
