import wolfScore from '../utils/score';

export default async function homeLoader() {
  // 실제 백엔드가 있을 때는 axios로 데이터 가져오기
  // const response = await axios.get('/api/data');
  // return response.data;

  const mockData = [
    { date: '2024-09-05', time: '14:31', black: 10, white: 1 },
    { date: '2024-09-04', time: '18:42', black: 10, white: 4 },
    { date: '2024-09-05', time: '15:42', black: 9, white: 15 },
    { date: '2024-09-02', time: '10:58', black: 10, white: 11 },
    { date: '2024-09-06', time: '07:12', black: 9, white: 9 },
    { date: '2024-09-05', time: '18:16', black: 2, white: 14 },
    { date: '2024-09-04', time: '01:57', black: 7, white: 14 },
    { date: '2024-09-06', time: '04:44', black: 6, white: 11 },
    { date: '2024-09-06', time: '04:52', black: 9, white: 7 },
  ];

  const wild = wolfScore(mockData);
  // 현재는 mock 데이터를 사용
  return wild;
}
