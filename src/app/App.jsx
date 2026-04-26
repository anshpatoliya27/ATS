import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { AppLayout } from '@/components/layout';
import { ToastNotification } from '@/components/ui';
import { LoginPage } from '@/features/auth';
import { LandingPage } from '@/features/landing';
import { APP_ROUTES, getDashboardByRole } from './routes';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      {!isAuthenticated || !user ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <>
          <AppLayout>
            <Routes>
              <Route path="/" element={getDashboardByRole(user.role)} />
              
              {APP_ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </AppLayout>
          <ToastNotification />
        </>
      )}
    </Router>
  );
}

export default App;
