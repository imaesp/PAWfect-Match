
import Carousel from 'react-bootstrap/Carousel';
//import CarouselImage from 'pages/carouselImage';
import './CarouselAdopt.scss';

function CarouselAdopt(){
    return(
        <>
            <Carousel>
                <Carousel.Item>
                    <img src="/CD2.webp" alt='Carousel Picture of animals 1' className='Img1'/>
                    <Carousel.Caption>
                        <h3>Adopt a New Best Friend</h3>
                        <p>Because every pet deserves a loving home</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img src='/CD.png' alt='Carousel Picture of animals 2' className='Img2'/>
                    <Carousel.Caption>
                        <h3>Whether it's a Playful Pup or a Cuddly Cat</h3>
                        <p> We have the PAWfect companion waiting for you!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img src='/CD3.jpg' alt='Carousel Picture of animals 3' className='Img3'/>
                    <Carousel.Caption>
                        <h3>Find Your Furry Soulmate</h3>
                        <p>Unconditional love is just a click away!</p>
                    </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
        </>
    );
}


export default CarouselAdopt;
