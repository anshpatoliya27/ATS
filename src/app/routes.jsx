/**
 * Centralized route configuration.
 * All application routes are defined here for easy management.
 */
import { Navigate } from 'react-router-dom';

import { AdminDashboard, HRDashboard, VendorDashboard, HiringManagerDashboard } from '@/features/dashboard';
import { VendorList } from '@/features/vendors';
import { JobList } from '@/features/jobs';
import { CandidateList, Pipeline } from '@/features/candidates';
import { Interviews } from '@/features/interviews';
import { Reports } from '@/features/reports';
import { Settings } from '@/features/settings';

/**
 * Returns the correct dashboard component based on the user's role.
 */
export function getDashboardByRole(role) {
  switch (role) {
    case 'Admin':
      return <AdminDashboard />;
    case 'HR':
      return <HRDashboard />;
    case 'Vendor':
      return <VendorDashboard />;
    default:
      return <HiringManagerDashboard />;
  }
}

/**
 * Application routes (used inside <Routes>).
 * Each route has: path, element, and optional metadata.
 */
export const APP_ROUTES = [
  { path: '/vendors', element: <VendorList /> },
  { path: '/jobs', element: <JobList /> },
  { path: '/candidates', element: <CandidateList /> },
  { path: '/pipeline', element: <Pipeline /> },
  { path: '/interviews', element: <Interviews /> },
  { path: '/reports', element: <Reports /> },
  { path: '/settings', element: <Settings /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
