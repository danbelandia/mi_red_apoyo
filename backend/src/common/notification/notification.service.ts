import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  sendEmergencyNotification(alert: any): void {
    console.log(
      `[NOTIFICACIÓN] Emergencia enviada para usuario ID ${alert.userId} - Tipo: ${alert.type} - ${new Date().toISOString()}`,
    );
  }

  sendSupportNotification(alert: any): void {
    console.log(
      `[NOTIFICACIÓN] Solicitud de ayuda enviada para usuario ID ${alert.userId} - Tipo: ${alert.type} - ${new Date().toISOString()}`,
    );
  }
}
