import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface BossRewardResponse {
  message: string;
  data: Boss[];
  pagination: Pagination;
}

export interface Boss {
  id: string;
  bossname: string;
  status: "active" | "inactive";
  rewards: Reward[];
  createdAt: string;
  updatedAt: string;
}

export interface Reward {
  type: "exp" | "crystal" | "coins" | "item" | "title" | "badge" | "companion";
  name: string;
  amount: number;
  _id: string;
  id?: string; // only for item/title/badge/companion
  gender?: "male" | "female"; // only for outfits
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}



export const getBossList = async (): Promise<BossRewardResponse> => { 
  const response = await axiosInstance.get(
    "/raidboss/getraidbosses",)
    
  return response.data
};


export const useGetBossList = () => {
  return useQuery({
    queryKey: ["boss"],
    queryFn: () => getBossList(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};




export const editBossRewards = async ( id: string, rewards: any[]) => { 
  const response = await axiosInstance.post("/raidboss/updateraidboss", {  id, rewards});
  return response.data;
};

export const useEditBossRewards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, rewards}: {  id: string, rewards: any[]}) =>
        editBossRewards(id, rewards),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["boss"] });
      }
  });
};

export const editBossStatus = async ( bossid: string) => { 
  const response = await axiosInstance.post("/raidboss/setactiveraidboss", { bossid});
  return response.data;
};

export const useEditBossStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({bossid}: { bossid: string}) =>
        editBossStatus(bossid),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["boss"] });
      }
  });
};







  















