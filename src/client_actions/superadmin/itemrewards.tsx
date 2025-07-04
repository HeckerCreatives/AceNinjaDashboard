import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";



export interface Item {
  itemid: string;
  name: string;
  type: string;
  gender: string;
}

export interface ApiResponse {
  message: string;
  data: {
    items: Item[];
  };
}


export interface TitleItem {
  id: string
  index: number
  title: string
  description: string
}

export interface TitleItemResponse {
  message: string
  data: TitleItem[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNext: boolean
    hasPrev: boolean
  }
}


export interface BadgeItem {
  id: string
  index: number
  title: string
  description: string
}

export interface BadgeItemResponse {
  message: string
  data: BadgeItem[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNext: boolean
    hasPrev: boolean
  }
}





export const getItemRewards = async ( itemType: string, genderType: string): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/marketplace/getallitemsandskills?page=0&limit=99999",
    {params: {itemType, genderType}}
  );
  return response.data;
};


export const useGetItemRewards = ( itemType: string, genderType: string) => {
  return useQuery({
    queryKey: ["itemrewards", itemType, genderType ],
    queryFn: () => getItemRewards(itemType, genderType),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


export const getTitleRewards = async (): Promise<TitleItemResponse> => { 
  const response = await axiosInstance.get(
    "/title/gettitles?page=0&limit=99999",
  );
  return response.data;
};


export const useGetTitleRewards = () => {
  return useQuery({
    queryKey: ["titlerewards" ],
    queryFn: () => getTitleRewards(),
   
  });
};


export const getBadgeRewards = async (): Promise<BadgeItemResponse> => { 
  const response = await axiosInstance.get(
    "/badge/getbadges?page=0&limit=99999",
  );
  return response.data;
};


export const useGetBadgeRewards = () => {
  return useQuery({
    queryKey: ["badgerewards" ],
    queryFn: () => getBadgeRewards(),
   
  });
};



















