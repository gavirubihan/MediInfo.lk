import React from 'react';

export type BadgeVariant = 'blue' | 'teal' | 'red' | 'amber' | 'hero' | 'outline' | 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '', ...props }) => {
  // Base classes for standard badges
  const baseClasses = "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide font-sans";
  
  const variantClasses = {
    'default': 'bg-light-gray text-dark-gray',
    'blue': 'bg-blue-light text-blue',
    'teal': 'bg-teal text-white',
    'red': 'bg-[#FFF0F0] text-red border border-red',
    'amber': 'bg-[#FFF8E8] text-[#B87A00]',
    'outline': 'bg-white/15 text-white border border-white/30',
    // Hero badge has its own distinct base styles
    'hero': 'bg-blue-light text-blue border border-[rgba(26,111,191,0.2)] text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5',
  };

  const finalClassName = variant === 'hero' 
    ? `${variantClasses.hero} ${className}` 
    : `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <span className={finalClassName} {...props}>
      {children}
    </span>
  );
};
