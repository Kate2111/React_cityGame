import { AppRoutes } from '@/router/routes';
import { gameState } from '@/store/slice/gameSlice';
import { decrementTimer, resetTimer, timerState } from '@/store/slice/timerSlice';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Timer: FC = () => {
  const { currentPlayer } = useSelector(gameState);
  const { timer } = useSelector(timerState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (timer === 0) {
    navigate(AppRoutes.result);
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => {
      clearInterval(timerId);
      dispatch(resetTimer());
    };
  }, [currentPlayer, dispatch]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <div className="text-xl font-medium">{formatTime(timer)}</div>
    </>
  );
};

export default Timer;
