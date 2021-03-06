import React, { useState, useEffect } from "react";
import humanize from "humanize-duration";

import { EndpointDataMap } from "../../../api/data";

import ProgressBar from "../progressBar";
import Carousel from "../carousel";
import { dataConsumer } from "../../data";

import STYLES from "./DonationBar.module.scss";

const startDate = new Date(2019, 8, 6, 10);
const endDate = new Date(2019, 8, 7, 10);

const Countdown: React.FC = () => {
  const [displayString, setDisplayString] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const timeToStart = startDate.getTime() - now;
      const timeToEnd = endDate.getTime() - now;

      if (timeToStart > 0) {
        setDisplayString(
          `Time until event starts: ${humanize(timeToStart, { round: true })}`
        );
      } else if (timeToEnd > 0) {
        setDisplayString(
          `Time until event ends: ${humanize(timeToEnd, { round: true })}`
        );
      } else {
        setDisplayString("Event has ended!");
      }
    };

    const updateInterval = setInterval(update, 200);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return <span>{displayString}</span>;
};

interface DonationBarProps {
  data: EndpointDataMap;
}

const DonationBar = ({ data }: DonationBarProps) => {
  let progressBar: JSX.Element;

  if (data && data.info) {
    progressBar = (
      <ProgressBar
        value={parseFloat(data.info.grandTotalRaisedExcludingGiftAid)}
        total={parseFloat(data.info.fundraisingTarget)}
        label={data.info.title}
        prefix={data.info.currencySymbol}
      />
    );
  } else {
    progressBar = <ProgressBar label="Fetching data..." />;
  }

  return (
    <div className={STYLES.DonationBar}>
      <div className={STYLES.wrapper}>
        {progressBar}
        <div className={STYLES.messageCarousel}>
          <Carousel
            rotateDelay={20000}
            elements={[
              <div className={STYLES.message}>
                Donate to Special Effect at
                https://justgiving.com/oneday-game-a-thon
              </div>,
              <div className={STYLES.message}>
                <Countdown />
              </div>
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const WrappedDonationBar = dataConsumer(DonationBar);

export default WrappedDonationBar;
