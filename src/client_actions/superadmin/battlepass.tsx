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
  seasonName: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | string;
  tierCount: number;
  premiumCost: number;
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


  















