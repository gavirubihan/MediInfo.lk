import React, { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'white' | 'outline-white' | 'text' | 'login';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold font-sans cursor-pointer transition-all duration-200";
  
  const variantClasses = {
    'primary': 'px-7 py-3.5 bg-blue text-white rounded-[10px] text-[15px] min-h-[48px] shadow-[0_2px_8px_rgba(26,111,191,0.25)] hover:bg-blue-dark hover:shadow-[0_4px_16px_rgba(26,111,191,0.35)] active:scale-97',
    'secondary': 'px-7 py-3.5 bg-white text-blue border-2 border-blue rounded-[10px] text-[15px] min-h-[48px] hover:bg-blue-light active:scale-97',
    'white': 'px-7 py-3.5 bg-white text-blue rounded-[10px] text-[15px] min-h-[48px] hover:bg-blue-light active:scale-97 border-none',
    'outline-white': 'px-7 py-3.5 bg-transparent text-white border-2 border-white/60 rounded-[10px] text-[15px] min-h-[48px] hover:border-white hover:bg-white/10',
    'text': 'bg-transparent border-none text-blue text-[15px] hover:text-blue-dark hover:underline p-0 gap-1.5',
    'login': 'px-5 py-2.5 bg-blue text-white border-none rounded-[10px] text-[14px] hover:bg-blue-dark active:scale-97',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
