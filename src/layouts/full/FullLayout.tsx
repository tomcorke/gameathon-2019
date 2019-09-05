import React from "react";

import TransformContainer from "../../components/transformContainer";
import ImageCarousel from "../../components/imageCarousel";
import CornerLogo from "../../components/cornerLogo";
import DonationBar from "../../components/donationBar";

import Image_SpecialEffect from "../../images/SE_Logo_Proud_To_Support_V2_White.png";
import Image_Skyscanner from "../../images/skyscanner_RGB_white.svg";
import Image_JustGiving from "../../images/JustGiving-logo-EPS-RGB.png";

const FullLayout: React.FC = () => {
  return (
    <div>
      <CornerLogo />
      <TransformContainer left="0" top="0" width="100%">
        <DonationBar />
      </TransformContainer>
      <TransformContainer right="0" top="0">
        <ImageCarousel
          images={[Image_SpecialEffect, Image_JustGiving, Image_Skyscanner]}
        />
      </TransformContainer>
      <TransformContainer left="0" bottom="0" width="100%">
        {/* <div>Hello world</div> */}
      </TransformContainer>
    </div>
  );
};

export default FullLayout;
