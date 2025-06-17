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


















