import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DiaryPage from './pages/DiaryPage';
import WritePage from './pages/WritePage';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'diarywrite', element: <WritePage /> },
      { path: 'foodwrite', element: <ActivityPage /> },
      { path: 'diarysee', element: <DiaryPage /> },
    ],
  },
]);
