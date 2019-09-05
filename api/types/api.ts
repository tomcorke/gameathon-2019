export interface APIDonationData {
  amount: string | null;
  currencyCode: string;
  donationDate: string;
  donationRef: string | null;
  donorDisplayName: string;
  donorLocalAmount?: string;
  donorLocalCurrencyCode?: string;
  estimatedTaxReclaim?: number;
  id: number;
  image?: string;
  message: string;
  source: string;
  thirdPartyReference: string | null;
  charityId: number;
}

export interface APIDonationDataWithExtraData extends APIDonationData {
  hash: string;
  timestamp: number;
  approved: boolean;
}

export interface APIFundraiserInfo {
  pageId: string;
  activityCharityCreated?: boolean;
  activityType?: string;
  activityId?: string;
  attribution?: string;
  eventName: string;
  eventId: number;
  currencySymbol: string;
  currencyCode: string;
  pageShortName: string;
  title: string;
  image?: {
    caption: string;
    url: string;
    absoluteUrl: string;
  };
  imageCount?: string;
  status: string;
  owner: string;
  ownerProfileImageUrls?: {
    OriginalSize: string;
    Size150x150Face: string;
  };
  consumerId?: number;
  showEventDate?: "True" | "False";
  eventDate?: string;
  showExpiryDate?: "True" | "False";
  expiryDate?: string;
  fundraisingTarget: string;
  totalRaisedPercentageOfFundraisingTarget: string;
  totalRaisedOffline: string;
  totalRaisedOnline: string;
  totalRaisedSms: string;
  grandTotalRaisedExcludingGiftAid: string;
  totalEstimatedGiftAid: string;
  branding?: {
    buttonColour: string;
    buttonTextColour: string;
    headerTextColour: string;
    thermometerBackgroundColour: string;
    thermometerFillColour: string;
    thermometerTextColour: string;
  };
  charity?: {
    id: number;
    name: string;
    description: string;
    logoUrl: string;
    logoAbsoluteUrl: string;
    profilePageUrl: string;
    registrationNumber: string;
  };
  media?: {
    images: unknown[];
    videos: unknown[];
  };
  story?: string;
  domain: string;
  companyAppealId?: number;
  rememberedPersonSummary?: unknown;
  teams?: unknown[];
  smsCode?: string;
  pageSummaryWhat?: string;
  pageSummaryWhy?: string;
  pageSummary?: string;
}

export interface APIDonationStreamDataPayload {
  info?: APIFundraiserInfo;
  donations: APIDonationDataWithExtraData[];
}
