interface Props {
  name: string;
  url: string;
}

function PokeCard(props: Props) {
  return (
    <div className="poke-data__card">
      <h2>{props.name}</h2>
      <p>Url: {props.url}</p>
    </div>
  );
}

export default PokeCard;
