import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { CreatePackForm } from "@/validation/schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { strict } from "assert";

export interface PackResponse {
  message: string;
  data: Packs[];
}

export interface Packs {
  id: string;
  name: string;
  amount: number;
  currency: string
  rewards: PackItem[];
  createdAt: string; 
}


export type PackItem = {
  rewardType: "coins" | "exp" | "crystal" | "weapon" | "skill" | "badge" | "title" | "outfit"
  amount?: number
  probability?: number
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






export const getVipPacks = async (): Promise<PackResponse> => { 
  const response = await axiosInstance.get(
    "/packs/getpackrewards",
  );
  return response.data;
};


export const useGetVipPacks = () => {
  return useQuery({
    queryKey: ["vip-packs", ],
    queryFn: () => getVipPacks( ),
    retry: false
  });
};

 export const addVipPack = async (data: CreatePackForm) => { 
  const response = await axiosInstance.post("/packs/createpack", data);
  return response.data;
};

export const useAddVipPack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePackForm) =>
      addVipPack(data),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vip-packs"] });
      }
  });
};


 export const deleteVipPack = async (packid: string) => { 
  const response = await axiosInstance.post("/packs/deletepack", {packid});
  return response.data;
};

export const useDeleteVipPack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({packid}: {packid: string}) =>
      deleteVipPack(packid),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vip-packs"] });
      }
  });
};

 export const updateVipPack = async (packid: string, name: string, amount: number, currency?: string) => { 
  const response = await axiosInstance.post("/packs/editpack", {packid, name, amount, currency});
  return response.data;
};

export const useUpdateVipPack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({packid, name, amount, currency}: {packid: string, name: string, amount: number, currency?: string}) =>
      updateVipPack(packid, name, amount, currency),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vip-packs"] });
      }
  });
};


 export const updateVipPackRewards = async (data: CreatePackForm) => { 
  const response = await axiosInstance.post("/packs/editpackreward", data);
  return response.data;
};

export const useUpdateVipPackRewards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePackForm) =>
      updateVipPackRewards(data),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vip-packs"] });
      }
  });
};







  















