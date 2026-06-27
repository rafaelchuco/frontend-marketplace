export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number | string;
  descripcion?: string;
  ImageUrl?: string | null;
  CategoryId?: number | null;
  Category?: Category | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface AuthData {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
