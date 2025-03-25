import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface MaintenanceItem {
    id: string;
    type: string;
    value: string;
  }
  
  export interface MaintenanceResponse {
    message: string;
    data: MaintenanceItem[];
  }
  


export const getMaintenance = async (): Promise<MaintenanceResponse> => { 
  const response = await axiosInstance.get(
    "/maintenance/getmaintenance",
   
  );
  return response.data
};


export const useGetMaintenance = () => {
  return useQuery({
    queryKey: ["maintenance"],
    queryFn: () => getMaintenance(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const updateMaintenance = async (type: string, value: string) => { 
    const response = await axiosInstance.post("/maintenance/changemaintenance", { type, value });
    return response.data;
};
  
export const useUpdateMaintenance = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ type, value }: { type: string, value: string }) =>
        updateMaintenance(type,value),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["maintenance"] });
        }
    });
};

  















