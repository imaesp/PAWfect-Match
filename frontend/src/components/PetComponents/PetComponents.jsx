import { Container, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./PetComponents.scss";

export default function PetComponents({
  name,
  sex,
  age,
  breed,
  size,
  housetrained,
  declawed,
  specialNeeds,
  obedienceTraining,
  descriptionPlain,
}) {
  // Replace ASCII to text
  let modifiedDescription = ''
  if(descriptionPlain) {
    modifiedDescription = descriptionPlain.replace(
      /&#39;|&amp;|&rsquo;|&quot;/g,
      (exp) => {
        const replacements = {
          "&#39;": "'",
          "&amp;": "&",
          "&rsquo;": "'",
          "&quot;": '"',
        };
        return replacements[exp];
      }
    );
  }
  


  // Convert email addresses to hyperlinks
  const convertEmails = (desc) => {
    const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
    return desc.replace(
      emailPattern,
      (email) => `<a href="mailto:${email}">${email}</a>`
    );
  };

  // Convert phone numbers to hyperlinks
  const convertNumbers = (desc) => {
    const phonePattern =
      /(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/g;
    return desc.replace(
      phonePattern,
      (phone) => `<a href="tel:${phone.replace(/\D/g, "")}">${phone}</a>`
    );
  };

  const descriptionEmails = convertEmails(modifiedDescription);
  const finalDescription = convertNumbers(descriptionEmails);
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  const showContent = () => {
    if (showMore) {
      return finalDescription;
    }
    return finalDescription.substring(0, 300) + "...";
  };

  return (
    <div className="pc-container">
      <div className="desc-container">
        <div className="image-container">
          <h2 className="pet-name">{name}</h2>
          <img className='paw-icon' src="/rightpaw.png" alt="" />
        </div>
        <p className="pet-breed">{breed}</p>
        <hr></hr>
        <div className="attributes-container">
          <p className="pet-sex">{sex}</p>
          <p className="pet-age">{age}</p>
          <p className="pet-sex">{size}</p>
        </div>
        <hr></hr>
        <h2>About</h2>
        <div className="about-container">
          {housetrained && <p>House Trained: {housetrained}</p>}
          {declawed && <p>Declawed: {declawed}</p>}
          {specialNeeds && <p>Special Needs: {specialNeeds}</p>}
          {obedienceTraining && <p>Obedience Training: {obedienceTraining}</p>}
        </div>
        <div className="info-container">
          <h2 className="info-title">Meet {name}</h2>
          <span dangerouslySetInnerHTML={{ __html: showContent() }} />
        </div>
        <div className="sb-container">
          <Button onClick={toggleReadMore} className="show-button">
            {showMore ? "Show Less" : "Read More"}
          </Button>
        </div>
      </div>
    </div>
  );
}
