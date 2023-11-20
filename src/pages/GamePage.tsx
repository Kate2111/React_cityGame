import CityInput from '@/components/CityInput';
import CityList from '@/components/CityList';
import Header from '@/components/Header';
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
  const { cities, currentPlayer, delay } = useSelector(gameState);

  useEffect(() => {
    const simulateOpponentMove = () => {
      if (currentPlayer === 'Игрок2') {
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
      <div className="max-w-xl min-h-[464px] max-h-[549px] mx-auto flex flex-col bg-white rounded-2xl text-grey-700">
        <Header />
        <main className="w-full flex-1 flex flex-col justify-between p-4">
          {!cities.player1.length ? (
            <>
              <div className="w-full flex-1 flex justify-center items-center">
                <p className="text-gray-400 text-xs">Первый участник вспоминает города...</p>
              </div>
            </>
          ) : (
            <>
              <CityList citiesLeft={cities.player1} citiesRight={cities.player2} />
            </>
          )}

          <CityInput onSubmit={handleCitySubmit} />
        </main>
      </div>
    </>
  );
};

export default GamePage;
