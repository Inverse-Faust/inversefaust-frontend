import axios from 'axios';
import { redirect } from 'react-router-dom';
import { addMessage } from '../store/messageSlice';
import store from '../store/store';

const apiUrl = 'http://52.79.142.158:8090'; // 혹은 https를 사용할 경우 'https://52.79.142.158'

export async function submitEntryAction({ request }) {
  const formData = await request.formData();

  const requestBody = {
    contents: formData.get('entry'),
  };

  try {
    const response = await axios.post(`${apiUrl}/api/diary/user1`, requestBody);
    console.log(response);
    const data = await response.data;
    store.dispatch(addMessage({ text: data.advice }));

    // 요청 성공 시 home으로 리다이렉트
    return redirect('/');
  } catch (error) {
    console.error('Error saving entry: ', error);
    return null;
  }
}

export async function DiaryAction({ request }) {
  const formData = await request.formData();
  const id = formData.get('id');
  const newContent = formData.get('content');

  try {
    // 실제 API 요청을 통해 서버로 데이터를 전송합니다.
    const response = await axios.put(`${apiUrl}/api/diary/${id}`, {
      contents: newContent,
    });

    if (response.status === 200) {
      // 성공 시 현재 페이지로 리다이렉트하여 페이지를 다시 로드
      return redirect('');
    } else {
      return { success: false, message: 'Failed to update diary' };
    }
  } catch (error) {
    console.error('Error updating diary:', error);
    return { success: false, message: 'Error updating diary' };
  }
}
