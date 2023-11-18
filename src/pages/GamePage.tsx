import Input from '@/components/Input';
import List from '@/components/List';
import Timer from '@/components/Timer';
import { startGame, gameState, secondPlayerMove, submitCity } from '@/store/slice/gameSlice';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GamePage: FC = () => {
  const dispatch = useDispatch();
  const { cities, currentPlayer } = useSelector(gameState);

  useEffect(() => {
    const simulateOpponentMove = () => {
      if (currentPlayer === 'Сейчас очередь соперника') {
        setTimeout(() => {
          dispatch(secondPlayerMove());
        }, 5000);
      }
    };

    simulateOpponentMove();
  }, [currentPlayer]);

  const handleCitySubmit = (city: string) => {
    cities.player1.length === 0 && dispatch(startGame(city));
    dispatch(submitCity(city));
  };

  return (
    <>
      <div className="max-w-xl h-96 flex flex-col bg-white rounded-2xl text-grey-700">
        <header className="h-16 p-4 border-gray-100 border-solid border-b-2 flex justify-between items-center">
          <p>{currentPlayer}</p>
          <Timer />
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
