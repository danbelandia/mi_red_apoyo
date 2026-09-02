import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import AlertHistory from './pages/AlertHistory';
import Contacts from './pages/Contacts';
import AdminDashboard from './pages/AdminDashboard';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/home" />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <IonRouterOutlet>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={isAdmin ? '/admin' : '/home'} /> : <Login />}
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/alerts"
        element={
          <PrivateRoute>
            <AlertHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <PrivateRoute>
            <Contacts />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? (isAdmin ? '/admin' : '/home') : '/login'} />} />
    </IonRouterOutlet>
  );
}

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
}
