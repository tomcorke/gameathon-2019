import React from "react";

import STYLES from "./ProgressBar.module.scss";

interface ProgressBarProps {
  value?: number;
  total?: number;
  label?: string;
  prefix?: string;
}

const ProgressBar = ({
  value = 0,
  total = 0,
  label,
  prefix = ""
}: ProgressBarProps) => {
  // Calculate percentage to 1 decimal place
  const progressWidth =
    total > 0 ? Math.min(66, Math.floor((value / total) * 1000) / 10) : 0;
  return (
    <div className={STYLES.ProgressBar}>
      <div className={STYLES.BarContainer}>
        <div className={STYLES.Bar} style={{ width: `${progressWidth}%` }} />
      </div>
      <div className={STYLES.TextContainer}>
        <div className={STYLES.label}>{label}</div>
        <div className={STYLES.values}>
          {total > 0 ? `${prefix}${value} / ${prefix}${total}` : null}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
