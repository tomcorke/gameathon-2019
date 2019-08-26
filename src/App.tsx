import React from 'react';
import Logo from './components/logo';
import TransformContainer from './components/transformContainer';

import STYLES from './App.module.scss'
import AutoScroller from './components/autoscroller';
import Shape from './components/shape';

const createShapes = (numShapes: number) => {
  const shapes: JSX.Element[] = [...Array(numShapes)].map(() => <Shape />)
  const left = shapes.slice(0, numShapes / 2);
  const right = shapes.slice((numShapes / 2) + 1)
  return [ left, right ]
}

const App: React.FC = () => {

  // Create some shapes!
  const [ left, right ] = createShapes(40)
  const [ leftFast, rightFast ] = createShapes(40)

  return (
    <div className={STYLES.App}>
      <TransformContainer rotate={-10} top='50px' left='50px'>
        <TransformContainer top='-30px'>
          <AutoScroller
            width='1500px'
            height='120px'
            leftChildren={left}
            rightChildren={right}
          />
        </TransformContainer>
        <AutoScroller
          width='1500px'
          height='80px'
          leftChildren={leftFast}
          rightChildren={rightFast}
          fast
        />
        <TransformContainer skew={-5}>
          <Logo text='GAME\n&nbsp;&nbsp;&nbsp;-A-THON' />
        </TransformContainer>
      </TransformContainer>
    </div>
  );
}

export default App;
