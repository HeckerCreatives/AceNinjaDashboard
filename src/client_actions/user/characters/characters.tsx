import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface Character {
  id: string;
  username: string;
}

interface GetCharactersResponse {
  message: string;
  data: Character[];
}

const getCharacters = async (): Promise<Character[]> => {
  const response = await axiosInstance.get<GetCharactersResponse>("/character/getplayercharactersweb");
  return response.data.data; // ✅ Extract only the characters array
};

export const useGetCharacters = () => {
  return useQuery<Character[], Error>({
    queryKey: ["characters"],
    queryFn: getCharacters,
    staleTime: 60000, 
  });
};
