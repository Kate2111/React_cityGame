import React from 'react';

interface CityListProps {
  city: string[];
}

const ListItemRight: React.FC<CityListProps> = ({ city }) => {
  return <li className="bg-violet-500 py-1.5 px-5 rounded-bl-2xl rounded-t-2xl">{city}</li>;
};

export default ListItemRight;
