import { useMutation } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { updateSurveyResponses } from "../queries/updateSurveyResponses";

export function useUpdateSurveyResponse() {
    const client = useSupabase();
    const mutationFn = async ({ user_id, answers }) => {
      return updateSurveyResponses(client, user_id, answers).then(
        (result) => result.data
      );
    };
    return useMutation({ mutationFn })
  }