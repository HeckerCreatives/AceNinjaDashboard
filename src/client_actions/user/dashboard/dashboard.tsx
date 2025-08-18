import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type PassiveEffects = {
  health: number;
  energy: number;
  poisonimmunity: number;
};

type ActiveEffects = {
  maxhealthreduce: number;
  stun: number;
};

type Companion = {
  _id: string;
  companionname: string;
  levelrequirement: number;
  price: number;
  currency: string;
  activedescription: string;
  passivedescription: string;
  passiveeffects: PassiveEffects;
  activeeffects: ActiveEffects;
  __v: number;
  isEquipped: boolean
  createdAt: string;  // ISO Date string
  updatedAt: string;  // ISO Date string
};

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
  details: {
    _id: string
    name: string
    price:string
    currency: string
    type: string
  }
  name: string
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
  badge: number
  level: number;
  user: string;
  status: string;
  mmr: number;
  wallet: WalletItem[];
  inventory: InventoryCategory[];
  stats: Stats
  experience: number
  companions: Companion[];
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

interface PayinResponse {
  message: string;
  data: {
    totalpayin: number;
  };
}



export const getData = async (characterid: string): Promise<UserCharacter | null> => { 
  const response = await axiosInstance.get(
    "/character/getplayerdata",
    {params: {characterid}}
  );
  return response.data.data
};


export const useUserData = (characterid: string) => {
  return useQuery({
    queryKey: ["userdata", characterid],
    queryFn: () => getData(characterid),
    enabled: !!characterid,
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
  };


  export const getStats = async (characterid: string): Promise<Stats | null> => { 
    const response = await axiosInstance.get(
      "/character/getcharacterstats",
      {params: {characterid}}
    );
    return response.data.data
  };
  
  
  export const useUserStats = (characterid: string) => {
    return useQuery({
      queryKey: ["stats", characterid],
      queryFn: () => getStats(characterid),
      enabled: !!characterid,
      // staleTime: 5 * 60 * 1000,
      // refetchOnMount: false, 
      // refetchOnWindowFocus: false,
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
        enabled: !!characterid,
      // staleTime: 5 * 60 * 1000,
      // refetchOnMount: false, 
      // refetchOnWindowFocus: false,
    });
    };

    export const getTotalPayin = async (characterid: string): Promise<PayinResponse> => { 
      const response = await axiosInstance.get(
        "/payin/getusertotalpayin",
        {params:{characterid}}
       
      );
      return response.data
  };
    
    
    export const useGetTotalPayin = (characterid: string) => {
      return useQuery({
        queryKey: ["payin"],
        queryFn: () => getTotalPayin(characterid),
          enabled: !!characterid,
      });
      };
  















