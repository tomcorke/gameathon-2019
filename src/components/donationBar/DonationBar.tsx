import React, { useState, useEffect } from "react";

import { EndpointDataMap } from "../../../api/data";

import ProgressBar from "../progressBar";
import { fetchData } from "../../data";

let updateDataInterval: NodeJS.Timeout | undefined;

const initialData: EndpointDataMap | undefined = undefined;

const DonationBar: React.FC = () => {
  const [data, setData] = useState<EndpointDataMap | undefined>(initialData);

  useEffect(() => {
    const updateData = () => {
      fetchData().then(data => {
        if (data) {
          setData(data);
        }
      });
    };
    if (updateDataInterval) {
      clearInterval(updateDataInterval);
    }
    updateDataInterval = setInterval(updateData, 1000);

    return () => {
      if (updateDataInterval) {
        clearInterval(updateDataInterval);
      }
    };
  }, []);

  if (data && data.info) {
    return (
      <ProgressBar
        value={parseFloat(data.info.grandTotalRaisedExcludingGiftAid)}
        total={parseFloat(data.info.fundraisingTarget)}
        label={data.info.title}
        prefix={data.info.currencySymbol}
      />
    );
  } else {
    return <ProgressBar />;
    // return <ProgressBar value={50} total={100} label="Loading..." />;
  }
};

export default DonationBar;
