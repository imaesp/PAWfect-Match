import Carousel from 'react-bootstrap/Carousel';
//import CarouselImage from 'pages/carouselImage';
import './CarouselAdopt.scss';

function CarouselAdopt(){
    return(
        <>
            <Carousel>
                <Carousel.Item>
                    <img src="src/components/CarouselAdopt/CarouselImage/CD2.webp" alt='Carousel Picture of animals 1' className='Img1'/>
                    <Carousel.Caption>
                        <h3>Adopt a new best friend</h3>
                        <p>Because every pet deserves a loving home.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img src='src/components/CarouselAdopt/CarouselImage/CD.png' alt='Carousel Picture of animals 2' className='Img2'/>
                    <Carousel.Caption>
                        <h3>Whether it's a playful pup or a cuddly cat</h3>
                        <p> We have the PAW-PURRfect companion waiting for you =^.^=</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img src='src/components/CarouselAdopt/CarouselImage/CD3.jpg' alt='Carousel Picture of animals 3' className='Img3'/>
                    <Carousel.Caption>
                        <h3>Unite with your future furry family today</h3>
                        <p> pawsitively unforgettable bonds await!</p>
                    </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
        </>
    );
}





export default CarouselAdopt;