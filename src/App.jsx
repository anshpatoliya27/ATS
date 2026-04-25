import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { AppLayout } from '@/components/layout/AppLayout';

import { Login } from '@/pages/Login';
import { AdminDashboard } from '@/pages/dashboard/AdminDashboard';
import { HRDashboard } from '@/pages/dashboard/HRDashboard';
import { VendorDashboard } from '@/pages/dashboard/VendorDashboard';
import { HiringManagerDashboard } from '@/pages/dashboard/HiringManagerDashboard';

import { VendorList } from '@/pages/vendors/VendorList';
import { JobList } from '@/pages/jobs/JobList';
import { CandidateList } from '@/pages/candidates/CandidateList';
import { Pipeline } from '@/pages/candidates/Pipeline';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Login />;
  }

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={
            user.role === 'Admin' ? <AdminDashboard /> :
            user.role === 'HR' ? <HRDashboard /> :
            user.role === 'Vendor' ? <VendorDashboard /> :
            <HiringManagerDashboard />
          } />
          
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/pipeline" element={<Pipeline />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
