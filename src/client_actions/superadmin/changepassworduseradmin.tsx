import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const updatePasswordUserAdmin = async (userid: string, password: string) => { 
    const response = await axiosInstance.post("/user/changeuserpasswordsuperadmin", { userid, password });
    return response.data;
  };
  
  export const useUpdatePasswordUserAdmin = () => {
    return useMutation({
      mutationFn: ({ userid, password }: { userid: string, password: string }) =>
        updatePasswordUserAdmin(userid, password),
        onError: (error) => {
            handleApiError(error);
        },
      
       
    });
  };
















