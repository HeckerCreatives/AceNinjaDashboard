import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CharacterUsernameState {
  playername: string;
  setPlayername: (characterid: string) => void;
  clearPlayername: () => void;
}

const usePlayerNameStore = create<CharacterUsernameState>()(
  persist(
    (set) => ({
      playername: "",
      setPlayername: (playername: string) => set({ playername }),
      clearPlayername: () => set({ playername: "" }),
    }),
    {
      name: "player-name", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePlayerNameStore;
