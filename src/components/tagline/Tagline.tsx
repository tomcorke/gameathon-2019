import React from "react";

import STYLES from "./Tagline.module.scss";

interface TaglineProps {
  text: string;
}

const Tagline = ({ text }: TaglineProps) => {
  return <div className={STYLES.Tagline}>{text}</div>;
};

export default Tagline;
