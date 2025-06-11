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

export const updateDailyFreebie = async ( slot: number, amount: number, type: string, chance: number) => { 
     const response = await axiosInstance.post("/rewards/editdailyspin", { slot, amount, type, chance});
     return response.data;
 };
  
export const useUpdateDailyFreebie = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({  slot, amount, type, chance}: {slot: number, amount: number, type: string, chance: number}) =>
        updateDailyFreebie(   slot, amount, type, chance),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["dailyspin"] });
         }
     });
};


