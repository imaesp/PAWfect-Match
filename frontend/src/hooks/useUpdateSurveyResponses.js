import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { updateSurveyResponses } from "../queries/updateSurveyResponses";

export function useUpdateSurveyResponse() {
    const client = useSupabase();
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ user_id, answers }) => updateSurveyResponses(client, user_id, answers),
      onSuccess: () => {
        queryClient.invalidateQueries(["surveyResponses"]);
      },
      onError: (error) => {
        console.error("Error updating survey response:", error);
      },
    });
  }