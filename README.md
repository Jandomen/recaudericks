# 🍉 Frutería POS

Sistema de **punto de venta** para fruterías: cobro rápido, catálogo de productos, control de inventario, compras, caja y reportes de ventas.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-9-green?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Estado-En%20desarrollo-yellow)

## 🌱 Descripción

Aplicación web pensada para el mostrador de una frutería: el cajero abre el punto de venta, agrega productos al ticket 🧾 y cobra en segundos ⚡. El administrador administra el catálogo 🛒, los proveedores 🚚 y revisa las ventas del día 📊.

## 🧩 Módulos

| Módulo | Ruta | Estado |
| --- | --- | --- |
| 🛒 Punto de venta | `/pos` | Pendiente |
| 🏠 Panel / inicio | `/dashboard` | ✅ Listo |
| 🍎 Productos y catálogo | `/productos` | ✅ Listo |
| 📦 Inventario y mermas | `/inventario` | Pendiente |
| 🚚 Compras | `/compras` | Pendiente |
| 🤝 Proveedores | `/proveedores` | Pendiente |
| 📊 Ventas y reportes | `/ventas` | Pendiente |
| 💰 Caja | `/caja` | Pendiente |
| 👥 Usuarios y permisos | `/usuarios` | Pendiente |
| ⚙️ Configuración | `/configuracion` | Pendiente |

## 🛠️ Stack

- **Framework**: Next.js 16 (App Router, Server Components, Server Actions)
- **Lenguaje**: TypeScript
- **Base de datos**: MongoDB con Mongoose 9
- **Autenticación**: Sesiones JWT (Jose) en cookie `httpOnly` + bcryptjs
- **Validación**: Zod 4
- **Estilos**: Tailwind CSS 4

## 📋 Requisitos

- Node.js 20 o superior
- Una base de datos **MongoDB** (Atlas o local)

## 🚀 Puesta en marcha

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Configurar variables de entorno

Llena los valores en el archivo `.env` (crea el archivo si no existe):

| Variable | Descripción |
| --- | --- |
| `MONGODB_URI` | Connection string de MongoDB (`mongodb+srv://usuario:pass@cluster.mongodb.net/fruteria`) |
| `SESSION_SECRET` | Secreto para firmar las sesiones. Genera uno con `openssl rand -base64 32` |

### 3️⃣ Cargar datos de prueba

```bash
npm run seed
```

Crea usuarios, categorías y un catálogo de 20 productos de frutería. El script es **idempotente**: puedes ejecutarlo todas las veces que quieras.

### 4️⃣ Iniciar el servidor

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) 🌐

## 🔐 Usuarios de prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| 👑 Administrador | `admin@fruteria.com` | `admin123` |
| 🧑‍🌾 Cajero | `cajero@fruteria.com` | `cajero123` |

> 💡 Si la base de datos está vacía, el primer inicio de sesión crea automáticamente al administrador.

## ⚙️ Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Revisión de ESLint |
| `npm run seed` | Carga datos de prueba en MongoDB |

## 📁 Estructura del proyecto

```
fruteria-pos/
├── actions/           # Server Actions (mutaciones con validación)
├── app/
│   ├── (auth)/        # Login y autenticación
│   ├── (dashboard)/   # Páginas del sistema
│   └── api/           # API routes
├── components/
│   ├── layout/        # Sidebar, header, shell
│   ├── products/      # Componentes del módulo de productos
│   └── ui/            # Componentes base (botones, tablas, inputs)
├── constants/         # Roles, unidades, métodos de pago
├── hooks/             # Hooks de carrito y POS
├── lib/               # Conexión, sesión, utilidades
├── models/            # Esquemas de Mongoose
├── scripts/           # Scripts de seed
├── services/          # Capa de acceso a datos
├── types/             # Tipos compartidos
└── proxy.ts           # Middleware de protección de rutas
```

## 🔒 Notas de seguridad

- Las contraseñas se guardan con `bcryptjs`.
- La sesión viaja en una cookie `httpOnly` firmada con JWT.
- Las rutas privadas están protegidas por `proxy.ts` y, en cada mutación, se verifica el rol del usuario (`lib/permissions.ts`).
- Los precios se almacenan en **centavos** (enteros) para evitar errores de punto flotante.
- `MONGODB_URI` y `SESSION_SECRET` viven solo en `.env` (ignorado por git).

## 🗺️ Roadmap

- [ ] 🛒 Pantalla de punto de venta (grid de productos, carrito, cobro y ticket)
- [ ] 📦 Inventario con movimientos y mermas
- [ ] 🚚 Compras y proveedores
- [ ] 💰 Caja (apertura/cierre y arqueo)
- [ ] 📊 Reportes de ventas del día
- [ ] 👥 Gestión de usuarios y permisos
