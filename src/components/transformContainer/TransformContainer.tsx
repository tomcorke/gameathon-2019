import React from "react";

import STYLES from "./TransformContainer.module.scss";

interface TransformContainerProps {
  rotate?: number;
  skew?: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
  height?: string;
  children: JSX.Element | JSX.Element[];
}

const TransformContainer = ({
  rotate = 0,
  skew = 0,
  top,
  bottom,
  left,
  right,
  width,
  height,
  children
}: TransformContainerProps) => {
  return (
    <div
      className={STYLES.TransformContainer}
      style={{
        transform: `skew(${skew}deg) rotate(${rotate}deg)`,
        top,
        bottom,
        left,
        right,
        width,
        height
      }}
    >
      {children}
    </div>
  );
};

export default TransformContainer;
