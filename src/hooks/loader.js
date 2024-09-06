export default async function homeLoader() {
  // 실제 백엔드가 있을 때는 axios로 데이터 가져오기
  // const response = await axios.get('/api/data');
  // return response.data;

  const mockData = [
    {
      black: 3,
      white: 5,
    },
    {
      black: 7,
      white: 12,
    },
    {
      black: 8,
      white: 9,
    },
  ];

  // 현재는 mock 데이터를 사용
  return mockData;
}
