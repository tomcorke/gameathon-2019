import classnames from "classnames";
import React from "react";

import STYLES from "./AutoScroller.module.scss";

interface AutoScrollerProps {
  width: string;
  height: string;
  leftChildren: JSX.Element | JSX.Element[];
  rightChildren: JSX.Element | JSX.Element[];
  fast?: boolean;
}

const AutoScroller = ({
  width,
  height,
  leftChildren,
  rightChildren,
  fast = false
}: AutoScrollerProps) => {
  return (
    <div
      className={classnames(STYLES.AutoScroller, { [STYLES.fast]: fast })}
      style={{ width, height }}
    >
      <div className={STYLES.scroller}>
        <div className={STYLES.left}>{leftChildren}</div>
        <div className={STYLES.right}>{rightChildren}</div>
      </div>
    </div>
  );
};

export default AutoScroller;
