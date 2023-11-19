import Button from '@/components/Button';
import { AppRoutes } from '@/router/routes';
import { gameState, newGame } from '@/store/slice/gameSlice';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResultPage: FC = () => {
  const { currentPlayer, cities } = useSelector(gameState);

  const citiesPlayer1 = cities.player1.length;
  const citiesPlayer2 = cities.player2.length;

  const totalCities = citiesPlayer1 + citiesPlayer2;
  let message = '';

  if (totalCities >= 35) {
    message = 'Отличный результат! Вы настоящие знатоки городов!';
  } else if (totalCities >= 25) {
    message = 'Впечатляюще! Вы отлично знаете города!';
  } else if (totalCities >= 15) {
    message = 'Не плохо! В следующий раз постарайтесь еще больше!';
  } else if (totalCities >= 5) {
    message = 'Хорошо! Продолжайте улучшать свои знания городов!';
  } else {
    message = 'Очень неплохой результат. Попробуйте еще!';
  }

  const lastCityPlayer1 = citiesPlayer1 > 0 && cities.player1[citiesPlayer1 - 1];
  const lastCityPlayer2 = citiesPlayer2 > 0 && cities.player2[citiesPlayer2 - 1];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onButtonRouter = () => {
    navigate(AppRoutes.game);
    dispatch(newGame());
  };

  return (
    <>
      <div className="max-w-xl h-96 min-w-[576px] px-7 flex flex-col items-center justify-center gap-5 bg-white rounded-2xl text-grey-700">
        <div className="text-xl flex flex-col items-center justify-center">
          {currentPlayer === 'Сейчас очередь соперника' ? (
            <>
              <p>Поздравляем тебя с победой!</p>
              <p>Твой противник не вспомнил нужный город!</p>
            </>
          ) : (
            <>
              <p>К сожалению, твое время вышло!</p>
              <p>Твой противник победил!</p>
            </>
          )}
        </div>

        <p
          className={`text-3xl font-medium ${
            currentPlayer === 'Сейчас очередь соперника' ? 'text-green-600' : 'text-red-600'
          }`}>
          00:00
        </p>

        <p className="text-xl">Всего было перечислено городов {totalCities}</p>

        <p className="text-xl">{message}</p>

        <p className="text-xl">
          Последний город названный победителем{' '}
          <span className="text-2xl font-medium">
            {' '}
            {currentPlayer === 'Сейчас очередь соперника' ? lastCityPlayer1 : lastCityPlayer2}
          </span>
        </p>

        <Button onClick={onButtonRouter}>Начать новую игру</Button>
      </div>
    </>
  );
};

export default ResultPage;
