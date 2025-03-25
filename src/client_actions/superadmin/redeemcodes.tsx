import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface SocialMediaItem {
    _id: string;
    link: string;
    title: string;
    type: string;
    createdAt: string; 
    updatedAt: string;
    __v: number;
  }
  
  // Define the full API response type
  export interface SocialMediaResponse {
    message: string;
    data: SocialMediaItem[];
  }
  


export const getRedeemcodes = async (): Promise<SocialMediaResponse> => { 
  const response = await axiosInstance.get(
    "/redeemcode/getcodes",
  );
  return response.data
};


export const useGetRedeemCodes = () => {
  return useQuery({
    queryKey: ["redeemcodes"],
    queryFn: () => getRedeemcodes(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

 export const addRedeemCode = async ( code: string, description: string, status: string, expiry: string, rewards: string) => { 
     const response = await axiosInstance.post("/redeemcode/createcode", {  code, description, status, expiry, rewards });
     return response.data;
 };
  
 export const useAddRedeemCode = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ code, description, status, expiry, rewards }: {  code: string, description: string, status: string, expiry: string, rewards: string}) =>
        addRedeemCode(code, description, status, expiry, rewards),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["redeemcodes"] });
         }
     });
 };




  















