import page from "@/app/auth/login/page";
import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { link } from "fs";


export const grantItem = async (username: string, items: string[]) => { 
    const response = await axiosInstance.post("/marketplace/grantplayeritemsuperadmin", { username, items });
    return response.data;
};
  
export const useGrantItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ username, items }: { username: string;  items: string[] }) =>
        grantItem(username, items),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [""] });
        }
      
       
    });
};


  















