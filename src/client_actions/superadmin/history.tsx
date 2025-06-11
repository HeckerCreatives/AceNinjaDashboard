import { useDebounce } from "@/hooks/debounce";
import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Transaction {
  id: string;
  type: string;
  action: string;
  description: string;
  amount: number;
  owner: string;
  createdAt: string; // ISO date string
}

export interface PaginatedTransactionsResponse {
  message: string;
  data: Transaction[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}




export const getUserHistory = async (characterid: string,page: number, limit: number, action: string, type: string): Promise<PaginatedTransactionsResponse> => { 
  const response = await axiosInstance.get(
    "/analytics/getanalyticshistory",
    {params:{characterid,page, limit, action, type}}
   
  );
  return response.data
};


export const useGetUserHistory = (characterid: string,page: number, limit: number, action: string, type: string) => {
  return useQuery({
    queryKey: ["topup",characterid,page, limit, action, type],
    queryFn: () => getUserHistory(characterid,page, limit, action, type),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};



















