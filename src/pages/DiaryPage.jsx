import React, { useState } from 'react';

const mockDiaries = [
  {
    id: 1,
    content: '오늘은 정말 좋은 날이었어. 산책을 하면서 기분이 상쾌했어.',
    hashtags: ['명상 유튜브 1시간', '숏츠 3시간', '운동 2시간', '공부 4시간'],
    date: '2023-09-01',
  },
  {
    id: 2,
    content: '운동을 열심히 했고, 건강해지는 느낌이 들어서 좋았어.',
    hashtags: ['명상 유튜브 1시간', '숏츠 3시간', '운동 2시간', '공부 4시간'],
    date: '2023-09-02',
  },
  {
    id: 3,
    content: '오늘은 일을 많이 했는데, 피곤하지만 뿌듯해.',
    hashtags: ['명상 유튜브 1시간', '숏츠 3시간', '운동 2시간', '공부 4시간'],
    date: '2023-09-03',
  },
];

function DiaryCard({ diary, onSave }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [editedContent, setEditedContent] = useState(diary.content); // 수정된 content 상태

  // 편집 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = () => {
    setIsEditing(false);
    // API 요청을 보내기 위해 onSave 호출
    onSave(diary.id, editedContent);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col mb-4">
      {/* 날짜 */}
      <span className="text-sm text-gray-500 mb-1">{diary.date}</span>

      {/* 해시태그 부분 */}
      <div className="flex overflow-x-auto space-x-2 pb-2 mb-4 border-b-2 border-gray-200">
        {(diary.hashtags || []).map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm whitespace-nowrap"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 작성된 일기 부분 */}
      <div className="text-gray-800">
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={editedContent}
            onChange={e => setEditedContent(e.target.value)}
          />
        ) : (
          <p>{diary.content}</p>
        )}
      </div>

      {/* 편집 및 저장 버튼 */}
      <div className="flex justify-end mt-2">
        {isEditing ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSaveClick}
          >
            저장
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleEditClick}
          >
            편집
          </button>
        )}
      </div>
    </div>
  );
}

// DiaryPage 컴포넌트: 여러 개의 일기 카드를 날짜별로 렌더링
export default function DiaryPage({ diaries = mockDiaries }) {
  // API 요청을 시뮬레이션하는 함수
  const handleSave = (id, newContent) => {
    console.log(`Diary ${id} has been updated with new content:`, newContent);
    // 실제로는 여기서 API 요청을 보내면 됩니다.
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-60px)] w-full">
      {/* 페이지 소제목 */}
      <h1 className="text-3xl font-bold text-white mb-6">나의 일기</h1>

      {/* 다이어리 카드 섹션 */}
      <div className="w-full max-w-4xl">
        {diaries.map(diary => (
          <DiaryCard key={diary.id} diary={diary} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
}

export { DiaryCard, DiaryPage };
