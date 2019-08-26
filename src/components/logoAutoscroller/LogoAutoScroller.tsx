import React from 'react'

import STYLES from './SimpleAutoScroller.module.scss'

interface LogoAutoScrollerProps {
  logos: JSX.Element[]
}

const LogoAutoScroller = ({ logos }: LogoAutoScrollerProps) => {

  const widthPerLogo = 100 / logos.length;
  return (
    <div className={STYLES.LogoAutoScroller}>
      {logos.map((logo, i) => (
        <div className={STYLES.logo} style={{ left: `${widthPerLogo * i}%` }}>
          {logo}
        </div>
      ))}
    </div>
  )
}

export default LogoAutoScroller