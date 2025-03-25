import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CharacterUsernameState {
  charactername: string;
  setCharactername: (characterid: string) => void;
  clearCharactername: () => void;
}

const useCharacterNameStore = create<CharacterUsernameState>()(
  persist(
    (set) => ({
      charactername: "",
      setCharactername: (charactername: string) => set({ charactername }),
      clearCharactername: () => set({ charactername: "" }),
    }),
    {
      name: "character-name", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCharacterNameStore;
