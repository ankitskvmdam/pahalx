import { create } from "zustand";
import { User } from "@/app/_api/model/user";
import { useShallow } from "zustand/shallow";

export type TAppStoreState = {
  user: User | null;
  authState: "authenticated" | "unauthenticated" | "pending";
};

export type TAppStoreActions = {
  setUser: (user: User | null) => void;
  setAuthState: (
    authState: "authenticated" | "unauthenticated" | "pending"
  ) => void;
};

type TAppStore = TAppStoreState & TAppStoreActions;

const useStore = create<TAppStore>((set) => ({
  user: null,
  authState: "pending",
  setUser: (user) => set({ user }),
  setAuthState: (authState) => set({ authState }),
}));

export function useAppStore<T>(selector: (state: TAppStore) => T): T {
  return useStore(useShallow(selector));
}
