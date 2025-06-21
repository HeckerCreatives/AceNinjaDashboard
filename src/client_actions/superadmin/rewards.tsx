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
export const getDailySpin = async (): Promise<DailySpin> => { 
  const response = await axiosInstance.get(
    "/rewards/getdailyspinsa",)
    
  return response.data
};


export const useDailySpin = () => {
  return useQuery({
    queryKey: ["dailyspin"],
    queryFn: () => getDailySpin(),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};

 export const updateDailySpin = async ( slot: number, amount: number, type: string, chance: number) => { 
     const response = await axiosInstance.post("/rewards/editdailyspin", { slot, amount, type, chance});
     return response.data;
 };
  
export const useUpdateDailySpin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({  slot, amount, type, chance}: {slot: number, amount: number, type: string, chance: number}) =>
        updateDailySpin(   slot, amount, type, chance),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["dailyspin"] });
         }
     });
};


export const getDailyExpSpin = async (): Promise<DailySpin> => { 
  const response = await axiosInstance.get(
    "/rewards/getdailyexpspinsa",)
    
  return response.data
};


export const useDailyExpSpin = () => {
  return useQuery({
    queryKey: ["dailyexpspin"],
    queryFn: () => getDailyExpSpin(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

 export const updateDailyExpSpin = async ( slot: number, amount: number, type: string, chance: number) => { 
     const response = await axiosInstance.post("/rewards/editdailyexpspin", { slot, amount, type, chance});
     return response.data;
 };
  
export const useUpdateDailyExpSpin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({  slot, amount, type, chance}: {slot: number, amount: number, type: string, chance: number}) =>
        updateDailyExpSpin(   slot, amount, type, chance),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["dailyexpspin"] });
         }
     });
};


//login

export const getWeeklylogin = async (): Promise<DailySpin> => { 
  const response = await axiosInstance.get(
    "/rewards/getweeklyloginsa",)
    
  return response.data
};


export const useGetWeeklylogin = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: () => getWeeklylogin(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

 export const updateWeeklylogin = async ( day: number, amount: number, type: string) => { 
     const response = await axiosInstance.post("/rewards/editweeklylogin", { day, amount, type,});
     return response.data;
 };
  
export const useUpdateWeeklylogin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({  day, amount, type,}: {day: number, amount: number, type: string}) =>
        updateWeeklylogin( day, amount, type),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["login"] });
         }
     });
};


export const getMonthlylogin = async (): Promise<DailySpin> => { 
  const response = await axiosInstance.get(
    "/rewards/getmonthlyloginsa",)
    
  return response.data
};


export const useGetMonthlylogin = () => {
  return useQuery({
    queryKey: ["login"],
    queryFn: () => getMonthlylogin(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

 export const updateMonthlylogin = async ( day: string, amount: number, type: string) => { 
     const response = await axiosInstance.post("/rewards/editmonthlylogin", { day, amount, type,});
     return response.data;
 };
  
export const useUpdateMonthlylogin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({  day, amount, type,}: {day: string, amount: number, type: string}) =>
        updateMonthlylogin( day, amount, type),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["login"] });
         }
     });
};











  















