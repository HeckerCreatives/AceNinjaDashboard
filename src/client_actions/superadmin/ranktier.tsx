import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface RankTier {
    _id: string;
    name: string;
    requiredmmr: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface RankTierResponse {
    message: string;
    data: RankTier[];
}


export const getTierlist = async (): Promise<RankTierResponse> => { 
  const response = await axiosInstance.get(
    "/ranktier/getallranktiers",)
    
  return response.data
};


export const useGetTierlist = () => {
  return useQuery({
    queryKey: ["tier"],
    queryFn: () => getTierlist(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

 export const createRanktier = async ( name: string, requiredmmr: number) => { 
     const response = await axiosInstanceFormData.post("/ranktier/createranktier", {  name, requiredmmr});
     return response.data;
 };
  
export const useCreateRanktier = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({  name, requiredmmr}: { name: string, requiredmmr: number}) =>
        createRanktier(  name, requiredmmr),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["tier"] });
         }
     });
};


export const deleteRankTier = async ( id: string) => { 
  const response = await axiosInstance.post("/ranktier/deleteranktier", {id});
  return response.data;
};

export const useDeleteRankTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string}) =>
        deleteRankTier(id),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tier"] });
      }
  });
};


export const editRankTier = async ( name: string, requiredmmr: number, id: string) => { 
  const response = await axiosInstanceFormData.post("/ranktier/updateranktier", {  name, requiredmmr,id});
  return response.data;
};

export const useEditRankTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({name, requiredmmr,id}: {  name: string, requiredmmr: number, id: string}) =>
        editRankTier(name, requiredmmr,id),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tier"] });
      }
  });
};






  















