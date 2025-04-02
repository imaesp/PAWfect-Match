import { getPets } from "../queries/getPets";
import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";

function useGetPets() {
    const client = useSupabase(); 
    const queryKey = ["pets"]; 

    return useQuery({
        queryKey,
        queryFn: async () => {
            const result = await getPets(client); 
            return result?.data;
        },
        staleTime: 1000 * 60 * 5, 
    });
}

export default useGetPets;
