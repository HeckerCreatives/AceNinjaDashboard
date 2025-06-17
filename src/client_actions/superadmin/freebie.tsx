import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { string } from "zod";

interface Dailyspindata {
  id: string,
  slot: number,
  type: string,
  amount: number,
  chance: number,
  day: any
}
interface DailySpin {
    message: string,
    data: Dailyspindata[]
}


//spin
export const getDailyFreebie = async (): Promise<DailySpin> => { 
  const response = await axiosInstance.get(
    "/rewards/getdailyspinsa",)
    
  return response.data
};


export const useDailyFreebie = () => {
  return useQuery({
    queryKey: ["dailyspin"],
    queryFn: () => getDailyFreebie(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const updateFreebie = async (itemid: string, description: string, amount: number) => { 
     const response = await axiosInstance.post("/marketplace/editfreebiereward", {itemid, description, amount});
     return response.data;
 };
  
export const useUpdateFreebie = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ itemid, description, amount}: {itemid: string, description: string, amount: number}) =>
        updateFreebie(  itemid, description, amount),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["store"] });
         }
     });
};


