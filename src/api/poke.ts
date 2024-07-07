import axios from 'axios';

export interface Pokes {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Poke {
  name: string;
  size: number;
  firmness: {
    name: string;
  };
  natural_gift_type: {
    name: string;
  };
  gift_power: number;
  growth_time: number;
  smoothness: number;
  max_harvest: number;
}

export const getPokes = async (api: string): Promise<Poke | Pokes> => {
  const result = (
    await axios.get(api, {
      params: {},
    })
  ).data;
  return result;
};
