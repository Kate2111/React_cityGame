import { FC } from 'react';

interface ListItemProps {
  city: string;
  isRight?: boolean;
}

const ListItem: FC<ListItemProps> = ({ city, isRight = false }) => {
  const classNames = ` py-1.5 px-5 rounded-t-2xl w-max ${
    isRight
      ? 'ml-auto rounded-bl-2xl bg-violet-500 text-right text-white'
      : 'mr-auto rounded-br-2xl bg-violet-50 text-left'
  }`;

  return <li className={classNames}>{city}</li>;
};

export default ListItem;
