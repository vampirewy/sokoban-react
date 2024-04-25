import EditView from '@/views/Edit';
import GameView from '@/views/Game';
import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/game',
    element: React.createElement(GameView),
  },
  {
    path: '/edit',
    element: React.createElement(EditView),
  },
  // 重定向
  {
    path: '/',
    loader: () => {
      return redirect('/game');
    },
  },
]);

export default router;
