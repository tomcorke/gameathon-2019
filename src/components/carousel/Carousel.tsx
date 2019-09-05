import React, { useState, useEffect } from "react";
import classnames from "classnames";

import STYLES from "./Carousel.module.scss";

interface CarouselProps {
  rotateDelay?: number
  elements: JSX.Element[];
}

const ROTATE_DELAY = 10000;

const Carousel = ({ rotateDelay = ROTATE_DELAY, elements }: CarouselProps) => {

  const [elementIndexToDisplay, setElementIndexToDisplay] = useState(0);

  useEffect(() => {
    // Don't use elementIndexToDisplay, to prevent exhaustive dependency warning
    let indexToDisplay = 0

    const update = () => {
      let nextImage = indexToDisplay + 1;
      if (nextImage >= elements.length) {
        nextImage = 0;
      }
      indexToDisplay = nextImage;
      setElementIndexToDisplay(nextImage);
    }

    const rotateTimer = setInterval(update, rotateDelay)

    return () => {
      clearTimeout(rotateTimer);
    };
  }, [rotateDelay, elements]);

  return (
    <div className={STYLES.Carousel}>
      <div className={STYLES.elementContainer}>
        {elements.map((element, i) => (
          <div
            key={i}
            className={classnames(STYLES.element, {
              [STYLES.hide]: i !== elementIndexToDisplay
            })}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
