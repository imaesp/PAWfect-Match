import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/supabaseClient";
import PetCarousel from "../../components/PetComponents/PetCarousel";
import PetComponents from "../../components/PetComponents/PetComponents";

const PetPage = () => {
  const { animalID } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { data, error } = await supabase
          .from("pets")
          .select(
            "name, birthdate, sex, breed, size, descriptionPlain, pictures"
          )
          .eq("animalID", animalID)
          .single();
        if (error) throw error;
        setPet(data);
      } catch (error) {
        console.error("Error fetching pet:", error);
      } finally {
        setLoading(false);
      }
    };
    if (animalID) {
      fetchPet();
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!pet) return <p>No pet found.</p>;

  let picturesArray = [];
  try {
    picturesArray = JSON.parse(pet.pictures.replace(/'/g, '"'));
  } catch (error) {
    console.error("Failed to parse pictures string:", error);
  }
  return (
    <>
      <PetCarousel name={pet.name} pictures={picturesArray} />
      <PetComponents
        name={pet.name}
        birthdate={pet.birthdate}
        sex={pet.sex}
        breed={pet.breed}
        size={pet.size}
        descriptionPlain={pet.descriptionPlain}
      />
    </>
  );
};

export default PetPage;
