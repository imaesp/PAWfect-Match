import useSupabase from "./useSupabase";
import { insertSurveyResponses } from "../queries/insertSurveyResponses";
import { useMutation } from "@tanstack/react-query";


function useInsertSurveyResponse() {
  const client = useSupabase(); 
  return useMutation({
    mutationFn: async ({ user_id, answers }) => { 
      const result = await insertSurveyResponses(client, user_id, answers);
      return result?.data;
    }
  });
}

export default useInsertSurveyResponse;