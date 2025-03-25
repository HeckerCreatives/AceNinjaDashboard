import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import router from "next/router";
import toast from "react-hot-toast";

interface Register {
    username: string
    email: string
    password: string
}


//create admission
const registerUser = async ( data: Register
) => {
  const response = await axiosInstance.post(
    "/auth/register",
    data
  );
  
  return response.data;
};

export const useRegister = () => {

  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      handleApiError(error);
    },
  });
};
//end------------------------------














