import GamePage from '@/pages/GamePage';
import ResultPage from '@/pages/ResultPage';
import StartPage from '@/pages/StartPage';

export const AppRoutes = {
  start: '/React-CityGame',
  game: '/React-CityGame/game',
  result: '/React-CityGame/result',
};

interface RouteObject {
  path: string;
  element: React.ComponentType;
}

export const routes: RouteObject[] = [
  {
    path: AppRoutes.start,
    element: StartPage,
  },
  {
    path: AppRoutes.game,
    element: GamePage,
  },
  {
    path: AppRoutes.result,
    element: ResultPage,
  },
];
