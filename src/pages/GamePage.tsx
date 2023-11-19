import Header from '@/components/Header';
import Input from '@/components/Input';
import List from '@/components/List';
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

const GamePage: FC = () => {
  const dispatch = useDispatch();
  const { cities, currentPlayer, delay, availableCities } = useSelector(gameState);

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

  return (
    <>
      <div className="w-[576px] min-h-[464px] max-h-[549px] flex flex-col bg-white rounded-2xl text-grey-700">
        <Header />
        <main className="flex-1 flex flex-col justify-between p-4">
          {!availableCities ? (
            <>
              <div className="flex-1 flex justify-center items-center">
                <p className="text-gray-400 text-xs">Первый участник вспоминает города...</p>
              </div>
            </>
          ) : (
            <>
              <List citiesLeft={cities.player1} citiesRight={cities.player2} />
            </>
          )}

          <Input onSubmit={handleCitySubmit} />
        </main>
      </div>
    </>
  );
};

export default GamePage;
