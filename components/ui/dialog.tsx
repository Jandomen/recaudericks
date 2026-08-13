"use client";

import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-900/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl",
          className
        )}
      >
        {title && (
          <h3 className="mb-4 text-lg font-semibold text-zinc-900">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
}
