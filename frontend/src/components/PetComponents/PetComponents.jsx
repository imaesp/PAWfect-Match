import { Container } from "react-bootstrap";
import "./PetComponents.scss";

export default function PetComponents({
  name,
  birthdate,
  sex,
  breed,
  size,
  descriptionPlain,
}) {
  return (
    <Container className="pc-container">
      <div className="content">
        <h2>{name}</h2>
        <p>Birthdate: {birthdate}</p>
        <p>Sex: {sex}</p>
        <p>Breed: {breed}</p>
        <p>Size: {size}</p>
        <p>
          Additional Information: <br /> {descriptionPlain}
        </p>
      </div>
    </Container>
  );
}
