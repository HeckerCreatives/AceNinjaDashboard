import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ItemStats = {
    level: number;
    damage: number;
    defense: number;
    speed: number;
};

type Item = {
    itemId: string;
    name: string;
    type: string;
    rarity: string;
    price: number;
    description: string;
    stats: ItemStats;
    imageUrl: string;
};

type ItemsData = Record<string, Item>;

type Pagination = {
    total: number;
    page: number;
    limit: number;
    pages: number;
};

type ApiResponse = {
    message: string;
    data: ItemsData;
    pagination: Pagination;
};



export const getItems = async (characterid: string, type: string, rarity: string, search: string, page: number, limit: number): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/marketplace/getmarketitems",
    {params: {characterid, type, rarity, search, page, limit}}
  );
  return response.data;
};


export const useGetItems = (characterid: string, type: string, rarity: string, search: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["items", characterid, type, rarity,search,page,limit ],
    queryFn: () => getItems(characterid, type, rarity,search,page,limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const buyItem = async (characterid: string, itemid: string): Promise<ApiResponse> => { 
    const response = await axiosInstance.post("/marketplace/buyitem", { characterid, itemid });
    return response.data;
  };
  
  export const useBuyItem = () => {
    return useMutation({
      mutationFn: ({ characterid, itemid }: { characterid: string; itemid: string }) =>
        buyItem(characterid, itemid),
        onError: (error) => {
            handleApiError(error);
        },
      
       
    });
  };
















