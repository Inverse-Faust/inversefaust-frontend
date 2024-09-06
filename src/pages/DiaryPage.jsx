import React, { useState } from 'react';
import { useLoaderData, useSubmit } from 'react-router-dom';

function DiaryCard({ diary, onSave }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [editedContent, setEditedContent] = useState(diary.diaryContent); // 수정된 diaryContent 상태

  // 편집 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = () => {
    setIsEditing(false);
    // API 요청을 보내기 위해 onSave 호출
    onSave(diary.diaryId, editedContent);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col mb-4">
      {/* 날짜 */}
      <span className="text-sm text-gray-500 mb-1">
        {new Date(diary.date).toLocaleDateString()}
      </span>

      {/* 활동 리스트 */}
      <div className="flex flex-wrap space-x-2 pb-2 mb-4 border-b-2 border-gray-200">
        {Object.entries(diary.activityList).map(([activity, time], index) => (
          <span
            key={index}
            className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm whitespace-nowrap"
          >
            #{activity}: {time}분
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
          <p>{diary.diaryContent}</p>
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
export default function DiaryPage() {
  const diaries = useLoaderData(); // 수정: mockDiaries를 사용하지 않고 loader에서 받은 데이터 사용
  const submit = useSubmit(); // React Router의 submit 함수 사용

  // 데이터를 action으로 넘기는 함수
  const handleSave = (id, newContent) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('content', newContent);

    // submit을 이용하여 action으로 formData를 전달
    submit(formData, { method: 'post', action: `/diarysee` });
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-60px)] w-full">
      {/* 페이지 소제목 */}
      <h1 className="text-3xl font-bold text-white mb-6">나의 일기</h1>

      {/* 다이어리 카드 섹션 */}
      <div className="w-full max-w-4xl">
        {diaries.map(diary => (
          <DiaryCard key={diary.diaryId} diary={diary} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
}

export { DiaryCard, DiaryPage };
