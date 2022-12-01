import { render, screen } from "@testing-library/react";
import UserRating from '../UserRating';

describe('UserRating', () => {
  it('renders 5 stars', () => {
    render(<UserRating rating={3.7} count={115} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(5);
  });

  it('renders the correct rating', () => {
    render(<UserRating rating={3.7} count={115} />);
    const fullStars = screen.getAllByAltText('Full star');
    const halfStars = screen.getAllByAltText('Half star');
    const emptyStars = screen.getAllByAltText('Empty star');
    expect(fullStars.length).toBe(3);
    expect(halfStars.length).toBe(1);
    expect(emptyStars.length).toBe(1);
  });
});
