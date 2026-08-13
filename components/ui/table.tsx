import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Table({
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
      <table
        className={cn("w-full text-sm text-left", className)}
        {...props}
      />
    </div>
  );
}

export function THead({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500", className)}
      {...props}
    />
  );
}

export function TBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("divide-y divide-zinc-100", className)}
      {...props}
    />
  );
}

export function TR({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("transition-colors hover:bg-zinc-50", className)}
      {...props}
    />
  );
}

export function TH({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn("px-4 py-3 font-semibold", className)}
      {...props}
    />
  );
}

export function TD({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("px-4 py-3 text-zinc-700", className)}
      {...props}
    />
  );
}
