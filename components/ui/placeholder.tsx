export function Placeholder({
  title,
  description,
  icon = "🚧",
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-3xl">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">{description}</p>
    </div>
  );
}
