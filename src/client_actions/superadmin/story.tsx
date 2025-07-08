import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ApiResponse {
  message: string;
  data: Data[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

 type Data = {
    id: string
    chapter: string
    challenge: string
    status: string
    createdAt: string
}

export const getStoryHistoryAdmin = async (characterid: string, filter: string, page: number, limit: number): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/chapter/challengehistoryadmin",
    {params: {characterid, filter, page, limit}}
  );
  return response.data;
};


export const useGetStoryHistoryAdmin = (characterid: string, filter: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["story", characterid, filter, page, limit],
    queryFn: () => getStoryHistoryAdmin(characterid, filter, page, limit),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};

export const getStoryHistory = async (characterid: string, filter: string, page: number, limit: number): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/chapter/challengehistory",
    {params: {characterid, filter, page, limit}}
  );
  return response.data;
};


export const useGetStoryHistory = (characterid: string, filter: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["story", characterid, filter, page, limit],
    queryFn: () => getStoryHistory(characterid, filter, page, limit),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};
  
  















