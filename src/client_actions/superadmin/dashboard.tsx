import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type UserStats = {
    totalUsers: number;
    totalActiveUsers: number;
    totalInactiveUsers: number;
  };
  
  export type UserStatsResponse = {
    message: string;
    data: UserStats;
  };
  


export const getCounts = async (): Promise<UserStatsResponse> => { 
  const response = await axiosInstance.get(
    "/user/totalregistration",
   
  );
  return response.data
};


export const useGetCounts = () => {
  return useQuery({
    queryKey: ["usercounts"],
    queryFn: () => getCounts(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
  };
  















