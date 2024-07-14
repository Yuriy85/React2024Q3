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
  growth_time: number;
  smoothness: number;
  max_harvest: number;
}

export const getPokes = async (
  api: string,
  page = 1,
  limit = 20
): Promise<{ pokes: Pokes; pages: number }> => {
  let result = (
    await axios.get(api, {
      params: {
        limit,
      },
    })
  ).data;
  const pokesCount = result.count;
  const pageCount = Math.ceil(pokesCount / limit);
  console.log(page);
  if (isNaN(page) || page < 1 || page > pageCount) {
    throw new Error('Page not found');
  }
  const offset = (page - 1) * limit;
  if (page !== 1) {
    result = (
      await axios.get(api, {
        params: {
          limit,
          offset,
        },
      })
    ).data;
  }

  return { pokes: result, pages: pageCount };
};

export const getPoke = async (url: string): Promise<Poke> => {
  const result = (
    await axios.get(url, {
      params: {},
    })
  ).data;

  return result;
};
