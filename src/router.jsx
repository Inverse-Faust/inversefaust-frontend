import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DiarySeePage from './pages/DiarySeePage';
import DiaryWritePage from './pages/DiaryWritePage';
import FoodWritePage from './pages/FoodWritePage';
import HomePage from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'diarywrite', element: <DiaryWritePage /> },
      { path: 'foodwrite', element: <FoodWritePage /> },
      { path: 'diarysee', element: <DiarySeePage /> },
    ],
  },
]);
