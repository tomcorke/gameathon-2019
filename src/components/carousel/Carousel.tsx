import React, { useState, useEffect } from "react";
import classnames from "classnames";

import STYLES from "./Carousel.module.scss";

interface CarouselProps {
  rotateDelay?: number;
  elements: (JSX.Element | null)[];
  spaceBetween?: boolean;
}

const ROTATE_DELAY = 10000;

const Carousel = ({
  rotateDelay = ROTATE_DELAY,
  elements,
  spaceBetween = false
}: CarouselProps) => {
  const [elementIndexToDisplay, setElementIndexToDisplay] = useState(0);

  let validElements = elements.filter(e => e);

  if (spaceBetween) {
    validElements = validElements.reduce(
      (res, el) => [...res, el, null],
      [] as (JSX.Element | null)[]
    );
  }

  useEffect(() => {
    // Don't use elementIndexToDisplay, to prevent exhaustive dependency warning
    let indexToDisplay = 0;

    const update = () => {
      let nextImage = indexToDisplay + 1;
      if (nextImage >= validElements.length) {
        nextImage = 0;
      }
      indexToDisplay = nextImage;
      setElementIndexToDisplay(nextImage);
    };

    const rotateTimer = setInterval(update, rotateDelay);

    return () => {
      clearTimeout(rotateTimer);
    };
  }, [rotateDelay, validElements]);

  return (
    <div className={STYLES.Carousel}>
      <div className={STYLES.elementContainer}>
        {validElements.map((element, i) => (
          <div
            key={i}
            className={classnames(STYLES.element, {
              [STYLES.hide]: i !== elementIndexToDisplay
            })}
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
