import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ChangePasswordState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const usePasswordChangeStore = create<ChangePasswordState>()(
  persist(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
    }),
    {
      name: "password-change", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePasswordChangeStore;
