import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ApiResponse {
  message: string;
  data: BattlepassSeason[];
  grandrewarditems: GrandRewardItem[]
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

interface BattlepassSeason {
  id: string;
  title: string;
  season: number,
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | string;
  tierCount: number;
  premiumCost: number;
  grandreward: {
    name: string
    type: string
    rarity: string
    description: string
    _id: string
  },
  createdAt: string;
  updatedAt: string;
  freeMissions: Mission[];
  premiumMissions: Mission[];
  tiers: Tier[];
}

interface Mission {
  missionName: string;
  description: string;
  xpReward: number;
  requirements: {
    [key: string]: number;
  };
  daily: boolean;
  _id: string;
}

interface Tier {
  tierNumber: number;
  freeReward: Reward;
  premiumReward: Reward;
  xpRequired: number;
  _id: string;
}

interface Reward {
  type: "coins" | "exp" | "crystal" | string;
  amount: number;
}


export interface QuestResponse {
  message: string
  data: Quest[]
}

export interface Quest {
  id: string
  missionName: string
  description: string
  requirements: Record<string, number>
  daily: boolean
  xpReward: number
  createdAt: string
}

interface StatDetails {
  level: number;
  damage: number;
  defense: number;
  speed: number;
}

interface GrandRewardItem {
  id: string;
  name: string;
  type: string;      // e.g., "weapon", "skins"
  rarity: string;    // e.g., "legendary"
  description: string;
  imageUrl: string;
  isEquippable: boolean;
  isOpenable: boolean;
  crystals: number;
  coins: number;
  stats: StatDetails;
}

interface BattlepassResponse {
  message: string; // "success" or "error"
  data: {
    hasPremium: boolean;
  };
}



export const getBattlePass = async (page: number, limit: number): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/battlepass/getbattlepass",
    {params: {page, limit}}
  );
  return response.data;
};


export const useGetBattlepass = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["bp", page, limit ],
    queryFn: () => getBattlePass( page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


 export const updateBpMission = async (bpid: string, freeMissions?: any, premiumMissions?: any) => { 
  const response = await axiosInstance.post("/battlepass/editbattlepassmissions", {bpid, freeMissions, premiumMissions });
  return response.data;
};

export const useUpdateBpMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bpid, freeMissions, premiumMissions }: { bpid: string, freeMissions?: any,premiumMissions?: any}) =>
      updateBpMission(bpid, freeMissions, premiumMissions),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["bp"] });
      }
  });
};

 export const updateBpTiers = async (bpid: string, tierid: string | undefined, tier: Tier | null) => { 
  const response = await axiosInstance.post("/battlepass/editbattlepassrewards", {bpid, tierid, tier});
  return response.data;
};

export const useUpdateBpTiers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bpid, tierid, tier }: { bpid: string, tierid: string | undefined, tier: Tier | null}) =>
      updateBpTiers(bpid, tierid, tier),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["bp"] });
      }
  });
};

 export const updateBpData = async (bpid: string,  title: string,
    startDate: string,
    endDate: string,
    status: string,
    tiercount: number,
    premiumCost: number,
  season: number,
grandreward: string) => { 
  const response = await axiosInstance.post("/battlepass/editbattlepassdetails", {bpid, title, startDate, endDate, status, tiercount, premiumCost, season, grandreward});
  return response.data;
};

export const useUpdateBpData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bpid, title, startDate, endDate, status, tiercount, premiumCost, season, grandreward }: { bpid: string,  title: string,
    startDate: string,
    endDate: string,
    status: string,
    tiercount: number,
    premiumCost: number,
  season: number,
grandreward: string}) =>
      updateBpData(bpid, title, startDate, endDate, status, tiercount, premiumCost, season, grandreward),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["bp"] });
      }
  });
};



export const getDailyQuest = async (page: number, limit: number): Promise<QuestResponse> => { 
  const response = await axiosInstance.get(
    "/quest/getdailyquest",
    {params: {page, limit}}
  );
  return response.data;
};


export const useGetDailyQuest = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["dailyquest", page, limit ],
    queryFn: () => getDailyQuest( page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


 export const updateDailyQuest = async (id: string, xpReward: number, requirements: any ) => { 
  const response = await axiosInstance.post("/quest/editdailyquest", {id, xpReward, requirements });
  return response.data;
};

export const useUpdateDailyQuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, xpReward, requirements }: { id: string, xpReward: number, requirements: any }) =>
      updateDailyQuest(id, xpReward, requirements),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["dailyquest"] });
      }
  });
};


export const getUserBattlePass = async (characterid: string): Promise<BattlepassResponse> => { 
  const response = await axiosInstance.get(
    "/battlepass/checkuserbattlepasssa",
    {params: {characterid}}
  );
  return response.data;
};


export const useGetUserBattlepass = (characterid: string) => {
  return useQuery({
    queryKey: ["battlepassuser", characterid ],
    queryFn: () => getUserBattlePass( characterid),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};



  















