import type { Role } from "@/constants/roles";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionPayload {
  userId: string;
  role: Role;
  name: string;
  email: string;
}

export interface LoginState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}
