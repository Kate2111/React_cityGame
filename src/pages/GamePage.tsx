import Input from '@/components/Input';
import List from '@/components/List';
import Timer from '@/components/Timer';
import { AppRoutes } from '@/router/routes';
import {
  startGame,
  gameState,
  secondPlayerMove,
  submitCity,
  setFilteredCities,
  setDelay,
} from '@/store/slice/gameSlice';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GamePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cities, currentPlayer, delay } = useSelector(gameState);

  useEffect(() => {
    const simulateOpponentMove = () => {
      console.log(delay);
      if (currentPlayer === 'Сейчас очередь соперника') {
        setTimeout(() => {
          dispatch(secondPlayerMove());
        }, delay);
      }
    };

    simulateOpponentMove();
  }, [currentPlayer]);

  const handleCitySubmit = (city: string) => {
    cities.player1.length === 0 && dispatch(startGame(city));
    cities.player1.length > 0 && dispatch(submitCity(city));
    dispatch(setFilteredCities());
    dispatch(setDelay());
  };

  const handleTimeout = () => {
    navigate(AppRoutes.result);
  };

  return (
    <>
      <div className="max-w-xl h-96 flex flex-col bg-white rounded-2xl text-grey-700">
        <header className="h-16 p-4 border-gray-100 border-solid border-b-2 flex justify-between items-center">
          <p>{currentPlayer}</p>
          <Timer onTimeout={handleTimeout} />
        </header>
        <main className="flex-1 flex flex-col justify-between p-6">
          <div className="flex-1 flex justify-between gap-5">
            <div>
              <h2>Ваши города:</h2>
              <List cities={cities.player1} />
            </div>
            <div>
              <h2>Города противника:</h2>
              <List cities={cities.player2} />
            </div>
          </div>
          <Input onSubmit={handleCitySubmit} />
        </main>
      </div>
    </>
  );
};

export default GamePage;
