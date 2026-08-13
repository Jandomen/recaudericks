import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Falta la variable de entorno MONGODB_URI.");
  process.exit(1);
}

const SEED_USERS = [
  {
    name: "Administrador",
    email: "admin@fruteria.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Cajero de Prueba",
    email: "cajero@fruteria.com",
    password: "cajero123",
    role: "cajero",
  },
];

const SEED_CATEGORIES = ["Frutas", "Verduras", "Hortalizas", "Otros"];

const SEED_PRODUCTS = [
  { name: "Manzana Roja", category: "Frutas", price: 32, unit: "kg", stock: 25 },
  { name: "Plátano Tabasco", category: "Frutas", price: 18, unit: "kg", stock: 30 },
  { name: "Naranja", category: "Frutas", price: 15, unit: "kg", stock: 40 },
  { name: "Limón", category: "Frutas", price: 28, unit: "kg", stock: 20 },
  { name: "Aguacate", category: "Frutas", price: 60, unit: "kg", stock: 15 },
  { name: "Mango Ataulfo", category: "Frutas", price: 45, unit: "kg", stock: 12 },
  { name: "Fresas", category: "Frutas", price: 55, unit: "kg", stock: 10 },
  { name: "Sandía", category: "Frutas", price: 14, unit: "kg", stock: 18 },
  { name: "Melón", category: "Frutas", price: 22, unit: "kg", stock: 12 },
  { name: "Plátano Macho", category: "Frutas", price: 20, unit: "kg", stock: 16 },
  { name: "Tomate", category: "Verduras", price: 25, unit: "kg", stock: 18 },
  { name: "Jitomate", category: "Verduras", price: 22, unit: "kg", stock: 20 },
  { name: "Papa", category: "Verduras", price: 22, unit: "kg", stock: 35 },
  { name: "Cebolla", category: "Verduras", price: 20, unit: "kg", stock: 28 },
  { name: "Zanahoria", category: "Verduras", price: 18, unit: "kg", stock: 22 },
  { name: "Chayote", category: "Verduras", price: 15, unit: "kg", stock: 16 },
  { name: "Chile Jalapeño", category: "Verduras", price: 30, unit: "kg", stock: 10 },
  { name: "Lechuga", category: "Verduras", price: 12, unit: "pza", stock: 24 },
  { name: "Cilantro", category: "Hortalizas", price: 8, unit: "atado", stock: 30 },
  { name: "Espinaca", category: "Hortalizas", price: 15, unit: "atado", stock: 20 },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const now = new Date();

  const users = db.collection("users");
  for (const user of SEED_USERS) {
    const hash = await bcrypt.hash(user.password, 10);
    const result = await users.updateOne(
      { email: user.email },
      {
        $setOnInsert: {
          name: user.name,
          email: user.email,
          password: hash,
          role: user.role,
          active: true,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true }
    );
    console.log(
      result.upsertedCount > 0
        ? `Usuario creado: ${user.email} (${user.role})`
        : `Usuario ya existia: ${user.email}`
    );
  }

  const categories = db.collection("categories");
  const categoryIds = {};
  for (const name of SEED_CATEGORIES) {
    const doc = await categories.findOneAndUpdate(
      { name },
      { $setOnInsert: { name, createdAt: now, updatedAt: now } },
      { upsert: true, returnDocument: "after" }
    );
    categoryIds[name] = doc._id;
    console.log(`Categoria asegurada: ${name}`);
  }

  const products = db.collection("products");
  for (const product of SEED_PRODUCTS) {
    const result = await products.updateOne(
      { name: product.name },
      {
        $setOnInsert: {
          name: product.name,
          categoryId: categoryIds[product.category],
          price: Math.round(product.price * 100),
          unit: product.unit,
          active: true,
          stock: product.stock,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true }
    );
    if (result.upsertedCount > 0) {
      console.log(`Producto creado: ${product.name}`);
    }
  }

  const counts = {
    usuarios: await users.countDocuments(),
    categorias: await categories.countDocuments(),
    productos: await products.countDocuments(),
  };
  console.log("Seed completado:", counts);

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error("Error en el seed:", error);
  process.exit(1);
});
