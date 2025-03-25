import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const updatePassword = async (oldpw: string, newpw: string) => { 
    const response = await axiosInstance.post("/user/changeuserpassword", { oldpw, newpw });
    return response.data;
  };
  
  export const useUpdatePassword = () => {
    return useMutation({
      mutationFn: ({ oldpw, newpw }: { oldpw: string; newpw: string }) =>
        updatePassword(oldpw, newpw),
        onError: (error) => {
            handleApiError(error);
        },
      
       
    });
  };
















