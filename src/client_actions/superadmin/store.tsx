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



export const getItemsAdmin = async ( type: string, rarity: string, search: string, page: number, limit: number): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/marketplace/getmarketitemsadmin",
    {params: {type, rarity, search, page, limit}}
  );
  return response.data;
};


export const useGetItemsAdmin = ( type: string, rarity: string, search: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["store", type, rarity,search,page,limit ],
    queryFn: () => getItemsAdmin( type, rarity,search,page,limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


export const createStoreItem = async ( name: string, price: number, currency: string, type: string, gender: string, description: string, rarity: string, stats: {damage: number, defense: number,speed: number}, imageUrl: File, inventorytype: string, skill: string) => { 
    const response = await axiosInstanceFormData.post("/marketplace/createitems", {  name, price, currency, type, gender, description,rarity,stats,imageUrl, inventorytype, skill});
    return response.data;
};
 
export const useCreateStoreItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({   name, price, currency, type, gender, description,rarity,stats,imageUrl, inventorytype, skill }: { name: string, price: number, currency: string, type: string, gender: string, description: string, rarity: string, stats: {damage: number, defense: number,speed: number}, imageUrl: File, inventorytype: string, skill:string}) =>
        createStoreItem(  name, price, currency, type, gender, description,rarity,stats,imageUrl, inventorytype, skill),
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


///skins
export const createSkinsItem = async ( name: string, price: number, currency: string, description: string, rarity: string, imageUrl: File, itemtype: string) => { 
    const response = await axiosInstanceFormData.post("/marketplace/createskinsitems", {  name, price, currency, description,rarity,imageUrl, itemtype});
    return response.data;
};
 
export const useCreateSkinsItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({   name, price, currency, description,rarity,imageUrl,itemtype }: { name: string, price: number, currency: string, description: string, rarity: string, imageUrl: File,itemtype: string}) =>
        createSkinsItem(  name, price, currency, description,rarity,imageUrl,itemtype),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store"] });
        }
    });
};



//skills
export const createSkillsItem = async ( name: string, price: number, currency: string, description: string, rarity: string, imageUrl: File, itemtype: string) => { 
    const response = await axiosInstanceFormData.post("/marketplace/createskillsitems", {  name, price, currency, description,rarity,imageUrl, itemtype});
    return response.data;
};
 
export const useCreateSkillsItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({   name, price, currency, description,rarity,imageUrl,itemtype }: { name: string, price: number, currency: string, description: string, rarity: string, imageUrl: File,itemtype: string}) =>
        createSkillsItem(  name, price, currency, description,rarity,imageUrl,itemtype),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store"] });
        }
    });
};


//crystal & gold packs

export const createPacksItem = async ( name: string, price: number, currency: string, description: string, imageUrl: File, itemtype: string) => { 
    const response = await axiosInstanceFormData.post("/marketplace/createpacksitems", {  name, price, currency, description,imageUrl, itemtype});
    return response.data;
};
 
export const useCreatePacksItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({   name, price, currency, description,imageUrl,itemtype }: { name: string, price: number, currency: string, description: string, imageUrl: File,itemtype: string}) =>
        createPacksItem(  name, price, currency, description,imageUrl,itemtype),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store"] });
        }
    });
};
















