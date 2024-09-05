import React, { useState } from 'react';

export default function WritePage() {
  const [entry, setEntry] = useState('');
  const maxChars = 1000;

  const handleChange = e => {
    setEntry(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="w-full max-w-lg p-6 bg-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-white">오늘의 일기</h2>
        <textarea
          value={entry}
          onChange={handleChange}
          maxLength={maxChars}
          placeholder="오늘 당신의 하루는 어땠나요?"
          className="w-full h-80 p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-200"
        ></textarea>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-white">
            {entry.length}/{maxChars} 글자
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              entry.length > 0
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={entry.length === 0}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
