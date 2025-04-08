import useSupabase from "./useSupabase"; //Supabase Client Hook
import { updateSurveyResponses } from "../queries/updateSurveyResponses"; //Our query
import { useMutation } from "@tanstack/react-query";  //useMutation for data manipulation


function useUpdateSurveyResponse() {
  const client = useSupabase();  //Get our supabase client
  return useMutation({
    mutationFn: async ({ user_id, answers }) => { //useMutatuon requires one things: a mutation function (a promise)
      const result = await updateSurveyResponses(client, user_id, answers);
      return result?.data;
    }
  });
}

export default useUpdateSurveyResponse;