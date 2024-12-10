import { Container, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./PetComponents.scss";

export default function PetComponents({
  name,
  birthdate,
  sex,
  breed,
  size,
  descriptionPlain,
}) {
  // Replace ASCII to text
  const modifiedDescription = descriptionPlain.replace(
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

  // Convert URLs to hyperlinks
  const convertUrls = (desc) => {
    const urlPattern =
      /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return desc.replace(
      urlPattern,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
  };

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

  const descriptionLinks = convertUrls(modifiedDescription);
  const descriptionEmails = convertEmails(descriptionLinks);
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
    <Container className="pc-container">
      <div className="desc-container">
        <h2>{name}</h2>
        <p>Birthdate: {birthdate}</p>
        <p>Sex: {sex}</p>
        <p>Breed: {breed}</p>
        <p>Size: {size}</p>
        <p className="info-container">
          Additional Information: <br />{" "}
          <span dangerouslySetInnerHTML={{ __html: showContent() }} />
        </p>
        <div className="sb-container">
          <Button onClick={toggleReadMore} className="show-button">
            {showMore ? "Show Less" : "Read More"}
          </Button>
        </div>
      </div>
    </Container>
  );
}
