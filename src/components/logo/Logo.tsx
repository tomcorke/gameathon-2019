import React from "react";
import classnames from "classnames";

import STYLES from "./Logo.module.scss";

interface LogoProps {
  text: string;
}

const Logo = ({ text }: LogoProps) => {
  const breakText = text.replace(/\\n/g, "\n");
  return (
    <div className={classnames(STYLES.Logo)}>
      {breakText}
      <div className={classnames(STYLES.glitch, STYLES.glitchWhite)}>
        {breakText}
      </div>
      <div className={classnames(STYLES.glitch, STYLES.glitchMagenta)}>
        {breakText}
      </div>
      <div className={classnames(STYLES.glitch, STYLES.glitchCyan)}>
        {breakText}
      </div>
    </div>
  );
};

export default Logo;
