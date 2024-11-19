
import React from 'react';
import './NearYou.scss';
import { useEffect, useState } from 'react';
import supabase from '../../supabase/supabaseClient';
import './NearYou.scss';

const NearYou = () => {
  const [pets, setPets] = useState([]);


  useEffect(() => {
    getPets(); //action or function to be done.
    async function getPets() {
      try {
        const { data, error } = await supabase
          .from('pets') //table to select from
          .select('name, pictures') //the columns to be selected follow this format: ('column1, column2, column3')
          .eq('species', 'Dog') //works as the WHERE clause in SQLs
          .limit(10); //how many records do we want?

        if (error) throw error;
        if (data != null) {
          setPets(data);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }, []); //dependencies, when do we want to peform the action/function? In this case as soon as the component loads.
  console.log(pets)
  return (
    <section>
      <div className="pet-gallery">
        <h2>Pets Available Near You</h2>
        <div className="pet-cards">
          {pets.map((pet, index) => {
            let picturesArray = [];
            try {
              //pictures come in as a String of an array of links, in the following format: "[linkToPicture, linkTopicture]"
              //to parse it we need to replace every double quote with a single quote.
              picturesArray = JSON.parse(pet.pictures.replace(/'/g, '"'));
            } catch (error) {
              console.error('Failed to parse pictures string:', error);
            }
            //only the first picture of the array
            const picture = picturesArray[0];
            return (
              <div className="pet-card" key={index}>
                <img src={picture} alt={pet.name || 'Adoptable Pet'} /> 
                <div className="pet-name">{pet.name}</div>
              </div>
            );
          })}
        </div>
        <p>Meet the 9,000+ adoptable pets in your area!</p>
      </div>
    </section>
  );
};

export default NearYou;
