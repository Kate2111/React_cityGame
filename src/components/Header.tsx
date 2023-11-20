import { gameState } from '@/store/slice/gameSlice';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import Timer from './Timer';
import { timerState } from '@/store/slice/timerSlice';

const Header: FC = () => {
  const { currentPlayer } = useSelector(gameState);
  const { timer } = useSelector(timerState);

  const progressWidth = `${100 - (timer / 120) * 100}%`;

  return (
    <header className="h-16 flex flex-col">
      <div className="flex justify-between items-center p-4 ">
        <p className="text-sm sm:text-base">
          {currentPlayer === 'Игрок1' ? 'Сейчас ваша очередь' : 'Сейчас очередь соперника'}
        </p>
        <Timer />
      </div>
      <div className="relative w-full h-1 bg-gray-100 rounded">
        <div
          className="absolute h-full bg-violet-300 rounded "
          style={{ width: progressWidth }}></div>
      </div>
    </header>
  );
};

export default Header;
