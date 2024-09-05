import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DiaryPage from './pages/DiaryPage';
import WritePage from './pages/WritePage';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import { submitEntryAction } from './hooks/action';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'foodwrite', element: <ActivityPage /> },
      { path: 'diarywrite', element: <WritePage />, action: submitEntryAction },
      { path: 'diarysee', element: <DiaryPage /> },
    ],
  },
]);
