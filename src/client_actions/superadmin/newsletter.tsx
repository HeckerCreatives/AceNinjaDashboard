import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type NewsItem = {
  newsid: string;
  description: string;
  title: string;
  banner: string;
};

export type NewsData = {
  totalpages: number;
  news: NewsItem[];
};

export type NewsletterResponse = {
  message: string;
  data: NewsData;
};

type UploadResponse = {
  message: "success";
  data: string; // Path to the uploaded file
};



export const getNewsletter = async (page: number, limit: number, filter: string): Promise<NewsletterResponse> => { 
  const response = await axiosInstance.get(
    "/newsletter/getnewsletterlist",
    {params: {page, limit, filter}}
  );
  return response.data
};


export const useGetNewsletter = (page: number, limit: number, filter: string) => {
  return useQuery({
    queryKey: ["newsletter",page, limit, filter],
    queryFn: () => getNewsletter(page, limit, filter),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

 export const createNewsletter = async ( title: string, description: string, type: string, bannerimg: File): Promise<UploadResponse> => { 
     const response = await axiosInstanceFormData.post("/newsletter/createnewsletter", {  title, description, type, bannerimg});
     return response.data;
 };
  
export const useCreateNewsletter = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({  title, description, type, bannerimg }: { title: string, description: string, type: string, bannerimg: File}) =>
        createNewsletter( title, description, type, bannerimg),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["newsletter"] });
         }
     });
};


export const deleteNewsletter = async ( newsletterid: string) => { 
  const response = await axiosInstance.post("/newsletter/deletenewsletter", { newsletterid});
  return response.data;
};

export const useDeleteNewsletter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({  newsletterid }: { newsletterid: string}) =>
      deleteNewsletter(newsletterid),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["newsletter"] });
      }
  });
};


export const editNewsletter = async ( newsletterid: string,title: string, description: string, bannerimg: File) => { 
  const response = await axiosInstanceFormData.post("/newsletter/editnewsletter", {  newsletterid,title, description, bannerimg});
  return response.data;
};

export const useEditNewsletter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({  newsletterid,title, description,  bannerimg }: { newsletterid: string,title: string, description: string, bannerimg: File}) =>
      editNewsletter( newsletterid,title, description, bannerimg),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["newsletter"] });
      }
  });
};






  















