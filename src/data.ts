import throttle from "lodash/throttle";

import { EndpointDataMap } from "../api/data";

const DATA_THROTTLE_TIMER = 30000;

let dataUpdatePromise: Promise<EndpointDataMap> | null = null;
const fetchData = async () => {
  if (!dataUpdatePromise) {
    const newDataRequest = fetch("/api")
      .then(response => {
        dataUpdatePromise = null;
        return response.json();
      })
      .catch(err => {
        console.error(err);
      });
    dataUpdatePromise = newDataRequest;
    return newDataRequest;
  }

  return dataUpdatePromise;
};

const throttledFetchData = throttle(fetchData, DATA_THROTTLE_TIMER);

export { throttledFetchData as fetchData };
