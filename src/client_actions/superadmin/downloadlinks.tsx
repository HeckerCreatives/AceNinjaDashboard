import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface DownloadLinkItem {
    _id: string;
    link: string;
    title: string;
    type: string;
    createdAt: string; 
    updatedAt: string;
    __v: number;
} 

export interface DownloadLinkResponse {
    message: string;
    data: DownloadLinkItem[];
}
  


export const getDonwloadlinks = async (): Promise<DownloadLinkResponse> => { 
  const response = await axiosInstance.get(
    "/downloadlinks/getdownloadlinks",
  );
  return response.data
};


export const useGetDownloadlinks = () => {
  return useQuery({
    queryKey: ["donwloadlinks"],
    queryFn: () => getDonwloadlinks(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};



export const updateDonwloadlinks = async (id: string ,title: string, link: string, type: string) => { 
    const response = await axiosInstance.post("/downloadlinks/editdownloadlinks", { id, title, link, type });
    return response.data;
};
    
  export const useUpdateDonwloadlinks = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, title, link, type }: { id: string ,title: string, link: string, type: string}) =>
          updateDonwloadlinks(id, title, link, type),
          onError: (error) => {
              handleApiError(error);
          },
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["donwloadlinks"] });
          }
      });
  };
  

  















