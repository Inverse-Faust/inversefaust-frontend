import { parseISO, differenceInHours } from 'date-fns';

export default function wolfScore(mockData) {
  const now = new Date();
  const a = -0.017; // 감쇠 상수

  let blackTotal = 0;
  let whiteTotal = 0;

  mockData.forEach(entry => {
    const entryDate = parseISO(entry.dateTime); // dateTime을 ISO 형식으로 파싱
    const hoursDiff = differenceInHours(now, entryDate); // 현재 시간과 일기 작성 시간의 차이 계산

    // 지수 감쇠 계산
    const decayFactor = Math.exp(a * hoursDiff);

    // 감쇠된 점수 계산 및 합계에 추가
    blackTotal += entry.black_score * decayFactor;
    whiteTotal += entry.white_score * decayFactor;
  });

  return {
    black: blackTotal,
    white: whiteTotal,
  };
}
