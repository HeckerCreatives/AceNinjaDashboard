import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Reward = {
  coins: number;
  emerald: number;
  crystal: number;
};

type DataItem = {
  id: string;
  code: string;
  status: "active" | "inactive"; // You can expand the possible statuses if needed
  expiration: string; // ISO string for the expiration date
  rewards: Reward;
};

type ApiResponse = {
  message: "success" | "error"; // Assuming there could be other types of messages in the future
  data: DataItem[];
  totalpages: number
};


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

 export const addRedeemCode = async ( code: string, status: string, expiry: string, rewards: {coins: number, emerald: number, crystal: number}) => { 
     const response = await axiosInstance.post("/redeemcode/createcode", {  code, status, expiry, rewards });
     return response.data;
 };
  
 export const useAddRedeemCode = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ code, status, expiry, rewards }: {  code: string, status: string, expiry: string, rewards: {coins: number, emerald: number, crystal: number}}) =>
        addRedeemCode(code, status, expiry, rewards),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["redeemcodes"] });
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


 export const updateRedeemCode = async (id: string, code: string, status: string, expiry: string, rewards: {coins: number, emerald: number, crystal: number}) => { 
  const response = await axiosInstance.post("/redeemcode/updatecode", { id, code, status, expiry, rewards });
  return response.data;
};

export const useUpdateRedeemCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, code, status, expiry, rewards }: { id: string,  code: string, status: string, expiry: string, rewards: {coins: number, emerald: number, crystal: number}}) =>
      updateRedeemCode(id, code, status, expiry, rewards),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["redeemcodes"] });
      }
  });
};

 




  















