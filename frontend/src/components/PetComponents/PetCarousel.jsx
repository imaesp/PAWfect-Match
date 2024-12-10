import Carousel from "react-bootstrap/Carousel";
import "./PetCarousel.scss";

export default function PetCarousel({ name, pictures }) {
  return (
    <div className="carousel-container">
      <Carousel>
        {pictures.map((picture, i) => {
          return (
            <Carousel.Item key={i}>
              <img src={picture} className="carousel-img" />
              {/* <Carousel.Caption key={i}>
                <h3>{name}</h3>
                <br></br>
              </Carousel.Caption> */}
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
