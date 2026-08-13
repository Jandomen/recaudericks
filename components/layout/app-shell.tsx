"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Header } from "@/components/layout/header";
import type { User } from "@/types/user";

export function AppShell({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-svh bg-zinc-50">
      <Sidebar user={user} className="hidden lg:flex" />
      <MobileNav
        user={user}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="lg:pl-64">
        <Header user={user} onMenuClick={() => setMenuOpen(true)} />
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
