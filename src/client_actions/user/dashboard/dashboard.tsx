import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import router from "next/router";
import toast from "react-hot-toast";


export const getData = async () => { 
  const response = await axiosInstance.get(
    "/dashboard/user",
  );
  return response.data;
};


export const useUserData = () => {
    return useQuery({
      queryKey: ["userdata"],
      queryFn: async () => {
        try {
          return await getData();
        } catch (error) {
        //   handleApiError(error, router); 
          throw error;
        }
      },
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false, 
        refetchOnWindowFocus: false,
    });
  };
  















