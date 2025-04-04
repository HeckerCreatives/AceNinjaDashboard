import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
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
    currency: string
    gender:string
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



export const getItemsAdmin = async ( type: string, rarity: string, search: string, page: number, limit: number, markettype: string): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/marketplace/getmarketitemsadmin",
    {params: {type, rarity, search, page, limit, markettype}}
  );
  return response.data;
};


export const useGetItemsAdmin = ( type: string, rarity: string, search: string, page: number, limit: number,markettype: string) => {
  return useQuery({
    queryKey: ["store", type, rarity,search,page,limit, markettype ],
    queryFn: () => getItemsAdmin( type, rarity,search,page,limit, markettype),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


export const createStoreItem = async ( name: string, price: number, currency: string, type: string, gender: string, description: string, rarity: string, stats: {damage: number, defense: number,speed: number}, imageUrl: File) => { 
    const response = await axiosInstanceFormData.post("/marketplace/createitems", {  name, price, currency, type, gender, description,rarity,stats,imageUrl});
    return response.data;
};
 
export const useCreateStoreItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({   name, price, currency, type, gender, description,rarity,stats,imageUrl }: { name: string, price: number, currency: string, type: string, gender: string, description: string, rarity: string, stats: {damage: number, defense: number,speed: number}, imageUrl: File}) =>
        createStoreItem(  name, price, currency, type, gender, description,rarity,stats,imageUrl),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store"] });
        }
    });
};


export const deleteStoreItem = async ( itemId: string) => { 
    const response = await axiosInstance.post("/marketplace/deleteitem", { itemId});
    return response.data;
};
 
export const useDeleteStoreItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ itemId }: {itemId: string}) =>
        deleteStoreItem( itemId),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store"] });
        }
    });
};



export const updateStoreItem = async (itemId: string, name: string, price: number, currency: string, type: string, gender: string, description: string, rarity: string, stats: {damage: number, defense: number,speed: number}, imageUrl: File | null | undefined) => { 
    const response = await axiosInstanceFormData.post("/marketplace/updateitem", { itemId, name, price, currency, type, gender, description,rarity,stats,imageUrl});
    return response.data;
};
 
export const useUpdateStoreItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({itemId, name, price, currency, type, gender, description,rarity,stats,imageUrl }: {itemId: string, name: string, price: number, currency: string, type: string, gender: string, description: string, rarity: string, stats: {damage: number, defense: number,speed: number}, imageUrl: File | null | undefined}) =>
        updateStoreItem( itemId, name, price, currency, type, gender, description,rarity,stats,imageUrl),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store"] });
        }
    });
};

















