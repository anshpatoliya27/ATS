import { Shield, Users, Briefcase, BarChart3 } from 'lucide-react';

/**
 * Application role definitions.
 * Used for login, route guards, and sidebar filtering.
 */
export const ROLES = {
  ADMIN: 'Admin',
  HR: 'HR',
  VENDOR: 'Vendor',
  HIRING_MANAGER: 'Hiring Manager',
};

/**
 * Role metadata for the login screen.
 */
export const ROLE_OPTIONS = [
  { value: ROLES.ADMIN, label: 'Admin', icon: Shield, desc: 'Full system access', color: 'from-violet-500 to-purple-600' },
  { value: ROLES.HR, label: 'HR', icon: Users, desc: 'Manage jobs & candidates', color: 'from-blue-500 to-blue-600' },
  { value: ROLES.VENDOR, label: 'Vendor', icon: Briefcase, desc: 'Submit candidates', color: 'from-amber-500 to-orange-600' },
  { value: ROLES.HIRING_MANAGER, label: 'Hiring Manager', icon: BarChart3, desc: 'Review & approve', color: 'from-emerald-500 to-teal-600' },
];
