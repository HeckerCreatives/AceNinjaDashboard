import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type ApiResponse = {
    message: string;
    data: {
      totalpages: number;
      data: UserData[];
    };
  };
  
  export type UserData = {
    _id: string;
    email: string;
    createdAt: string; // ISO timestamp format
    updatedAt: string; // ISO timestamp format
    __v: number;
  };
  



export const getSubscriber = async (page: number, limit: number, search: string): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/subscription/getsubscriberlist",
    {params: {page, limit, search}}
  );
  return response.data
};


export const useGetSubscriber = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["subscriber",page, limit, search],
    queryFn: () => getSubscriber(page, limit, search),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


export const deleteSubscribers = async ( userIds: string[]) => { 
  const response = await axiosInstance.post("/subscription/deletesubscribersbyids", { userIds});
  return response.data;
};

export const useDeleteSubscribers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({  userIds }: { userIds: string[]}) =>
        deleteSubscribers(userIds),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["subscriber"] });
      }
  });
};







  















