import { create } from 'zustand';

interface AppState {
  departmentId: string | null;
  artist: string | null;
  medium: string | null;
  country: string | null;
  page: number;
  pageSize: number;
  loadAll: boolean;
  setDepartmentId: (id: string | null) => void;
  setArtist: (artist: string | null) => void;
  setMedium: (medium: string | null) => void;
  setCountry: (country: string | null) => void;
  setPage: (page: number) => void;
  setLoadAll: (loadAll: boolean) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  departmentId: null,
  artist: null,
  medium: null,
  country: null,
  page: 1,
  pageSize: 12,
  loadAll: false,
  setDepartmentId: (id) => set({ departmentId: id, page: 1, loadAll: false }),
  setArtist: (artist) => set({ artist, page: 1, loadAll: false }),
  setMedium: (medium) => set({ medium, page: 1, loadAll: false }),
  setCountry: (country) => set({ country, page: 1, loadAll: false }),
  setPage: (page) => set({ page }),
  setLoadAll: (loadAll) => set({ loadAll, page: 1 }),
  resetFilters: () => set({ departmentId: null, artist: null, medium: null, country: null, page: 1, loadAll: false }),
}));
