import React, { useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { Subtract } from "utility-types";
import { Emitter } from "@servie/events";

import { EndpointDataMap } from "../api/data";

const FETCH_DATA_THROTTLE_TIMER = 30000;

let dataUpdatePromise: Promise<EndpointDataMap | null> | null = null;

const dataEventEmitter = new Emitter<{
  data: [EndpointDataMap];
}>();

const fetchData = throttle(async () => {
  return fetch("/api")
    .then(async response => {
      if (response.status !== 200) {
        throw Error(
          `Unexpected status code received when fetching data from API: ${response.status} (${response.statusText})`
        );
      }

      dataUpdatePromise = null;
      const data = (await response.json()) as EndpointDataMap;
      if (data) {
        dataEventEmitter.emit("data", data);
      }
      return data;
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}, FETCH_DATA_THROTTLE_TIMER);

const DATA_UPDATE_ATTEMPT_INTERVAL = 5000;

// Start automatic data update interval
// Data updates are emitted by dataEventEmitter in the actual update method, which is de-dupliated
setInterval(async () => {
  try {
    await fetchData();
  } catch (e) {
    console.error(e);
  }
}, Math.min(FETCH_DATA_THROTTLE_TIMER, DATA_UPDATE_ATTEMPT_INTERVAL));

interface DataProviderChildProps {
  data?: EndpointDataMap;
}

// Wrap the component which should consume data with this function
// it should accept a prop named "data" of type EndpointDataMap
// and this will be provided automatically

export const dataConsumer = <P extends DataProviderChildProps>(
  Component: React.ComponentType<P>
) => {
  type ExclusiveProps = Subtract<P, DataProviderChildProps>;
  const DataConsumerWrappedComponent: React.FC<ExclusiveProps> = (
    props: ExclusiveProps
  ) => {
    const [data, setData] = useState<EndpointDataMap | undefined>(undefined);

    useEffect(() => {
      const updateConsumerData = (newData: EndpointDataMap) => {
        setData(newData);
      };
      dataEventEmitter.on("data", updateConsumerData);
      return () => {
        dataEventEmitter.off("data", updateConsumerData);
      };
    }, []);
    return <Component {...(props as P)} data={data} />;
  };
  return DataConsumerWrappedComponent;
};
