import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface FileItem {
  id: string
  filename: string
  originalname: string
  path: string
  folder: string
  filesize: number
  filesizeMB: number
  filesizeReadable: string
  extension: string
  version: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  source: string
}

export interface FolderItem {
  // If you expect folder objects later, define here.
  // For now it's just an empty array in the response.
}

export interface UploadResponse {
  message: string
  data: {
    folders: FolderItem[]
    files: FileItem[]
  }
}






export const getPatchFileList = async (platform: string,folderPath: string ): Promise<UploadResponse> => { 
  const response = await axiosInstance.get(
    "/patchnotefilemanager/list",{params: {platform, folderPath}},
  );
  return response.data;
};


export const useGetPatchFileList = (platform: string,folderPath: string) => {
  return useQuery({
    queryKey: ["patchfile", platform,folderPath],
    queryFn: () => getPatchFileList(platform,folderPath),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};


 export const deletePatchFile = async (fileId: string) => { 
  const response = await axiosInstance.post("/patchnotefilemanager/filedelete", {fileId});
  return response.data;
};

export const useDeletePatchFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fileId }: { fileId: string}) =>
      deletePatchFile( fileId),
      onError: (error) => {
          handleApiError(error);
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["patchfile"] });
      }
  });
};



  















