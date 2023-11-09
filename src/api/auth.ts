import { LoginCredentials, RegisterCredentials } from '@/interfaces';
import api from '@/services/api';

export async function login(credentials: LoginCredentials) {
  const response = await api.post('/auth', credentials);
  return response.data;
};

export async function register(credentials: RegisterCredentials) {
  const response = await api.post('/user/', credentials);
  return response.data;
};