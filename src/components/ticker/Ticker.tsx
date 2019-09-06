import React from "react";

import { dataConsumer } from "../../data";
import { EndpointDataMap } from "../../../api/data";
import { APIDonationData } from "../../../api/types/api";
import Carousel from "../carousel";

import STYLES from "./Ticker.module.scss";

interface TickerProps {
  data: EndpointDataMap;
}

const CURRENCY_SYMBOLS: { [key: string]: string | undefined } = {
  GBP: "£",
  USD: "$"
};

const parseApiDateString = (dateString: string) => {
  // Example: "/Date(1567799636000+0000)/"
  try {
  } catch (e) {
    return null;
  }
};

const Ticker = ({ data }: TickerProps) => {
  if (!data) {
    return null;
  }

  const donations = data.donations.donations;
  const donationsToDisplay = donations.filter(d => {
    return d.amount && d.currencyCode && d.donorDisplayName;
  });

  if (donationsToDisplay.length === 0) {
    return null;
  }

  const topDonation = donationsToDisplay.sort(
    (a, b) => parseFloat(b.amount!) - parseFloat(a.amount!)
  )[0];

  const latestDonation = donationsToDisplay.sort((a, b) => b.id - a.id)[0];

  const formatAmount = (amount: string) => {
    return Number.parseFloat(amount).toFixed(2);
  };

  const donationDisplay = (d: APIDonationData) => (
    <span key={d.id}>
      {d.donorDisplayName} -{" "}
      {CURRENCY_SYMBOLS[d.currencyCode] || d.currencyCode}
      {formatAmount(d.amount!)} {d.message ? ` - ${d.message}` : null}
    </span>
  );

  return (
    <div className={STYLES.Ticker}>
      <Carousel
        rotateDelay={10000}
        elements={[
          topDonation ? (
            <span className={STYLES.message}>
              Top donation: {donationDisplay(topDonation)}
            </span>
          ) : null,

          latestDonation ? (
            <span className={STYLES.message}>
              Latest donation: {donationDisplay(latestDonation)}
            </span>
          ) : null
        ]}
        spaceBetween={true}
      />
    </div>
  );
};

const WrappedTicker = dataConsumer(Ticker);

export default WrappedTicker;
