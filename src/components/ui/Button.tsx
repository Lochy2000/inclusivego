import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'font-bold uppercase transition-all border-2 border-black';

  const variants = {
    primary: 'bg-yellow-400 py-4 px-8 border-4 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px]',
    secondary: 'bg-white text-black py-3 px-6 hover:bg-black hover:text-white',
    icon: 'p-2 bg-white hover:bg-black hover:text-white'
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
