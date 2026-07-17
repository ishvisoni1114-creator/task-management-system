import { User } from './user.model';

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ChangePassword {
  current_password: string;
  new_password: string;
}