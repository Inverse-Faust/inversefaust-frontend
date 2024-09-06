import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DiaryPage from './pages/DiaryPage';
import WritePage from './pages/WritePage';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import { submitEntryAction } from './hooks/action';
import homeLoader from './hooks/loader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      { path: 'foodwrite', element: <ActivityPage /> },
      { path: 'diarywrite', element: <WritePage />, action: submitEntryAction },
      { path: 'diarysee', element: <DiaryPage /> },
      { path: 'cart/send' }, // 장바구니 전송 action 추가
    ],
  },
]);
