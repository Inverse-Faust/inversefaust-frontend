import { parseISO, differenceInHours } from 'date-fns';

export default function wolfScore(mockData) {
  const now = new Date();
  const a = -0.017; // 감쇠 상수

  let blackTotal = 0;
  let whiteTotal = 0;

  mockData.forEach(entry => {
    const entryDate = parseISO(`${entry.date}T${entry.time}`);
    const hoursDiff = differenceInHours(now, entryDate);

    // 지수 감쇠 계산
    const decayFactor = Math.exp(a * hoursDiff);

    // 감쇠된 점수 계산 및 합계에 추가
    blackTotal += entry.black * decayFactor;
    whiteTotal += entry.white * decayFactor;
  });

  return {
    black: blackTotal,
    white: whiteTotal,
  };
}
