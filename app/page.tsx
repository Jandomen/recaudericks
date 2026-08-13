import Link from "next/link";

const features = [
  {
    icon: "🛒",
    title: "Punto de venta",
    description:
      "Cobra rápido con un punto de venta pensado para el mostrador de tu frutería.",
  },
  {
    icon: "📦",
    title: "Inventario en tiempo real",
    description:
      "Controla existencias y mermas para saber siempre qué tienes y qué falta.",
  },
  {
    icon: "💰",
    title: "Caja y ventas",
    description:
      "Abre y cierra caja, lleva el arqueo y consulta reportes de ventas diarias.",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-svh flex-col bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-xl">
            🍉
          </div>
          <span className="text-lg font-semibold text-zinc-900">
            Frutería POS
          </span>
        </div>
        <Link
          href="/login"
          className="rounded-md border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
        >
          Iniciar sesión
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <span className="mb-4 rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-medium text-green-700">
          🥑 Todo tu negocio en un solo lugar
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Tu frutería, organizada y{" "}
          <span className="text-green-600">al día</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-500">
          Vende, controla tu inventario y lleva la caja de tu frutería desde
          cualquier dispositivo.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white transition-colors hover:bg-green-700"
          >
            Comenzar ahora
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-300 bg-white px-8 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Entrar al panel
          </Link>
        </div>

        <div className="pointer-events-none mt-12 flex select-none items-center justify-center gap-6 text-5xl opacity-80 sm:text-6xl">
          <span>🍎</span>
          <span>🍌</span>
          <span>🍇</span>
          <span>🍊</span>
          <span>🍓</span>
          <span>🥭</span>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-2xl">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-zinc-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Frutería POS
      </footer>
    </main>
  );
}
