import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '.';

describe('Loader Component', () => {
  it('renders the loading message', () => {
    render(<Loader />);
    const loaderElement = screen.getByText('...Loading...');
    expect(loaderElement).toBeInTheDocument();
  });

  it('has the correct className', () => {
    render(<Loader />);
    const loaderElement = screen.getByText('...Loading...');
    expect(loaderElement).toHaveClass('loader');
  });
});
