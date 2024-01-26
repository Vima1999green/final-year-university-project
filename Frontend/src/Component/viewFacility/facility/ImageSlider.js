import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Facility_css from "./facility.module.css";



function ImageSlider({ allImage }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings} className={Facility_css.gym_img_slider}>
            {allImage.map((el, index) => (
                <div key={index}>
                    <img
                        src={el.image}
                        width={"700px"}
                        height={"350px"}
                        style={{ padding: "10px", border: "2px solid #ccc", borderRadius: "9px" }}
                        alt={`Image ${index}`}
                    />
                </div>
            ))}
        </Slider>
    );
}

export default ImageSlider;
