import { Promise as BluebirdPromise } from "bluebird";
import request from "request-promise-native";

import { APIFundraiserInfo } from "./types/api";
import {
  DonationsEndpointResult,
  MergedDonationsEndpointResult
} from "./types/endpoint-result-types";

const { FUNDRAISER_NAME, JUSTGIVING_API_KEY } = process.env;

if (!FUNDRAISER_NAME || !JUSTGIVING_API_KEY) {
  throw Error(
    "FUNDRAISER_NAME and JUSTGIVING_API_KEY must be provided in environment variables"
  );
}

const endpoints: { [name: string]: string } = {
  info: `http://api.justgiving.com/v1/fundraising/pages/${FUNDRAISER_NAME}`,
  donations: `http://api.justgiving.com/v1/fundraising/pages/${FUNDRAISER_NAME}/donations`
};

type EndpointData = any;
type EndpointDataPromise = Promise<EndpointData>;

const getEndpoint = (endpoint: string): EndpointDataPromise => {
  return request({
    url: endpoint,
    headers: {
      accept: "application/json",
      "x-api-key": JUSTGIVING_API_KEY
    }
  }).then(result => JSON.parse(result));
};

export interface EndpointDataMap {
  timestamp?: number;
  info?: APIFundraiserInfo;
  donations: MergedDonationsEndpointResult;
}

const PAGE_SIZE = 150;

const getAllDonations = async (): Promise<MergedDonationsEndpointResult> => {
  const firstPageEndpoint = `${endpoints.donations}?pageSize=${PAGE_SIZE}`;
  const firstPage = (await getEndpoint(
    firstPageEndpoint
  )) as DonationsEndpointResult;
  const pagination = firstPage.pagination;

  if (pagination.totalPages === 1) {
    return firstPage;
  }

  const pageFetchers: Array<Promise<DonationsEndpointResult>> = [];
  for (let i = 2; i <= pagination.totalPages; i += 1) {
    const pageEndpoint = `${endpoints.donations}?pageNum=${i}&pageSize=${PAGE_SIZE}`;
    pageFetchers.push(getEndpoint(pageEndpoint));
  }

  const pageResults = await BluebirdPromise.map(
    pageFetchers,
    data => {
      return data;
    },
    { concurrency: 5 }
  );

  const mergedResults: MergedDonationsEndpointResult = pageResults.reduce(
    (allResults, page) => {
      return {
        ...allResults,
        donations: allResults.donations.concat(page.donations)
      };
    },
    firstPage
  );

  return mergedResults;
};

const getData = async (): Promise<EndpointDataMap> => {
  return {
    timestamp: Date.now(),
    info: (await getEndpoint(endpoints.info)) as APIFundraiserInfo,
    donations: await getAllDonations()
  };
};

export { getData };
