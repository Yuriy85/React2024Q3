import { Component } from 'react';

interface State {
  search: string;
}

interface Props {
  setSearchWord: (word: string) => void;
}

class Search extends Component<Props, State> {
  public state: Readonly<State> = { search: '' };
  componentDidMount(): void {
    const searchText = localStorage.getItem('search');
    if (searchText) {
      this.setState({ search: searchText });
    }
  }

  render() {
    return (
      <div className="search container">
        <input
          value={this.state.search}
          className="search__input"
          onChange={(event) => {
            this.setState({ search: event.currentTarget.value });
          }}
        ></input>
        <button
          onClick={() => {
            this.props.setSearchWord(this.state.search);
          }}
          className="search__button"
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
