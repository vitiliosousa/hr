"use client";
import { useState, InputHTMLAttributes } from "react";

interface FloatingLabelInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingLabelInput({
  label,
  onFocus,
  onBlur,
  value = "",
  className = "",
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!inputValue) setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="relative w-full" suppressHydrationWarning>
      <input
        {...props}
        className={`w-full h-11 border border-gray-200 rounded-xl px-3 text-xs pt-2 focus:outline-none focus:border-black transition ${className}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <label
        className={`absolute left-2 transition-all duration-200 ease-in-out pointer-events-none ${
          isFocused || inputValue
            ? "top-0 text-xs bg-white px-1 -translate-y-1/2 text-blackish"
            : "top-1/2 text-xs -translate-y-1/2 text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
