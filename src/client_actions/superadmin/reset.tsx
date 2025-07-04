import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { string } from "zod";

export interface ResetLogResponse {
  message: string;
  data: ResetLogEntry[];
  pagination: Pagination;
}

export interface ResetLogEntry {
  id: string;
  owner: string;
  type: 'dailyspin' | 'expspin' | 'weeklylogin' | 'monthlylogin' | 'quest' | 'battlepass' | string;
  action: string;
  manualresetdate: string;
  createdAt: string; 
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}


 export const resetDailyQuest = async ( questid: string) => { 
     const response = await axiosInstance.post("/reset/resetquest", { questid});
     return response.data;
 };
  
export const useResetDailyQuest = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ questid}: {questid: string}) =>
        resetDailyQuest( questid),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};


 export const resetPassQuest = async ( questid: string) => { 
     const response = await axiosInstance.post("/reset/resetpassquest", { questid});
     return response.data;
 };
  
export const useResetPassQuest = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ questid}: {questid: string}) =>
        resetPassQuest( questid),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};


 export const resetDailySpin = async ( ) => { 
     const response = await axiosInstance.post("/reset/resetalldailyspin");
     return response.data;
 };
  
export const useResetDailySpin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: () =>
        resetDailySpin(),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};

 export const resetDailyExpSpin = async ( ) => { 
     const response = await axiosInstance.post("/reset/resetallexpspin");
     return response.data;
 };
  
export const useResetDailyExpSpin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: () =>
        resetDailyExpSpin(),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};

 export const resetWeeklyLogin = async ( ) => { 
     const response = await axiosInstance.post("/reset/resetallweekylogin");
     return response.data;
 };
  
export const useResetWeeklyLogin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: () =>
        resetWeeklyLogin(),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};


 export const resetMonthlyLogin = async ( ) => { 
     const response = await axiosInstance.post("/reset/resetallmonthlylogin");
     return response.data;
 };
  
export const useResetMonthlyLogin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: () =>
        resetMonthlyLogin(),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};

 export const resetMonthlyLoginAll = async ( ) => { 
     const response = await axiosInstance.post("/reset/resetmonthlylogin");
     return response.data;
 };
  
export const useResetMonthlyLoginAll = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: () =>
        resetMonthlyLoginAll(),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};

 export const resetFreebie = async ( ) => { 
     const response = await axiosInstance.post("/reset/resetallfreebies");
     return response.data;
 };
  
export const useResetFreebie = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: () =>
        resetFreebie(),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["resethistory"] });
         }
     });
};


 export const resetHistory = async (page: number, limit: number ):Promise<ResetLogResponse> => { 
     const response = await axiosInstance.get("/reset/getresethistory",
        {params: {page, limit}}
     );
     return response.data;
 };
  
export const useResetHistory = (page: number, limit: number ) => {
     return useQuery({
        queryKey: ["resethistory", page, limit],
        queryFn: () => resetHistory(page, limit),
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false, 
        refetchOnWindowFocus: false,
       
    });
};















  















