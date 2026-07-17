export interface User {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  first_name?: string;
  last_name?: string;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  last_login?: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: 'admin' | 'manager' | 'user';
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  role?: 'admin' | 'manager' | 'user';
  is_active?: boolean;
  password?: string;
}