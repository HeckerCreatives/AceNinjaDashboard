import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { string } from "zod";

export interface GetVersionResponse {
  message: string;
  data: {
    id: string;
    version: string;
    description: string;
    releaseDate: string; // ISO date string
    isActive: boolean;
  };
}


//spin
export const getGameVersion = async (): Promise<GetVersionResponse> => { 
  const response = await axiosInstance.get(
    "/version/getactiveversion",)
    
  return response.data
};


export const useGetGameVersion = () => {
  return useQuery({
    queryKey: ["dailyspin"],
    queryFn: () => getGameVersion(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const updateGameVersion = async ( 
    id: any,
    version: string,
    description: string,
    isActive: boolean
) => { 
     const response = await axiosInstance.post("/version/editversion", { id, version, description, isActive});
     return response.data;
 };
  
export const useUpdateGameVersion = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ id, version, description, isActive}: {id: any,
    version: string,
    description: string,
    isActive: boolean}) =>
        updateGameVersion(  id, version, description, isActive),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["dailyspin"] });
         }
     });
};


