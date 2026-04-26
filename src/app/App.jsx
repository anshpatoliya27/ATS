import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { AppLayout } from '@/components/layout';
import { ToastNotification } from '@/components/ui';
import { LoginPage } from '@/features/auth';
import { APP_ROUTES, getDashboardByRole } from './routes';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={getDashboardByRole(user.role)} />
          
          {APP_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </AppLayout>
      <ToastNotification />
    </Router>
  );
}

export default App;
