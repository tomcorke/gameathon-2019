import React from "react";

import Logo from "../logo";
import TransformContainer from "../transformContainer";
import Tagline from "../tagline";
import AutoScroller from "../autoscroller";
import Shape from "../shape";

const createShapes = (numShapes: number) => {
  const shapes: JSX.Element[] = [...Array(numShapes)].map((_, i) => (
    <Shape key={i} />
  ));
  const left = shapes.slice(0, numShapes / 2);
  const right = shapes.slice(numShapes / 2 + 1);
  return [left, right];
};

const CornerLogo: React.FC = () => {
  // Create some shapes!
  const [left, right] = createShapes(40);
  const [leftFast, rightFast] = createShapes(40);

  return (
    <TransformContainer rotate={-10} top="40px" left="20px" height="auto">
      <TransformContainer top="-30px">
        <AutoScroller
          width="1500px"
          height="120px"
          leftChildren={left}
          rightChildren={right}
        />
      </TransformContainer>
      <AutoScroller
        width="1500px"
        height="80px"
        leftChildren={leftFast}
        rightChildren={rightFast}
        fast
      />
      <TransformContainer skew={-5}>
        <Logo text="GAME\n&nbsp;&nbsp;&nbsp;-A-THON" />
        <TransformContainer top="85px" left="170px">
          <Tagline text="- 2019" />
        </TransformContainer>
      </TransformContainer>
    </TransformContainer>
  );
};

export default CornerLogo;
