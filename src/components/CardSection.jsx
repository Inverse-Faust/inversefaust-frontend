import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function PurposeDropdown({ purposes, selectedPurpose, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = purpose => {
    onSelect(purpose);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <div className="relative w-full">
      <div
        className="border p-2 rounded-lg cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPurpose ? selectedPurpose : '목적을 선택하세요'}
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full bg-white border rounded-lg shadow-lg z-10">
          {purposes.map((purpose, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                index !== purposes.length - 1 ? 'border-b border-gray-200' : ''
              }`}
              onClick={() => handleSelect(purpose)}
            >
              {purpose}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CardSection({ filteredCards, contractedData }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeSpent, setTimeSpent] = useState('');
  const [purpose, setPurpose] = useState('');
  const dispatch = useDispatch();

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
    setTimeSpent('');
    setPurpose('');
  };

  const openModal = cardName => {
    setSelectedCard(cardName);
    setIsModalOpen(true);
    setPurpose(contractedData[cardName][0].purpose);
  };

  const handleSend = () => {
    if (selectedCard && timeSpent) {
      const selectedActivity = contractedData[selectedCard].find(
        item => item.purpose === purpose
      );

      dispatch(
        addToCart({
          title: selectedCard,
          timeSpent: timeSpent,
          purpose: purpose,
          activityId: selectedActivity.activityId,
        })
      );

      alert('카트에 추가되었습니다!');
      closeModal();
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

      {selectedCard && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg p-6 w-3/4 max-w-lg transform transition-transform duration-300 ${
              isModalOpen ? 'scale-100' : 'scale-50'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{selectedCard}</h2>

            <label className="block text-lg mb-2">몇 분 하셨나요?</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="분을 입력하세요"
              min="0"
              step="1"
              value={timeSpent}
              onChange={e => setTimeSpent(e.target.value)}
            />

            <label className="block text-lg mb-2">어떤 목적이었나요?</label>
            <PurposeDropdown
              purposes={contractedData[selectedCard].map(item => item.purpose)}
              selectedPurpose={purpose}
              onSelect={selectedPurpose => setPurpose(selectedPurpose)}
            />

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
