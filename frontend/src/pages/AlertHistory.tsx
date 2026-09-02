import { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
  IonBackButton, IonButtons, IonCard, IonCardContent, IonLoading
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import alertService, { type Alert } from '../services/alert.service';

const statusLabels: Record<string, string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En proceso',
  RESOLVED: 'Atendida',
  CANCELLED: 'Cancelada',
};

const statusColors: Record<string, string> = {
  PENDING: 'status-pending',
  IN_PROGRESS: 'status-progress',
  RESOLVED: 'status-resolved',
  CANCELLED: 'status-cancelled',
};

export default function AlertHistory() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      alertService.findByUserId(user.id).then((data) => {
        setAlerts(data);
        setLoading(false);
      });
    }
  }, [user]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr.includes('Z') ? dateStr : dateStr + 'Z');
    return d.toLocaleDateString('es-CL') + ' - ' + d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Volver" />
          </IonButtons>
          <IonTitle>Mis Alertas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading isOpen={loading} message="Cargando alertas..." />
        {!loading && alerts.length === 0 && (
          <div className="empty-state">
            <p>No tienes alertas registradas.</p>
          </div>
        )}
        {!loading && alerts.length > 0 && (
          <div className="alert-list">
            {alerts.map((alert) => (
              <IonCard key={alert.id} className={`alert-card ${alert.type === 'RED' ? 'alert-red' : 'alert-yellow'}`}>
                <IonCardContent>
                  <div className="alert-header">
                    <span className="alert-type-icon">
                      {alert.type === 'RED' ? '🚨' : '🟡'}
                    </span>
                    <span className="alert-type-label">
                      {alert.type === 'RED' ? 'Emergencia' : 'Solicitud de ayuda'}
                    </span>
                  </div>
                  <p className="alert-date">{formatDate(alert.createdAt)}</p>
                  <p className="alert-message">{alert.message}</p>
                  <span className={`alert-status ${statusColors[alert.status]}`}>
                    {statusLabels[alert.status]}
                  </span>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
