import { create } from 'zustand';
import { MOCK_VENDORS, MOCK_JOBS, MOCK_CANDIDATES, MOCK_NOTIFICATIONS } from '@/services/mockData';
import { useUIStore } from './uiStore';

/**
 * Data Store — manages core application data (vendors, jobs, candidates, notifications).
 * Mock data is loaded from @/services/mockData.
 * Toast functionality is delegated to uiStore but exposed here for backward compatibility.
 */
export const useDataStore = create((set, get) => ({
  vendors: MOCK_VENDORS,
  jobs: MOCK_JOBS,
  candidates: MOCK_CANDIDATES,
  notifications: MOCK_NOTIFICATIONS,

  // ─── Toast (delegates to uiStore for backward compatibility) ────────
  get toast() { return useUIStore.getState().toast; },
  showToast: (message, type = 'success') => useUIStore.getState().showToast(message, type),
  clearToast: () => useUIStore.getState().clearToast(),

  // ─── Job CRUD ───────────────────────────────────────────────────────
  addJob: (job) => set((state) => {
    const newJob = {
      ...job,
      id: 'j' + (state.jobs.length + 1) + '_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    return { jobs: [...state.jobs, newJob] };
  }),
  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map(j => j.id === jobId ? { ...j, ...updates } : j)
  })),
  deleteJob: (jobId) => set((state) => ({
    jobs: state.jobs.filter(j => j.id !== jobId)
  })),

  // ─── Candidate Operations ──────────────────────────────────────────
  addCandidate: (candidate) => set((state) => {
    const newCandidate = {
      ...candidate,
      id: 'c' + (state.candidates.length + 1) + '_' + Date.now(),
      submittedAt: new Date().toISOString().split('T')[0],
      stage: 'Submitted',
    };
    return { candidates: [...state.candidates, newCandidate] };
  }),
  updateCandidateStage: (candidateId, stage) => set((state) => ({
    candidates: state.candidates.map(c => c.id === candidateId ? { ...c, stage } : c)
  })),

  // ─── Vendor Operations ─────────────────────────────────────────────
  addVendor: (vendor) => set((state) => {
    const newVendor = {
      ...vendor,
      id: 'v' + (state.vendors.length + 1) + '_' + Date.now(),
      performanceScore: 0,
      activeJobs: 0,
      totalSubmissions: 0,
    };
    return { vendors: [...state.vendors, newVendor] };
  }),
  updateVendor: (vendorId, updates) => set((state) => ({
    vendors: state.vendors.map(v => v.id === vendorId ? { ...v, ...updates } : v)
  })),

  // ─── Notification Operations ───────────────────────────────────────
  markNotificationRead: (notifId) => set((state) => ({
    notifications: state.notifications.map(n => n.id === notifId ? { ...n, read: true } : n)
  })),
  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
}));
