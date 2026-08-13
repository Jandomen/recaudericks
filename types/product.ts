import type { Unit } from "@/constants/units";

export interface Category {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  price: number;
  unit: Unit;
  active: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormState {
  errors?: {
    name?: string[];
    categoryId?: string[];
    price?: string[];
    unit?: string[];
  };
  message?: string;
}
