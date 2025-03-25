import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserIdState {
  userid: string;
  setUserid: (characterid: string) => void;
  clearuserid: () => void;
}

const useUseridStore = create<UserIdState>()(
  persist(
    (set) => ({
        userid: "",
        setUserid: (userid: string) => set({ userid }),
        clearuserid: () => set({ userid: "" }),
    }),
    {
      name: "user-id", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUseridStore;
