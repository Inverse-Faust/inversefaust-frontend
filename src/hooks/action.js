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
    store.dispatch(addMessage({ text: entry }));

    // 요청 성공 시 home으로 리다이렉트
    return redirect('/');
  } catch (error) {
    console.error('Error saving entry: ', error);
    return null;
  }
}
