import activityContraction from '../utils/activity';
import wolfScore from '../utils/score';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export async function homeLoader() {
  // 실제 백엔드가 있을 때는 axios로 데이터 가져오기
  // const response = await axios.get(`${apiUrl}/api/user/score/user1`);
  // return response.data;

  const mockData = [
    {
      white_score: 50,
      black_score: 40,
      dateTime: '2024-09-06T17:08:33',
    },
    {
      white_score: 50,
      black_score: 40,
      dateTime: '2024-09-06T17:08:20',
    },
  ];

  const wild = wolfScore(mockData);
  console.log(wild);
  // 현재는 mock 데이터를 사용
  return wild;
}

export async function ActivityLoader() {
  try {
    const response = await axios.get(`${apiUrl}/api/activity`);
    return activityContraction(response.data);
  } catch (error) {
    console.error('Error fetching activity data:', error);
  }

  // 요청 실패 시 mock 데이터를 반환
  const mockData = [
    {
      activityId: 'sdafasi',
      activityName: '유튜브 보기',
      purpose: '자기계발',
    },
    {
      activityId: 'sdafasi2',
      activityName: '유튜브 보기',
      purpose: '여가 생활',
    },
    {
      activityId: 'sdafasi32',
      activityName: '산책하기',
      purpose: '운동',
    },
    {
      activityId: 'sdafasi4',
      activityName: '운동하기',
      purpose: '운동',
    },
  ];

  return mockData;
}

export async function DiaryLoader() {
  const mockDiaries = [
    {
      date: '2024-09-06T00:00:00',
      activityList: {
        독서하기: 120,
        코딩하기: 45,
        운동하기: 60,
      },
      diaryContent: '오늘은 매우 즐거웠다. 날씨도 좋았고, 많은 활동을 했다.',
    },
  ];

  try {
    const response = await axios.get(`${apiUrl}/api/history/user1`);
    console.log(response);
    // 응답이 성공적일 경우 데이터 반환
    if (response.status === 200 && response.data) {
      return response.data; // 실제 데이터를 반환
    }
  } catch (error) {
    console.error('Error fetching diary data:', error);
  }

  // 실패 시 mock 데이터를 반환
  return mockDiaries;
}
