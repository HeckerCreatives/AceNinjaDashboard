import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Reward = {
  coins: number;
  exp: number;
  crystal: number;
};

type ItemRewards = {
   _id: string
  name: string
  type: string
}

type DataItem = {
  id: string;
  status: "active" | "inactive"; // You can expand the possible statuses if needed
  expiration: string; // ISO string for the expiration date
  rewards: Reward;
  username: string
  code: string
  itemrewards: ItemRewards[]
  skillrewards: ItemRewards[]
  redeemedAt: string
};

type ApiResponse = {
  message: "success" | "error"; // Assuming there could be other types of messages in the future
  data: DataItem[];
  totalpages: number
};

interface Analytics {
  message: string;
  data: {
    redeemed: number;
    unredeemed: number;
    total: number;
  };
}



export const getRedeemcodes = async ( status: string, page: number, limit: number): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/redeemcode/getcodes",
    {params:{status, page, limit}}
  );
  return response.data
};


export const useGetRedeemCodes = (status: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["redeemcodes",status, page, limit],
    queryFn: () => getRedeemcodes(status, page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const getRedeemcodesHistory = async (page: number, limit: number): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/redeemcode/getredeemedcodeshistory",
    {params:{page, limit}}
  );
  return response.data
};


export const useGetRedeemCodesHistory = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["redeemcodeshistory", page, limit],
    queryFn: () => getRedeemcodesHistory(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const getRedeemcodesAnalytics = async (): Promise<Analytics> => { 
  const response = await axiosInstance.get(
    "/redeemcode/redeemcodeanalytics",
  );
  return response.data
};


export const useGetRedeemCodesAnalytics = () => {
  return useQuery({
    queryKey: ["redeemcodesanalytics",],
    queryFn: () => getRedeemcodesAnalytics(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


 export const addRedeemCode = async ( code: string, status: string, expiry: string, rewards: {coins: number, exp: number, crystal: number}, itemrewards?: string [], skillrewards?: string[]) => { 
     const response = await axiosInstance.post("/redeemcode/createcode", {  code, status, expiry, rewards, itemrewards, skillrewards });
     return response.data;
 };
  
 export const useAddRedeemCode = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ code, status, expiry, rewards, itemrewards, skillrewards }: {  code: string, status: string, expiry: string, rewards: {coins: number, exp: number, crystal: number},itemrewards?: string [],skillrewards?: string[]}) =>
        addRedeemCode(code, status, expiry, rewards, itemrewards, skillrewards),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["redeemcodes"] });
             queryClient.invalidateQueries({ queryKey: ["redeemcodesanalytics"] });
         }
     });
 };


 export const deleteRedeemCode = async ( id: string) => { 
     const response = await axiosInstance.post("/redeemcode/deletecode", { id});
     return response.data;
 };
  
 export const useDeleteRedeemCode = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ id }: {id: string}) =>
        deleteRedeemCode( id),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["redeemcodes"] });
         }
     });
 };


 export const updateRedeemCode = async (id: string, code: string, status: string, expiry: string, rewards: {coins: number, exp: number, crystal: number},itemrewards: string [],skillsreward?: string[]) => { 
  const response = await axiosInstance.post("/redeemcode/updatecode", { id, code, status, expiry, rewards, itemrewards, skillsreward });
  return response.data;
};

export const useUpdateRedeemCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, code, status, expiry, rewards, itemrewards, skillsreward}: { id: string,  code: string, status: string, expiry: string, rewards: {coins: number, exp: number, crystal: number},itemrewards: string [], skillsreward?: string[]}) =>
      updateRedeemCode(id, code, status, expiry, rewards, itemrewards, skillsreward),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["redeemcodes"] });
      }
  });
};

 




  















