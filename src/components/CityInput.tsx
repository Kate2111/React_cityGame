import { gameState } from '@/store/slice/gameSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from './Icon';
interface CityInputProps {
  onSubmit: (city: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ onSubmit }) => {
  const [city, setCity] = useState('');
  const { currentPlayer, placeholder } = useSelector(gameState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = () => {
    if (city.trim() !== '') {
      onSubmit(city.trim());
      setCity('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex mt-4  relative">
      <input
        value={city}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        type="text"
        className={`block w-full outline-none bg-gray-100 h-12 border-transparent rounded-md py-2 pl-3 pr-2 text-sm text-gray-900 focus:ring-2 sm:text-base ${
          currentPlayer === 'Игрок1' ? 'placeholder:text-gray-700' : 'placeholder:text-gray-400'
        }`}
        placeholder={placeholder}
      />
      <button
        onClick={handleSubmit}
        className={` w-8 h-8 absolute top-2 right-2 rounded p-0 text-white flex items-center justify-center ${
          currentPlayer === 'Игрок1' ? 'bg-violet-600' : 'bg-gray-400'
        }`}>
        <Icon />
      </button>
    </div>
  );
};

export default CityInput;
