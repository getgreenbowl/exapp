import { create } from 'zustand';

interface AuthState {
  authenticated: boolean;
  changeAuthentication: (val: boolean) => void;
}

export const authStore = create<AuthState>((set) => ({
  authenticated: false,
  changeAuthentication: (value: boolean) =>
    set((state) => ({ authenticated: value || false })),
}));
