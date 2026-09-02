import api from './api';

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export interface User {
  id: number;
  rut: string;
  name: string;
  email: string;
  role: string;
  phone: string;
}

class AuthService {
  async login(rut: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', { rut, password });
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser(): { id: number; name: string; role: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'ADMIN';
  }

  async getProfile(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  }
}

export default new AuthService();
