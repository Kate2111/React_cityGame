import React from 'react';
import ListItem from './CityListItem';

interface CityListProps {
  citiesLeft: string[];
  citiesRight: string[];
}

const CityList: React.FC<CityListProps> = ({ citiesLeft, citiesRight }) => {
  const messages = citiesLeft
    .map((city, index) => ({ player: 'player1', text: city, index }))
    .concat(citiesRight.map((city, index) => ({ player: 'player2', text: city, index })))
    .sort((a, b) => a.index - b.index);

  return (
    <div className="flex-1 w-full">
      <ul className="flex flex-col justify-between gap-1 overflow-y-auto  max-h-[367px]">
        {messages.map((message, index) => (
          <ListItem key={index} city={message.text} isRight={message.player === 'player2'} />
        ))}
      </ul>
      {messages.length > 6 && (
        <div className="text-gray-400 text-xs text-center mt-3">
          Всего перечислено городов {messages.length}
        </div>
      )}
    </div>
  );
};

export default CityList;
