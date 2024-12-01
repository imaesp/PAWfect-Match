import axios from "axios";

// Make each field, a fraction of 100% of a match
export const weights = {
  species: 0.9,
  sex: 0.8,
  independent: 0.5,
  activityLevel: 0.5,
  energyLevel: 0.5,
  age: 0.8,
  size: 0.8,
  breed: 0.8,
  livingArea: 0.7,
  outdoorAccess: 0.7,
};

export function calculateMatchScore(userAnswers, pet, userZipcode) {
  if (!pet || pet.status === 'Unavailable') return 0;

  let score = 0;


  if (pet.species && pet.species === userAnswers.species){
    if(userAnswers.species === 'Age doesn’t matter to me'){
      score += weights.species;
    }
    score += weights.species;
  }


  if (userAnswers.sex && pet.sex === userAnswers.sex) score += weights.sex;

  if (userAnswers.activityLevel && pet.activityLevel) {
    if (
      (userAnswers.activityLevel === 'Quiet and independent' && pet.activityLevel === 'Slightly Active') ||
      (userAnswers.activityLevel === 'Energetic and social' && (pet.activityLevel === 'Moderately Active' || pet.activityLevel === 'Highly Active'))
    ) {
      score += weights.activityLevel;
    }
  }

  if (userAnswers.energyLevel && pet.energyLevel) {
    if (
      (userAnswers.energyLevel === 'Low' && pet.energyLevel === 'Low') ||
      (userAnswers.energyLevel === 'Moderate' && (pet.energyLevel === 'Moderate' || pet.energyLevel === 'High')) ||
      (userAnswers.energyLevel === 'High' && pet.energyLevel === 'High')
    ) {
      score += weights.energyLevel;
    }
  }

  if (userAnswers.age && pet.age) {
    if (
     (userAnswers.age === 'I’m open to adopting an older pet' && (pet.age === 'Senior' || pet.age === 'Adult')) ||
      (userAnswers.age === 'I’m interested in a long-term commitment with a younger pet' && (pet.age === 'Young' || pet.age === 'Baby')) ||
      (userAnswers.age === 'Age doesn’t matter to me') 
    ) {
      score += weights.age;
    }
  }

  if (userAnswers.livingArea && pet.size) {
    if (userAnswers.livingArea === 'Small' && pet.size === 'Large') {
      score -= weights.livingArea;
    }

    if (
      (userAnswers.livingArea === 'Small' && pet.size === 'Small') ||
      (userAnswers.livingArea === 'Moderate' && (pet.size === 'Small' || pet.size === 'Medium')) ||
      (userAnswers.livingArea === 'Spacious')
    ) {
      score += weights.livingArea;
    }
  }

  if (userAnswers.outdoorAccess && pet.size) {
    if (
      (userAnswers.outdoorAccess === 'No outdoor access' && pet.size === 'Small') ||
      (userAnswers.outdoorAccess === 'Limited outdoor access' && (pet.size === 'Small' || pet.size === 'Medium')) ||
      (userAnswers.outdoorAccess === 'Nearby park or green space')
    ) {
      score += weights.outdoorAccess;
    }
  }

  if (userAnswers.size && pet.size === userAnswers.size) score += weights.size;

  // Point deduction for pet restrictions, or return 0
  if (userAnswers.breed && pet.primaryBreed && userAnswers.breed.includes(pet.primaryBreed)) score -= weights.breed;

  // Distance scoring
  if (userZipcode && pet.animalLocation) {
    const distance = calculateDistance(userZipcode, pet.animalLocation); // Assume this is a function that calculates the distance
    const maxDistance = 100; // Set a threshold for maximum distance (e.g., 100 miles)
    const distanceWeight = 0.3; // Adjust how much distance affects the score (weighting factor)

    const distanceScore = Math.max(0, 1 - (distance / maxDistance)); // A lower distance yields a higher score
    score += distanceScore * distanceWeight;
  }

  return score;
}

const calculateDistance = async (zipcode1, zipcode2) => {
  try {
    const response = await axios.get(`http://localhost:5001/distance/${zipcode1}/${zipcode2}`);
    return response.data.distance;
  } catch (error) {
    console.error("Error calculating distance:", error);
    return 0; // Fallback to 0 if distance calculation fails
  }
}

export function findBestMatches(userAnswers, pets, userZipcode, topN) {
  console.log(userZipcode);
  const petScores = pets.map(pet => ({
    pet,
    score: calculateMatchScore(userAnswers, pet, userZipcode),
  }));

  petScores.sort((a, b) => b.score - a.score);

  return petScores.slice(0, topN).map(entry => entry.pet);
}
