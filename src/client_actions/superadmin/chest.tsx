import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ChestResponse {
  message: string;
  data: Chest[];
}

export interface Chest {
  id: string;
  name: string;
  amount: number;
  currency: "crystal" | "coins" | "exp"; 
  rewards: ChestReward[];
  createdAt: string; 
}

// client_actions/superadmin/chest.ts

export type ChestReward = {
  rewardType: "coins" | "exp" | "crystal" | "weapon" | "skill" | "badge" | "title" | "outfit"
  amount?: number
  probability?: string
  reward?: {
    id?: string
    name?: string
    fid?: string
    fname?: string
  }
}

export type ChestRewardUpdate = {
  rewardtype: "coins" | "exp" | "crystal" | "weapon" | "skill" | "badge" | "title" | "outfit"
  amount?: number
  probability?: number
  reward?: {
    id?: string
    name?: string
    fid?: string
    fname?: string
  }
}






export const getChestRewards = async (): Promise<ChestResponse> => { 
  const response = await axiosInstance.get(
    "/chest/getchestrewards",
  );
  return response.data;
};


export const useGetChestRewards = () => {
  return useQuery({
    queryKey: ["chestrewards", ],
    queryFn: () => getChestRewards( ),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


 export const updateChestRewards = async (chestid: string, rewards: ChestRewardUpdate[]) => { 
  const response = await axiosInstance.post("/chest/editchestreward", {chestid, rewards});
  return response.data;
};

export const useUpdateChestRewards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chestid, rewards }: { chestid: string, rewards: ChestRewardUpdate[]}) =>
      updateChestRewards(chestid, rewards),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["chestrewards"] });
      }
  });
};


 export const updateChest = async (chestid: string, amount: number, currency: string) => { 
  const response = await axiosInstance.post("/chest/editchest", {chestid, amount, currency});
  return response.data;
};

export const useUpdateChest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chestid, amount, currency }: {chestid: string, amount: number, currency: string}) =>
      updateChest(chestid, amount, currency),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["chestrewards"] });
      }
  });
};



  















