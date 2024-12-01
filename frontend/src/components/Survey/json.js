export const json = {
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "dropdown",
          "name": "species",
          "title": " Which type of pet do you think would be your PAWfect match?",
          "choices": [
            "Dog",
            "Cat"
          ]
        },
        {
          "type": "dropdown",
          "name": "sex",
          "title": "What's your vibe for your PAWfect match?",
          "choices": [
            "Male",
            "Female"
          ]
        },
        {
          "type": "dropdown",
          "name": "activityLevel",
          "title": "Would you prefer a pet that is:",
          "choices": [
            "Quiet and independent",
            "Energetic and social"
          ]
        },
        {
          "type": "dropdown",
          "name": "PlayHours",
          "title": "Can you dedicate a minimum of 2 hours each day for walks, play, or training activities with your pet?",
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "type": "dropdown",
          "name": "OutHours",
          "title": "On average, how many hours per day are you away from home due to work, school, or other activities?\r\n",
          "choices": [
            "Less than 6 hours",
            "Between 6 and 8 hours",
            "Over 8 hours"
          ]
        },
        {
          "type": "dropdown",
          "name": "age",
          "title": "What is your age preference?",
          "choices": [
            "I’m open to adopting an older pet",
            "I’m interested in a long-term commitment with a younger pet",
            "Age doesn’t matter to me, I’m open to pets of all ages!"
          ]
        },
        {
          "type": "dropdown",
          "name": "budget",
          "title": "How much do you expect to budget for your pet on an annual basis?",
          "choices": [
            {
              "value": "1000",
              "text": "Less than $1,000"
            },
            {
              "value": "1300",
              "text": "$1,000 - $1,500"
            },
            {
              "value": "1500",
              "text": "Over $1,500"
            }
          ]
        },
        {
          "type": "dropdown",
          "name": "livingArea",
          "title": "What best describes the size of your living area?",
          "choices": [
            {
              "value": "Small",
              "text": "Small (e.g., studio or one-bedroom apartment)"
            },
            {
              "value": "Moderate",
              "text": "Moderate (e.g., one- or two-bedroom apartment)"
            },
            {
              "value": "Spacious",
              "text": "Spacious (e.g., house or large apartment)"
            }
          ]
        },
        {
          "type": "dropdown",
          "name": "outdoorAccess",
          "title": "Do you have access to outdoor space for your pet?",
          "choices": [
            "No outdoor access",
            "Limited outdoor access (e.g., small balcony or shared space)",
            "Nearby park or green space"
          ]
        },
        {
          "type": "dropdown",
          "name": "size",
          "title": " Do you have size preferences for your pet selection?",
          "choices": [
            "Small",
            "Medium",
            "Large"
          ]
        },
        {
          "type": "tagbox",
          "name": "breed",
          "title": "Do you have any breed restrictions that may affect your matches(ie. allergies, living conditions(building requirements))",
          "choices": [
            "Beagle",
            "Chihuahua",
            "Shiba Inu",
            "Cairn Terrier",
            "Retriever",
            "Chow Chow",
            "Mastiff"
          ],
          "showSelectAllItem": true,
          "selectAllText": "French Bulldog"
        }
      ]
    }
  ]
}

