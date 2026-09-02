import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';
import { AlertStatus } from '../common/enums/alert-status.enum';
import { NotificationService } from '../common/notification/notification.service';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
    private notificationService: NotificationService,
  ) {}

  async create(data: {
    userId: number;
    type: any;
    message?: string;
    latitude?: number;
    longitude?: number;
  }): Promise<Alert> {
    const alert = this.alertsRepository.create(data);
    const saved = await this.alertsRepository.save(alert);

    if (data.type === 'RED') {
      this.notificationService.sendEmergencyNotification(saved);
    } else {
      this.notificationService.sendSupportNotification(saved);
    }

    return saved;
  }

  async findAll(): Promise<any[]> {
    const alerts = await this.alertsRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    return alerts.map((a) => this.sanitize(a));
  }

  async findById(id: number): Promise<Alert> {
    const alert = await this.alertsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!alert) {
      throw new NotFoundException('Alerta no encontrada');
    }
    return alert;
  }

  async findByUserId(userId: number): Promise<Alert[]> {
    return this.alertsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: number, status: AlertStatus): Promise<Alert> {
    const alert = await this.findById(id);
    alert.status = status;
    return this.alertsRepository.save(alert);
  }

  private sanitize(alert: Alert): any {
    const { user, ...rest } = alert as any;
    if (user) {
      const { password: _, ...safeUser } = user;
      return { ...rest, user: safeUser };
    }
    return rest;
  }
}
