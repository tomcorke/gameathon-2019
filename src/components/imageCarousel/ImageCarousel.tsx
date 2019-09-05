import React, { useState, useEffect } from "react";
import classnames from "classnames";

import STYLES from "./ImageCarousel.module.scss";

interface ImageCarouselProps {
  images: string[];
}

let rotateTimer: NodeJS.Timeout | undefined;
const ROTATE_DELAY = 10000;

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [imageToDisplay, setImageToDisplay] = useState(0);

  useEffect(() => {
    if (rotateTimer) {
      clearTimeout(rotateTimer);
    }

    rotateTimer = setTimeout(() => {
      let nextImage = imageToDisplay + 1;
      if (nextImage >= images.length) {
        nextImage = 0;
      }
      setImageToDisplay(nextImage);
    }, ROTATE_DELAY);

    return () => {
      if (rotateTimer) {
        clearTimeout(rotateTimer);
      }
    };
  }, [imageToDisplay, images.length]);

  return (
    <div className={STYLES.ImageCarousel}>
      <div className={STYLES.imageContainer}>
        {images.map((image, i) => (
          <img
            key={image}
            className={classnames(STYLES.image, {
              [STYLES.hide]: i !== imageToDisplay
            })}
            src={image}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
