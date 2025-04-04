import page from "@/app/auth/login/page";
import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { link } from "fs";

interface InventoryItem {
  id: string;          
  quantity: number;    
  isEquipped: boolean; 
  acquiredAt: string; 
  details: ItemDetails; 
}

interface ItemDetails {
  name: string;        
  description: string;  
  rarity: "basic" | "common" | "rare" | "legendary"; 
  stats: ItemStats;     
  price: number;        
  imageUrl: string
}

interface ItemStats {
  level: number;  
  damage: number;   
  defense: number;  
  speed: number;    
}

interface InventoryCategory {
  id: string;          
  type: string;        
  item: InventoryItem | null; 
}

interface InventoryResponse {
  message: string;            
  data: Record<string, InventoryCategory>; 
  pagination: PaginationInfo; 
}

interface PaginationInfo {
  total: number; 
  page: number;  
  limit: number; 
  pages: number; 
}


export const getInventory = async (characterid: string, page: number, limit: number): Promise<InventoryResponse> => { 
  const response = await axiosInstance.get(
    "/character/getinventorydata",
    {params: {characterid, page, limit}}
  );
  return response.data;
};


export const useGetInventory = (characterid: string,page: number, limit: number) => {
  return useQuery({
    queryKey: ["inventory", characterid,page, limit],
    queryFn: () => getInventory(characterid, page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
  };


export const equipItem = async (characterid: string, itemid: string) => { 
    const response = await axiosInstance.post("/marketplace/equipitem", { characterid, itemid });
    return response.data;
};
  
  export const useEquipItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ characterid, itemid }: { characterid: string; itemid: string }) =>
        equipItem(characterid, itemid),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["inventory"] });
        }
      
       
    });
  };


export const sellItem = async (characterid: string, itemid: string, quantity: number) => { 
    const response = await axiosInstance.post("/marketplace/sellitem", { characterid, itemid, quantity });
    return response.data;
};
  
  export const useSellItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ characterid, itemid, quantity }: { characterid: string; itemid: string, quantity: number }) =>
        sellItem(characterid, itemid, quantity),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["inventory"] });
        }
      
       
    });
  };


  















