import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../HomePage';

describe('Home', () => {
  it('renders hero section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const heroText = [
      screen.getByText('stuff you'),
      screen.getByText('really'),
      screen.getByText('need.'),
    ];
    heroText.forEach((piece) => expect(piece).toBeInTheDocument());
  });

  it('renders cards', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(
      screen.getByText('Thousands of items for you to pick'),
    ).toBeInTheDocument();
    expect(screen.getByText('Lots of payment methods')).toBeInTheDocument();
  });
});
