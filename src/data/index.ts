interface Data {
  readonly baseUrl: string;
  readonly pageLimit: number;
}
const appData: Data = {
  baseUrl: 'https://pokeapi.co/api/v2/berry/',
  pageLimit: 20,
};

export default appData;
