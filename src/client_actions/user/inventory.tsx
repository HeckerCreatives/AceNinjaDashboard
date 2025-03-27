import page from "@/app/auth/login/page";
import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { link } from "fs";

interface InventoryItem {
  id: string;          // Unique ID of the item
  quantity: number;    // Number of items owned
  isEquipped: boolean; // Whether the item is equipped
  acquiredAt: string;  // Timestamp when the item was acquired
  details: ItemDetails; // Nested item details
}

interface ItemDetails {
  name: string;         // Item name
  description: string;  // Description of item effects
  rarity: "basic" | "common" | "rare" | "legendary"; // Rarity types
  stats: ItemStats;     // Item stats (damage, defense, etc.)
  price: number;        // Cost of the item
}

interface ItemStats {
  level: number;    // Item level
  damage: number;   // Attack power
  defense: number;  // Defense power
  speed: number;    // Speed boost
}

interface InventoryCategory {
  id: string;          // Category ID (e.g., "67bc1e100296ce60393aeedd")
  type: string;        // Item type (e.g., "weapon", "outfit", "hair", etc.)
  item: InventoryItem | null; // The item inside the category (or null if empty)
}

interface InventoryResponse {
  message: string;             // Success message
  data: Record<string, InventoryCategory>; // Data object with numeric keys
  pagination: PaginationInfo;  // Pagination details
}

interface PaginationInfo {
  total: number; // Total items
  page: number;  // Current page
  limit: number; // Items per page
  pages: number; // Total pages
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


  















