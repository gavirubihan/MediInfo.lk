import React, { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
  wrapperClassName?: string;
  buttonText?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  wrapperClassName = '',
  buttonText = 'Search',
  className = '',
  ...props
}) => {
  return (
    <div className={`relative w-full ${wrapperClassName}`}>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none">
        <Search size={20} />
      </span>
      <input
        className={`w-full h-14 border-[1.5px] border-light-gray rounded-xl pl-[52px] pr-[100px] text-base font-sans text-dark-gray bg-white outline-none transition-all duration-200 placeholder:text-mid-gray focus:border-blue focus:ring-[3px] focus:ring-blue/15 ${className}`}
        type="text"
        {...props}
      />
      <button
        onClick={onSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-blue text-white border-none rounded-lg text-sm font-semibold font-sans cursor-pointer transition-colors duration-200 hover:bg-blue-dark"
      >
        {buttonText}
      </button>
    </div>
  );
};
