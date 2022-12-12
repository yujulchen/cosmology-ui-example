export type ChainListType = {
  chainName: string;
  label: string;
  value: string;
  icon?: {
    png?: string;
    jpeg?: string;
    svg?: string;
  };
  ibc?: {
    source_channel?: string;
    source_denom?: string;
    dst_channel?: string;
  };
  address: string;
};

export type UserDeviceInfoType = {
  browser: string;
  device: string;
  os: string;
};
