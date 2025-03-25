import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Item = {
  id: string;
  title: string;
  content: string;
  type: "image" | "video"; 
  url: string; 
};

export type Response = {
  message: "success" | "failed"; 
  data: Item[]; 
  totalPages: number;
};


export const getAnnouncement = async (page: number, limit: number, filter: string): Promise<Response> => { 
  const response = await axiosInstance.get(
    "/announcement/getannouncement",
    {params:{page, limit, filter}}
   
  );
  return response.data
};


export const useGetAnnouncement = (page: number, limit: number, filter: string) => {
  return useQuery({
    queryKey: ["announcement",page, limit, filter],
    queryFn: () => getAnnouncement(page, limit, filter),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const createAnnouncement = async ( title: string, content: string, contentType: string, url: File | string, announcementtype: string) => { 
     const response = await axiosInstanceFormData.post("/announcement/createannouncement", {  title, content, contentType, url, announcementtype});
     return response.data;
};
  
export const useCreateAnnouncement = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ title, content, contentType, url, announcementtype }: {  title: string, content: string, contentType: string, url: File | string, announcementtype:string}) =>
        createAnnouncement( title, content, contentType, url, announcementtype),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["announcement"] });
         }
     });
};


export const deleteAnnouncement = async (id: string) => { 
    const response = await axiosInstance.post("/announcement/deleteannouncement", { id });
    return response.data;
  };
  
  export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id }: { id: string }) =>
        deleteAnnouncement(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["announcement"] });
          }
        
      
       
    });
  };


export const editAnnouncement = async ( id: string,title: string, content: string, contentType: string, url: File | string) => { 
    const response = await axiosInstanceFormData.post("/announcement/updateannouncement", {  id,title, content, contentType, url});
    return response.data;
};
 
export const useEditAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id,title, content, contentType, url }: {  id: string,title: string, content: string, contentType: string, url: File | string}) =>
        editAnnouncement( id,title, content, contentType, url),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["announcement"] });
        }
    });
};

















