import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonPage, IonContent,
  IonButton, IonInput, IonItem, IonLabel, IonText, IonLoading
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(rut, password);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch {
      setError('RUT o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-page">
        <div className="login-card">
          <h1 className="login-title">Mi Red de Apoyo</h1>
          <p className="login-subtitle">Iniciar sesión</p>

          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="floating">RUT</IonLabel>
              <IonInput
                value={rut}
                onIonInput={(e) => setRut(e.target.value as string)}
                placeholder="Ej: 11111111-1"
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonInput={(e) => setPassword(e.target.value as string)}
                placeholder="Tu contraseña"
                required
              />
            </IonItem>

            {error && (
              <IonText color="danger" className="error-message">
                <p>{error}</p>
              </IonText>
            )}

            <IonButton expand="block" type="submit" color="primary" size="large" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </IonButton>
          </form>
        </div>
        <IonLoading isOpen={loading} message="Iniciando sesión..." />
      </IonContent>
    </IonPage>
  );
}
