import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


interface WalletItem {
  type: string;
  amount: number;
}

interface InventoryItem {
  item: string;
  quantity: number;
  isEquipped: boolean;
  _id: string;
  acquiredAt: string;
}

interface InventoryCategory {
  type: string;
  items: InventoryItem[]; // Can be empty or contain multiple items
}
interface Stats {
  health: number,
  energy: number,
  armor: number,
  magicresist: number,
  speed: number,
  attackdamage: number,
  armorpen: number,
  magicpen: number,
  critchance: number,
  magicdamage: number,
  lifesteal: number,
  omnivamp: number,
  healshieldpower: number,
  critdamage: number
}

interface UserCharacter {
  _id: string;
  userid: string
  username: string;
  title: number;
  level: number;
  user: string;
  status: string;
  mmr: number;
  wallet: WalletItem[];
  inventory: InventoryCategory[];
  stats: Stats
  experience: number
}

interface UserDataResponse {
  message: string;
  data: UserCharacter[];
}

interface CharacterRankResponse {
  message: string;
  data: {
      mmr: number;
      rankTier: string;
      icon: string;
  };
}



export const getData = async (characterid: string): Promise<UserCharacter | null> => { 
  const response = await axiosInstance.get(
    "/character/getplayerdata",
    {params: {characterid}}
  );
  return response.data.data.length > 0 ? response.data.data[0] : null;
};


export const useUserData = (characterid: string) => {
  return useQuery({
    queryKey: ["userdata", characterid],
    queryFn: () => getData(characterid),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
  };

export const getRank = async (characterid: string): Promise<CharacterRankResponse> => { 
    const response = await axiosInstance.get(
      "/character/getrank",
      {params:{characterid}}
     
    );
    return response.data
};
  
  
  export const useGetRank = (characterid: string) => {
    return useQuery({
      queryKey: ["rank"],
      queryFn: () => getRank(characterid),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
    };
  















