import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className="bg-violet-600 min-w-[126px] max-w-[180px] h-10 rounded p-4 text-white flex items-center justify-center hover:bg-violet-500">
      {children}
    </button>
  );
};

export default Button;
