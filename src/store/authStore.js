import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // Initially logged out
  isAuthenticated: false,
  login: (email, role) => set({
    user: {
      id: '1',
      name: email.split('@')[0],
      email,
      role,
      avatar: 'https://ui-avatars.com/api/?name=' + email.split('@')[0]
    },
    isAuthenticated: true
  }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
