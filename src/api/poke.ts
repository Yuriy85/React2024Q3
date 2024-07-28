import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import appData from '../data';

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
  growth_time: number;
  smoothness: number;
  max_harvest: number;
}

export const fetchPoke = createApi({
  reducerPath: 'fetchPoke',
  baseQuery: fetchBaseQuery({ baseUrl: appData.baseUrl }),
  endpoints: (build) => ({
    getAllPoke: build.query<Pokes, number>({
      query: (offset = 0, limit = appData.pageLimit) => ({
        url: '',
        params: { limit, offset },
      }),
    }),

    getPokeInfo: build.query<Poke, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});
