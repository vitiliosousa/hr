'use client'
import { useState, InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FloatingLabelPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingLabelPasswordInput({
  label,
  onFocus,
  onBlur,
  value = '',
  className = '',
  ...props
}: FloatingLabelPasswordProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!inputValue) setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`w-full h-11 border border-gray-200 rounded-xl px-3 text-xs pt-2 focus:outline-none focus:border-black transition pr-8 ${className}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <label
        className={`absolute left-2 transition-all duration-200 ease-in-out pointer-events-none ${
          isFocused || inputValue
            ? 'top-0 text-xs bg-white px-1 -translate-y-1/2 text-black'
            : 'top-1/2 text-xs -translate-y-1/2 text-gray-400'
        }`}
      >
        {label}
      </label>
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOff className="h-6 w-6 text-black"/>
        ) : (
          <Eye className="h-6 w-6 text-black"/>
        )}
      </button>
    </div>
  );
}