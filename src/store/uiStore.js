import { create } from 'zustand';

/**
 * UI Store — manages transient UI state like toasts.
 * Separated from data store to keep concerns clean.
 */
export const useUIStore = create((set) => ({
  // Toast state
  toast: null,
  showToast: (message, type = 'success') => set({ toast: { message, type, id: Date.now() } }),
  clearToast: () => set({ toast: null }),
}));
