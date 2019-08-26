import React from 'react'

import STYLES from './TransformContainer.module.scss'

interface TransformContainerProps {
  rotate?: number
  skew?: number
  top?: string
  left?: string
  children: JSX.Element | JSX.Element[]
}

const TransformContainer = ({ rotate = 0, skew = 0, top = '0', left = '0', children }: TransformContainerProps) => {
  return (
    <div
      className={STYLES.TransformContainer}
      style={{ transform: `skew(${skew}deg) rotate(${rotate}deg)`, top, left }}>
      {children}
    </div>
  )
}

export default TransformContainer