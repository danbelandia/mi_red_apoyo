import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonCard, IonCardContent, IonLoading, IonToast, IonIcon
} from '@ionic/react';
import { power } from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';
import alertService, { type Alert } from '../services/alert.service';

const statusLabels: Record<string, string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En proceso',
  RESOLVED: 'Atendida',
  CANCELLED: 'Cancelada',
};

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const loadAlerts = () => {
    alertService.findAll().then((data) => {
      setAlerts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const pending = alerts.filter((a) => a.status === 'PENDING');
  const emergencies = pending.filter((a) => a.type === 'RED');
  const helpRequests = pending.filter((a) => a.type === 'YELLOW');

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr.includes('Z') ? dateStr : dateStr + 'Z');
    return d.toLocaleDateString('es-CL') + ' ' + d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago' });
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    await alertService.updateStatus(id, newStatus);
    setToastMessage('Estado actualizado');
    setShowToast(true);
    loadAlerts();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Panel de Alertas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => { logout(); navigate('/login'); }}>
              <IonIcon icon={power} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={loading} message="Cargando alertas..." />
        <div className="ion-padding">
        {!loading && (
          <>
            <div className="admin-stats">
              <IonCard className="stat-card stat-pending">
                <IonCardContent>
                  <span className="stat-number">{pending.length}</span>
                  <span className="stat-label">Pendientes</span>
                </IonCardContent>
              </IonCard>
              <IonCard className="stat-card stat-red">
                <IonCardContent>
                  <span className="stat-number">{emergencies.length}</span>
                  <span className="stat-label">Emergencias</span>
                </IonCardContent>
              </IonCard>
              <IonCard className="stat-card stat-yellow">
                <IonCardContent>
                  <span className="stat-number">{helpRequests.length}</span>
                  <span className="stat-label">Solicitudes</span>
                </IonCardContent>
              </IonCard>
            </div>

            <h2 className="section-title">Alertas Recientes</h2>

            {alerts.length === 0 && (
              <div className="empty-state">
                <p>No hay alertas registradas.</p>
              </div>
            )}

            {alerts.length > 0 && (
              <div className="admin-alert-list">
                {alerts.map((alert) => (
                  <IonCard key={alert.id} className={`admin-alert-card ${alert.type === 'RED' ? 'border-red' : 'border-yellow'}`}>
                    <IonCardContent>
                      <div className="admin-alert-top">
                        <span className="admin-alert-type">
                          {alert.type === 'RED' ? '🚨 EMERGENCIA' : '🟡 AYUDA'}
                        </span>
                        <span className={`admin-alert-status status-${alert.status.toLowerCase()}`}>
                          {statusLabels[alert.status]}
                        </span>
                      </div>
                      <p className="admin-alert-user">
                        {alert.user ? alert.user.name : `Usuario ID: ${alert.userId}`}
                      </p>
                      <p className="admin-alert-date">{formatDate(alert.createdAt)}</p>
                      <p className="admin-alert-message">{alert.message}</p>
                      {alert.latitude && alert.longitude && (
                        <p className="admin-alert-location">
                          📍 {alert.latitude}, {alert.longitude}
                        </p>
                      )}

                      {alert.status === 'PENDING' && (
                        <div className="admin-alert-actions">
                          <IonButton expand="block" color="primary" size="small" onClick={() => handleStatusChange(alert.id, 'IN_PROGRESS')}>
                            Marcar en proceso
                          </IonButton>
                          <IonButton expand="block" color="success" size="small" onClick={() => handleStatusChange(alert.id, 'RESOLVED')}>
                            Marcar atendida
                          </IonButton>
                        </div>
                      )}

                      {alert.status === 'IN_PROGRESS' && (
                        <div className="admin-alert-actions">
                          <IonButton expand="block" color="success" size="small" onClick={() => handleStatusChange(alert.id, 'RESOLVED')}>
                            Marcar atendida
                          </IonButton>
                          <IonButton expand="block" color="medium" size="small" onClick={() => handleStatusChange(alert.id, 'CANCELLED')}>
                            Cancelar
                          </IonButton>
                        </div>
                      )}
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            )}
          </>
        )}
        </div>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        color="success"
        duration={2000}
      />
    </IonPage>
  );
}
