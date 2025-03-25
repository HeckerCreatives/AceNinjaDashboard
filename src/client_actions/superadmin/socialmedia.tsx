import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface SocialMediaItem {
    _id: string;
    link: string;
    title: string;
    type: string;
    createdAt: string; 
    updatedAt: string;
    __v: number;
  }
  
  // Define the full API response type
  export interface SocialMediaResponse {
    message: string;
    data: SocialMediaItem[];
  }
  


export const getSocialMedia = async (): Promise<SocialMediaResponse> => { 
  const response = await axiosInstance.get(
    "/sociallinks/getsociallinks",
  );
  return response.data
};


export const useGetSocialMedia = () => {
  return useQuery({
    queryKey: ["socialmedia"],
    queryFn: () => getSocialMedia(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const addSocials = async (title: string, link: string, type: string) => { 
    const response = await axiosInstance.post("/sociallinks/createsociallink", { title, link, type });
    return response.data;
};
  
export const useAddSocials = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ title, link, type }: { title: string, link: string, type: string}) =>
        addSocials(title, link, type),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["socialmedia"] });
        }
    });
};


export const updateSocials = async (id: string ,title: string, link: string, type: string) => { 
    const response = await axiosInstance.post("/sociallinks/editsociallink", { id, title, link, type });
    return response.data;
};
    
  export const useUpdateSocials = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, title, link, type }: { id: string ,title: string, link: string, type: string}) =>
            updateSocials(id, title, link, type),
          onError: (error) => {
              handleApiError(error);
          },
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["socialmedia"] });
          }
      });
  };
  

  















