"use client";

import { Sidebar } from "@/components/layout/sidebar";
import type { User } from "@/types/user";

export function MobileNav({
  user,
  open,
  onClose,
}: {
  user: User | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <Sidebar user={user} onNavigate={onClose} />
    </div>
  );
}
