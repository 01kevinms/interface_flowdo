// components/ui/ActionButton.tsx
"use client";

import { ReactNode } from "react";

type ActionButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

export function ActionButton({
  children,
  onClick,
  className = "",
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2
        bg-blue-500 text-white
        h-10 px-3 rounded-md
        transition-all duration-300
        hover:scale-105
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}
