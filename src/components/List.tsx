import React from 'react';

interface CityListProps {
  cities: string[];
}

const List: React.FC<CityListProps> = ({ cities }) => {
  return (
    <ul>
      {cities.map((city, index) => (
        <li key={index}>{city}</li>
      ))}
    </ul>
  );
};

export default List;
