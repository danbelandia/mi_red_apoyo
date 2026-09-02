import api from './api';

export interface Alert {
  id: number;
  userId: number;
  type: 'RED' | 'YELLOW';
  message: string;
  latitude: number | null;
  longitude: number | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
    rut: string;
    phone: string;
    role: string;
  };
}

export interface CreateAlertDto {
  userId: number;
  type: 'RED' | 'YELLOW';
  message?: string;
  latitude?: number;
  longitude?: number;
}

class AlertService {
  async create(dto: CreateAlertDto): Promise<Alert> {
    const { data } = await api.post<Alert>('/alerts', dto);
    return data;
  }

  async findAll(): Promise<Alert[]> {
    const { data } = await api.get<Alert[]>('/alerts');
    return data;
  }

  async findById(id: number): Promise<Alert> {
    const { data } = await api.get<Alert>(`/alerts/${id}`);
    return data;
  }

  async findByUserId(userId: number): Promise<Alert[]> {
    const { data } = await api.get<Alert[]>(`/users/${userId}/alerts`);
    return data;
  }

  async updateStatus(id: number, status: string): Promise<Alert> {
    const { data } = await api.patch<Alert>(`/alerts/${id}/status`, { status });
    return data;
  }
}

export default new AlertService();
