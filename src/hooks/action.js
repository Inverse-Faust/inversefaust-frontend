import axios from 'axios';
import { redirect } from 'react-router-dom';
import { addMessage } from '../store/messageSlice';
import store from '../store/store';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export async function submitEntryAction({ request }) {
  const formData = await request.formData();

  const requestBody = {
    contents: formData.get('entry'),
  };

  try {
    const response = await axios.post(`${apiUrl}/api/diary/user1`, requestBody);
    const mockData = {
      white_score: 10,
      black_score: 100,
      advice: '유튜브는 조금만 보세요!',
    };

    store.dispatch(addMessage({ text: mockData.advice }));

    // 요청 성공 시 home으로 리다이렉트
    return redirect('/');
  } catch (error) {
    console.error('Error saving entry: ', error);
    return null;
  }
}
