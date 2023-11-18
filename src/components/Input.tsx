import { gameState } from '@/store/slice/gameSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface CityInputProps {
  onSubmit: (city: string) => void;
}

const Input: React.FC<CityInputProps> = ({ onSubmit }) => {
  const [city, setCity] = useState('');
  const { placeholder } = useSelector(gameState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (city.trim() !== '') {
      onSubmit(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <input
          value={city}
          onChange={handleChange}
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="bg-violet-600 w-32 h-10 rounded p-4 text-white flex items-center justify-center">
          Ok
        </button>
      </div>
    </form>
  );
};

export default Input;
