import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonModal, IonToast,
  IonLoading, IonIcon
} from '@ionic/react';
import { alertCircle, helpCircle, list, call, logOut } from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';
import alertService from '../services/alert.service';

type Step = 'home' | 'yellow-confirm' | 'yellow-options' | 'red-confirm' | 'sent' | 'error';

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('home');
  const [alertType, setAlertType] = useState<'RED' | 'YELLOW'>('YELLOW');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const yellowOptions = [
    { icon: '💊', label: 'Necesito medicamentos', value: 'Necesito medicamentos' },
    { icon: '👤', label: 'Necesito una visita', value: 'Necesito una visita' },
    { icon: '❓', label: 'Otra ayuda', value: 'Otra ayuda' },
  ];

  const yellowDefault = 'Comuníquense conmigo a la brevedad.';
  const redMessage = 'Necesito ayuda urgente';

  const getLocation = (): Promise<{ latitude: number; longitude: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => resolve(null),
        { timeout: 5000 }
      );
    });
  };

  const sendAlert = async (type: 'RED' | 'YELLOW', message: string) => {
    setLoading(true);
    try {
      const location = await getLocation();
      await alertService.create({
        userId: user!.id,
        type,
        message,
        ...location,
      });
      setToastColor('success');
      setToastMessage(type === 'RED' ? 'Alerta de emergencia enviada' : 'Solicitud de ayuda enviada');
      setShowToast(true);
      setStep('sent');
    } catch {
      setToastColor('danger');
      setToastMessage('Error al enviar la alerta');
      setShowToast(true);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handleYellowPress = () => {
    setAlertType('YELLOW');
    setStep('yellow-options');
  };

  const handleRedPress = () => {
    setAlertType('RED');
    setStep('red-confirm');
  };

  const handleYellowSelect = (message: string) => {
    setSelectedMessage(message);
    setStep('yellow-confirm');
  };

  const handleConfirmYellow = () => {
    sendAlert('YELLOW', selectedMessage || yellowDefault);
  };

  const handleConfirmRed = () => {
    sendAlert('RED', redMessage);
  };

  const renderContent = () => {
    // Pantalla de confirmación de emergencia
    if (step === 'red-confirm') {
      return (
        <IonModal isOpen={true} onDidDismiss={() => setStep('home')}>
          <IonHeader>
            <IonToolbar color="danger">
              <IonTitle>EMERGENCIA</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="confirm-screen red">
              <div className="confirm-icon">⚠️</div>
              <h2>EMERGENCIA</h2>
              <p className="confirm-text">
                ¿Estás seguro de que necesitas ayuda urgente?
              </p>
              <p className="confirm-subtext">
                Tu ubicación será enviada a tu red de apoyo.
              </p>
              <div className="confirm-actions">
                <IonButton expand="block" color="medium" size="large" onClick={() => setStep('home')}>
                  CANCELAR
                </IonButton>
                <IonButton expand="block" color="danger" size="large" onClick={handleConfirmRed} disabled={loading}>
                  {loading ? 'Enviando...' : 'SÍ, NECESITO AYUDA'}
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>
      );
    }

    // Opciones de ayuda amarilla
    if (step === 'yellow-options') {
      return (
        <IonContent className="page">
          <div className="options-screen">
            <h2>¿Necesitas ayuda?</h2>
            <p className="options-subtitle">Puedes solicitar:</p>
            <div className="options-list">
              {yellowOptions.map((opt) => (
                <IonButton
                  key={opt.value}
                  expand="block"
                  fill="outline"
                  size="large"
                  className="btn-option"
                  onClick={() => handleYellowSelect(opt.value)}
                >
                  <span className="option-icon">{opt.icon}</span>
                  {opt.label}
                </IonButton>
              ))}
            </div>
            <IonButton expand="block" color="medium" onClick={() => setStep('home')}>
              Volver
            </IonButton>
          </div>
        </IonContent>
      );
    }

    // Confirmación de ayuda amarilla
    if (step === 'yellow-confirm') {
      return (
        <IonContent className="page">
          <div className="confirm-screen yellow">
            <div className="confirm-icon">🟡</div>
            <h2>Confirmar solicitud</h2>
            <p className="confirm-text">
              Vas a solicitar ayuda: <strong>{selectedMessage}</strong>
            </p>
            <div className="confirm-actions">
              <IonButton expand="block" color="medium" size="large" onClick={() => setStep('yellow-options')}>
                VOLVER
              </IonButton>
              <IonButton expand="block" color="warning" size="large" onClick={handleConfirmYellow} disabled={loading}>
                {loading ? 'Enviando...' : 'SOLICITAR AYUDA'}
              </IonButton>
            </div>
          </div>
        </IonContent>
      );
    }

    // Confirmación de envío
    if (step === 'sent') {
      const isRed = alertType === 'RED';
      return (
        <IonContent className="page">
          <div className="sent-screen">
            <div className="sent-icon">{isRed ? '🚨' : '✅'}</div>
            <h2>{isRed ? 'ALERTA ENVIADA' : 'SOLICITUD ENVIADA'}</h2>
            <p className="sent-text">
              {isRed
                ? 'Tu solicitud de emergencia ha sido registrada. Tu red de apoyo recibirá tu ubicación.'
                : 'Solicitud enviada. Una persona de tu red de apoyo se comunicará contigo a la brevedad.'}
            </p>
            <IonButton expand="block" color="primary" size="large" onClick={() => setStep('home')}>
              VOLVER
            </IonButton>
          </div>
        </IonContent>
      );
    }

    // Error
    if (step === 'error') {
      return (
        <IonContent className="page">
          <div className="error-screen">
            <div className="error-icon">❌</div>
            <h2>Error al enviar</h2>
            <p>No se pudo enviar la alerta. Intenta nuevamente.</p>
            <IonButton expand="block" color="primary" size="large" onClick={() => setStep('home')}>
              VOLVER
            </IonButton>
          </div>
        </IonContent>
      );
    }

    // Pantalla principal
    return (
      <IonContent className="home-page">
        <main className="home-content">
          <p className="greeting">Hola, {user?.name}</p>
          <p className="question">¿Cómo podemos ayudarte?</p>

          <div className="home-buttons">
            <IonButton expand="block" color="warning" size="large" className="btn-yellow-custom" onClick={handleYellowPress}>
              <IonIcon icon={helpCircle} slot="start" />
              <div className="btn-text-container">
                <span className="btn-label">NECESITO AYUDA</span>
                <span className="btn-sublabel">Solicitar medicamentos o visita</span>
              </div>
            </IonButton>

            <IonButton expand="block" color="danger" size="large" className="btn-red-custom" onClick={handleRedPress}>
              <IonIcon icon={alertCircle} slot="start" />
              <div className="btn-text-container">
                <span className="btn-label">EMERGENCIA</span>
                <span className="btn-sublabel">NECESITO AYUDA URGENTE</span>
              </div>
            </IonButton>
          </div>

          <nav className="home-nav">
            <IonButton expand="block" fill="outline" onClick={() => navigate('/alerts')}>
              <IonIcon icon={list} slot="start" />
              Mis alertas
            </IonButton>
            <IonButton expand="block" fill="outline" onClick={() => navigate('/contacts')}>
              <IonIcon icon={call} slot="start" />
              Mis contactos
            </IonButton>
            <IonButton expand="block" fill="outline" color="danger" onClick={() => { logout(); navigate('/login'); }}>
              <IonIcon icon={logOut} slot="start" />
              Cerrar sesión
            </IonButton>
          </nav>
        </main>
      </IonContent>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Red de Apoyo</IonTitle>
        </IonToolbar>
      </IonHeader>
      {renderContent()}
      <IonLoading isOpen={loading} message="Enviando alerta..." />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        color={toastColor}
        duration={3000}
      />
    </IonPage>
  );
}
