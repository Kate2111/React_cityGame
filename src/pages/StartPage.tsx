import { AppRoutes } from '@/router/routes';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-xl h-96 flex flex-col bg-white rounded-2xl text-grey-700">
        <div>
          <header className="h-16 p-4 border-gray-100 border-solid border-b-2 flex justify-center items-center">
            <p>Игра в города на время</p>
          </header>
          <main>
            <div className="flex flex-col gap-6 p-6 justify-start">
              <p className="">Цель: Назвать как можно больше реальных городов </p>
              <ul className="list-disc pl-5">
                <li>Запрещается повторение городов.</li>
                <li>
                  Названия городов на твердый "ъ" и мягкий "ь" знак нет. Из-за этого мы пропускаем
                  эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.
                </li>
                <li>
                  Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не
                  вводит слово он считается проигравшим.
                </li>
              </ul>
              <div className="flex justify-center">
                <button
                  className="bg-violet-600 w-32 h-10 rounded p-4 text-white flex items-center justify-center"
                  onClick={() => {
                    navigate(AppRoutes.game);
                  }}>
                  Начать игру
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StartPage;
