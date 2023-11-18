import { AppRoutes } from '@/router/routes';
import { gameState } from '@/store/slice/gameSlice';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* interface TimerProps {
  time: number;
  onTimeout: () => void;
} */

const Timer: React.FC = () => {
  const { timer } = useSelector(gameState);
  const [seconds, setSeconds] = useState(timer);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(timer);
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer]);

  if (seconds === 0) {
    navigate(AppRoutes.result);
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <div>{formatTime(seconds)}</div>;
};

export default Timer;
