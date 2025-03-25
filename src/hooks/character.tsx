import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CharacterState {
  characterid: string;
  setCharacterid: (characterid: string) => void;
  clearCharacterid: () => void;
}

const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      characterid: "",
      setCharacterid: (characterid: string) => set({ characterid }),
      clearCharacterid: () => set({ characterid: "" }),
    }),
    {
      name: "character-storage", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCharacterStore;
