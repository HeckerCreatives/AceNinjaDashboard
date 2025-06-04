import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ApiResponse {
  message: string;
  data: BattlepassSeason[];
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
    id: string
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
  season: number) => { 
  const response = await axiosInstance.post("/battlepass/editbattlepassdetails", {bpid, title, startDate, endDate, status, tiercount, premiumCost, season});
  return response.data;
};

export const useUpdateBpData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bpid, title, startDate, endDate, status, tiercount, premiumCost, season }: { bpid: string,  title: string,
    startDate: string,
    endDate: string,
    status: string,
    tiercount: number,
    premiumCost: number,
  season: number}) =>
      updateBpData(bpid, title, startDate, endDate, status, tiercount, premiumCost, season),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["bp"] });
      }
  });
};


  















