import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from './layout';

describe('RootLayout Component', () => {
  it('renders the children passed to it', () => {
    const { getByText } = render(
      <RootLayout>
        <h1>Hello World</h1>
      </RootLayout>
    );

    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders the correct title in head', () => {
    render(
      <RootLayout>
        <h1>Hello World</h1>
      </RootLayout>
    );

    expect(document.title).toBe('ReactRS');
  });

  it('renders the main structure correctly', () => {
    const { container } = render(
      <RootLayout>
        <p>Test Content</p>
      </RootLayout>
    );

    expect(container.querySelector('html')).toBeInTheDocument();
    expect(container.querySelector('body')).toBeInTheDocument();
    expect(container.querySelector('#root')).toBeInTheDocument();
    expect(container.querySelector('#root')?.textContent).toContain('Test Content');
  });
});
