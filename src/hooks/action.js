import axios from 'axios';
import { redirect } from 'react-router-dom';
import { addMessage } from '../store/messageSlice';
import store from '../store/store';

export async function submitEntryAction({ request }) {
  const formData = await request.formData();
  const entry = formData.get('entry');

  try {
    // PUT 요청으로 데이터 전송 (주석 처리)
    // const response = await axios.put('/api/diary', { entry });
    console.log(entry);
    // 메시지 형식으로 변환 후 Redux 상태에 저장
    const mockData = {
      userId: 'user1',
      white_score: 2,
      black_score: 5,
      diary_sentiment: '중립',
      diary_score: 0,
      diary_advice:
        '오늘 친구와 즐거운 시간을 보낸 점이 정말 좋네요! 친구와의 소중한 시간을 즐기며 긍정적인 에너지를 얻은 것을 칭찬합니다. 내일은 꼭 해야 할 일을 먼저 한 후에 여유롭게 노는 시간을 계획해보세요. 하루의 일과에 균형을 맞출 수 있도록 작은 계획을 세워보면 어떨까요? 힘내세요, 당신의 내일도 응원합니다!',
    };

    store.dispatch(addMessage({ text: mockData.diary_advice }));

    // 요청 성공 시 home으로 리다이렉트
    return redirect('/');
  } catch (error) {
    console.error('Error saving entry: ', error);
    return null;
  }
}
