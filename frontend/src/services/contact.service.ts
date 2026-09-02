import api from './api';

export interface SupportContact {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string | null;
  createdAt: string;
}

class ContactService {
  async findAll(): Promise<SupportContact[]> {
    const { data } = await api.get<SupportContact[]>('/support-contacts');
    return data;
  }
}

export default new ContactService();
