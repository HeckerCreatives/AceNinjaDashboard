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
    "/packs/getpackrewardsplayer",
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

 