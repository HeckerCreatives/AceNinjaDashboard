import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: false, 
  openDialog: () => set((state) => ({ isOpen: !state.isOpen })),
  closeDialog: () => set({ isOpen: false }), 
}));

export default useDialogStore;
