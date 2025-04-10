export function insertSurveyResponses(
    client, 
    user_id,
    answers
   ) {
    return client
    .from("survey_responses")
    .insert({ user_id, answers })
    .select()
   }
   