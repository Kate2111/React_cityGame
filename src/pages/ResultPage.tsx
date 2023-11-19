import { gameState } from '@/store/slice/gameSlice';
import { FC } from 'react';
import { useSelector } from 'react-redux';

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

  return (
    <>
      <div className="max-w-xl h-96 flex flex-col bg-white rounded-2xl text-grey-700">
        {currentPlayer === 'Сейчас очередь соперника' ? (
          <>
            <p>Поздравляем тебя с победой!</p>
            <p>Твой противник не вспомнил нужный город!</p>
          </>
        ) : (
          <>
            <p>К сожалению, свое время вышло!</p>
            <p>Твой противник победил!</p>
          </>
        )}

        <p>Всего было перечислено городов {totalCities}</p>

        <p>{message}</p>

        <p>
          Последний город названный победителем
          {currentPlayer === 'Сейчас очередь соперника' ? lastCityPlayer1 : lastCityPlayer2}
        </p>
      </div>
    </>
  );
};

export default ResultPage;
