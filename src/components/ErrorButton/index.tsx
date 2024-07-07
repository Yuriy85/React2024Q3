import { Component } from 'react';

interface State {
  hasError: boolean;
}

class ErrorButton extends Component {
  public state: Readonly<State> = { hasError: false };

  render() {
    if (this.state.hasError) {
      throw new Error("It's my handle fault!!!");
    }
    return (
      <button
        onClick={() => {
          this.setState({ hasError: true });
        }}
        className="error-button"
      >
        Error
      </button>
    );
  }
}

export default ErrorButton;
