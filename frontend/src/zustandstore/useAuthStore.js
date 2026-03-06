import { create } from 'zustand';

// global state to keep track of whether the user is logged in and their userId
export const useAuthStore = create((set) => ({
  
  // checks localStorage if the user has been logged in previously when the app loads.
  isLoggedIn: !!localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId') || null,
  
  // saves the token and userId in localStorage so they survive a page refresh -> updates the global state 
  login: (accessToken, userId) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    set({ isLoggedIn: true, userId });
  },
  
  // logout clears everything from localStorage and resets the global state
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    set({ isLoggedIn: false, userId: null });
  }
}));