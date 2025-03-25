import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  type: "image" | "video"; 
  url: string; 
};

export type NewsResponse = {
  message: "success" | "failed"; 
  data: NewsItem[]; 
  totalPages: number;
};


export const getNews = async (page: number, limit: number): Promise<NewsResponse> => { 
  const response = await axiosInstance.get(
    "/news/getnews",
    {params:{page, limit}}
   
  );
  return response.data
};


export const useGetNews = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["news",page, limit],
    queryFn: () => getNews(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const createNews = async ( title: string, content: string, contentType: string, url: File | string) => { 
     const response = await axiosInstanceFormData.post("/news/createnews", {  title, content, contentType, url});
     return response.data;
};
  
export const useCreateNews = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ title, content, contentType, url }: {  title: string, content: string, contentType: string, url: File | string}) =>
        createNews( title, content, contentType, url),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["news"] });
         }
     });
};


export const deleteNews = async (id: string) => { 
    const response = await axiosInstance.post("/news/deletenews", { id });
    return response.data;
  };
  
  export const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id }: { id: string }) =>
        deleteNews(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
          }
        
      
       
    });
  };


export const editNews = async ( newsid: string,title: string, content: string, contentType: string, url: File | string) => { 
    const response = await axiosInstanceFormData.post("/news/editnews", {  newsid,title, content, contentType, url});
    return response.data;
};
 
export const useEditNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ newsid,title, content, contentType, url }: {  newsid: string,title: string, content: string, contentType: string, url: File | string}) =>
        editNews( newsid,title, content, contentType, url),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
        }
    });
};

















