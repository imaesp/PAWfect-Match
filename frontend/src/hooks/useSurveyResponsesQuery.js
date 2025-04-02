import { getSurveyResponses } from "../queries/getSurveyResponses"; //Our Query
import useSupabase from "./useSupabase"; //Supabase Client Hook
import { useQuery } from "@tanstack/react-query"; //useQuery for data Reads

function useSurveyResponsesQuery(user_id) {
    const client = useSupabase(); //Get our supabase client
    const queryKey = ["userSurveyResponses", user_id]; //Here we defined our queryKey as [userSurveyResponses, {user_id}]

    return useQuery({ //useQuery requires two things: 1: a query Key, 2: a query function (a promise)
        queryKey,
        queryFn: async () => {
            if (!user_id) return null;
            const result = await getSurveyResponses(client, user_id); //Here we call our Query
            return result?.data || null;
        },
        //Only fetch when user_id is True 
        enabled: !!user_id,
        //Cache data for 5 minutes before re-fetching
        staleTime: 1000 * 60 * 5, 
    });
}

export default useSurveyResponsesQuery;
