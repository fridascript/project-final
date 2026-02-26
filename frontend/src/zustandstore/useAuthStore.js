import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId') || null,
  
  login: (accessToken, userId) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    set({ isLoggedIn: true, userId });
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    set({ isLoggedIn: false, userId: null });
  }
}));
