import React from 'react';
import { useEffect, useState } from 'react';
import PokeCard from '../PokeCard';
import appData from '../../data';
import { Pokes, fetchPoke } from '../../api/poke';
import Loader from '../Loader';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { trimPath } from '../../utils/trimPath';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface Props {
  searchWord: string;
  setPageCount: React.Dispatch<React.SetStateAction<number | null>>;
}

function PokeData(props: Props) {
  const [offset, setOffset] = useState(0);
  const { data: pokes, error, isFetching } = fetchPoke.useGetAllPokeQuery(offset);
  const [filteredPokes, setFilteredPokes] = useState(pokes);
  const [noResult, setNoResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams();
  const { detail } = useParams();

  const setUpperChar = (string: string) => `${string[0].toUpperCase()}${string.slice(1)}`;
  const filterPokes = (pokeData: Pokes, searchWord: string) => {
    const result = pokeData.results.filter((poke) =>
      poke.name.toLowerCase().includes(searchWord.toLowerCase().trimStart())
    );
    setNoResults(!result.length);
    const filteredPokes: Pokes = { ...pokeData, results: result };
    return filteredPokes;
  };

  useEffect(() => {
    if (!pokes) return;
    setFilteredPokes(filterPokes(pokes, props.searchWord));
    props.setPageCount(Math.ceil(pokes.count / appData.pageLimit));
  }, [pokes, props.searchWord]);

  useEffect(() => {
    if (!page) return;
    setOffset((+page - 1) * appData.pageLimit);
  }, [page]);

  return (
    <div className="poke-data container">
      <div
        className="container"
        onClick={() => detail && navigate(trimPath(location.pathname, 'detail'))}
      >
        {error && <h2>{(error as FetchBaseQueryError).status}</h2>}
        {isFetching && <Loader />}
        {noResult && <h2>Sorry, not found.</h2>}
        {filteredPokes &&
          filteredPokes.results.map((result) => (
            <PokeCard key={result.name} name={setUpperChar(result.name)} url={result.url} />
          ))}
      </div>
      <Outlet />
    </div>
  );
}

export default PokeData;
