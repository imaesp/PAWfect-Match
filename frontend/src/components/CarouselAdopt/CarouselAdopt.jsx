import Carousel from 'react-bootstrap/Carousel';
//import CarouselImage from 'pages/carouselImage';
import './CarouselAdopt.scss';

function CarouselAdopt(){
    return(
        <>
            <Carousel>
                <Carousel.Item>
                    <img src='/CarouselImage.dogpic.jpg' alt='dogpic1' className='Img1'/>
                    {/* <ExampleCarouselImage text="First slide" /> */}
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img src='pages/CarouselImage.dogpic.jpg' alt='dogpic2' className='Img2'/>
                    {/* <ExampleCarouselImage text="Second slide" /> */}
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img src='pages/CarouselImage.dogpic.jpg' alt='dogpic3' className='Img3'/>
                    {/* <ExampleCarouselImage text="Third slide" /> */}
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
        </>
    );
}





export default CarouselAdopt;