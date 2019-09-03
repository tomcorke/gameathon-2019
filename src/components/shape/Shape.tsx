import classnames from "classnames";
import React from "react";

import STYLES from "./Shape.module.scss";

const rangeUnits = (start: number, end: number, suffix: string = "px") => {
  return `${Math.floor(Math.random() * (end - start)) + start}${suffix}`;
};
const randomFrom = <T extends any>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const shapeColours = ["magenta", "cyan", "blue"];
const randomColour = () => randomFrom(shapeColours);

const lineFunction = () => {
  const style = {
    left: rangeUnits(0, 100, "%"),
    top: rangeUnits(0, 100, "%"),
    width: rangeUnits(25, 125),
    height: rangeUnits(2, 10),
    backgroundColor: randomColour()
  };
  return <div className={STYLES.Shape} style={style} />;
};

const shapeFunctions = [
  () => {
    const size = rangeUnits(10, 30);
    const style = {
      left: rangeUnits(0, 100, "%"),
      top: rangeUnits(0, 100, "%"),
      width: size,
      height: size,
      borderColor: randomColour()
    };
    return (
      <div className={classnames(STYLES.Shape, STYLES.square)} style={style} />
    );
  },
  () => {
    const size = rangeUnits(10, 40);
    const style = {
      left: rangeUnits(0, 100, "%"),
      top: rangeUnits(0, 100, "%"),
      width: size,
      height: size,
      borderColor: randomColour()
    };
    return (
      <div className={classnames(STYLES.Shape, STYLES.circle)} style={style} />
    );
  },
  () => {
    const style = {
      left: rangeUnits(0, 100, "%"),
      top: rangeUnits(0, 100, "%"),
      width: "40px",
      height: "5px"
    };
    const xStyle = {
      backgroundColor: randomColour()
    };
    return (
      <div className={classnames(STYLES.Shape, STYLES.x)} style={style}>
        <div className={STYLES.a} style={xStyle} />
        <div className={STYLES.b} style={xStyle} />
      </div>
    );
  }
];

const Shape = () => {
  return randomFrom([lineFunction, lineFunction, randomFrom(shapeFunctions)])();
};

export default Shape;
