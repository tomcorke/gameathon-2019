import React from "react";

import Carousel from '../carousel';

import STYLES from "./ImageCarousel.module.scss";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {

  return (
    <div className={STYLES.ImageCarousel}>
      <Carousel rotateDelay={7500} elements={images.map((image, i) => (
        <img
          className={STYLES.image}
          src={image}
          alt=""
        />
      ))} />
    </div>
  );
};

export default ImageCarousel;
