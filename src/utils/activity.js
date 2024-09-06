export default function activityContraction(data) {
  // 결과를 담을 객체
  const result = {};

  // 데이터를 순회하면서 activityName을 key로 하고, 객체를 배열로 묶음
  data.forEach(item => {
    const { activityId, activityName, purpose } = item;

    // 만약 activityName이 이미 result에 있다면 해당 배열에 추가
    if (result[activityName]) {
      result[activityName].push({ activityId, purpose });
    } else {
      // 처음 발견된 activityName은 배열로 초기화 후 추가
      result[activityName] = [{ activityId, purpose }];
    }
  });

  console.log(result);
  return result;
}
