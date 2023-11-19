import { gameState } from '@/store/slice/gameSlice';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
interface TimerProps {
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeout }) => {
  const [seconds, setSeconds] = useState(120);
  const { currentPlayer } = useSelector(gameState);

  useEffect(() => {
    console.log('ghjdthrf');
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(timerId);
          onTimeout();
          return 0;
        }
      });
    }, 1000);

    setSeconds(120);

    return () => clearInterval(timerId);
  }, [currentPlayer]);

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
