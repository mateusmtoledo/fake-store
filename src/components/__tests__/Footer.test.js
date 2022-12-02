import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders github link', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link');
    expect(githubLink.href).toBe('https://github.com/mateusmtoledo');
  });
});
