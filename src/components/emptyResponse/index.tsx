"use client";

import { EmptyStateProps } from "@//types/manyType";
import Image from "next/image";


export function EmptyState({
  title,
  description,
  image,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4 p-6">
      <Image
        src={image}
        alt="Estado vazio"
        width={500}
        height={500}
        className="opacity-80 relative top-20"
      />

      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-500 max-w-md">
        {description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
