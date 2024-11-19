
const weights = {
    size: 0.4,
    childFriendly: 0.3,
    energyLevel: 0.3,
  };
  
  const maxEnergyLevel = 10; 
  
 
  function calculateMatchScore(userAnswers, pet) {
    let score = 0;
  
   //conditions
    if (pet.size === userAnswers.preferredSize) {
      score += weights.size; //has to be the same exact size
    }
    if (pet.isChildFriendly === userAnswers.hasChildren) {
      score += weights.childFriendly; //has to match the user's desire
    }
    const energyDiff = Math.abs(pet.energyLevel - userAnswers.preferredEnergyLevel);
    score += weights.energyLevel * (1 - energyDiff / maxEnergyLevel); //approximation
  
    return score;
  }
  function findBestMatches(userAnswers, pets, topN = 5) {
    const petScores = pets.map(pet => ({
      pet,
      score: calculateMatchScore(userAnswers, pet),
    }));
    petScores.sort((a, b) => b.score - a.score);

    return petScores.slice(0, topN).map(entry => entry.pet);
  }

const userAnswers = {
    preferredSize: 'medium',
    hasChildren: true,
    preferredEnergyLevel: 5,
  };

  const pets = [
    { id: 1, size: 'medium', isChildFriendly: true, energyLevel: 4 },
    { id: 2, size: 'small', isChildFriendly: false, energyLevel: 8 },
    { id: 3, size: 'medium', isChildFriendly: true, energyLevel: 6 },
    { id: 4, size: 'large', isChildFriendly: true, energyLevel: 5 },
    { id: 5, size: 'medium', isChildFriendly: false, energyLevel: 3 },
  ];
  const topMatches = findBestMatches(userAnswers, pets, 3);
  
  console.log('Top Matches:', topMatches);

  