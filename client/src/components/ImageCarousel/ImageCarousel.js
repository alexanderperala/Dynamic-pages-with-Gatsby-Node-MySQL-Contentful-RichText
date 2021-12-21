import React from "react";
import Slider from "react-slick";
import "./imageCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GatsbyImage } from "gatsby-plugin-image";



const ImageCarousel = ({ data }) => {
  

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: true, 
    centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
          
        }
      },
     
    ]
  };

  return (
    <div className="sliderContainer">
      <Slider {...settings}>
        {data.images.map((node,index) => (
          <div key={index} className="imageCard">
            <GatsbyImage image={node.gatsbyImageData} alt="" className="sliderImage" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
