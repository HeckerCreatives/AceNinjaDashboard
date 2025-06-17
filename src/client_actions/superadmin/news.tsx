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

interface ItemStats {
  level: number;
  damage: number;
  defense: number;
  speed: number;
}

interface Item {
  itemid: string,
  itemname: string,
  itemgender: string,
  itemtype: string
}

interface DataEntry {
  id: string;
  title: string;
  items: Item[];
  itemtype: string;
}

interface ShowcaseResponse {
  message: string;
  data: DataEntry[];
  totalPages: number;
}



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


export const getShowcaseItems = async (page: number, limit: number): Promise<ShowcaseResponse> => { 
  const response = await axiosInstance.get(
    "/news/getitemnews",
    {params:{page, limit}}
   
  );
  return response.data
};


export const useGetShowcaseItems = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["showcase",page, limit],
    queryFn: () => getShowcaseItems(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


export const deleteShowcaseItem = async (id: string) => { 
    const response = await axiosInstance.post("/news/deleteitemnews", { id });
    return response.data;
  };
  
  export const useDeleteShowcaseItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id }: { id: string }) =>
        deleteShowcaseItem(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["showcase"] });
          }
        
      
       
    });
  };


export const createShowcaseItem = async ( title: string, items: { itemid: string; itemtype: string }[], itemtype: string) => { 
     const response = await axiosInstance.post("/news/createitemnews", {  title, items, itemtype});
     return response.data;
};
  
export const useCreateShowcaseItem = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({title, items, itemtype}: {  title: string, items: { itemid: string; itemtype: string }[], itemtype: string}) =>
        createShowcaseItem( title, items, itemtype),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["showcase"] });
         }
     });
};

export const editShowcaseItem = async ( id: string, title: string, items: { itemid: string; itemtype: string }[], itemtype: string) => { 
     const response = await axiosInstance.post("/news/edititemnews", { id, title, items, itemtype});
     return response.data;
};
  
export const useEditShowcaseItem = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ id, title, items, itemtype}: { id: string,  title: string, items: { itemid: string; itemtype: string }[], itemtype: string}) =>
        editShowcaseItem( id ,title, items, itemtype),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["showcase"] });
         }
     });
};

















