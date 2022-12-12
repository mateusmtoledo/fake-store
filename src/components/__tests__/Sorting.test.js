import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sorting from '../Sorting';
import userEvent from '@testing-library/user-event';

const setSortBy = jest.fn();

describe('Sorting', () => {
  it('renders options', () => {
    render(<Sorting setSortBy={setSortBy} />);
    expect(screen.getByText(/best rated/i)).toHaveValue('rating-');
    expect(screen.getByText(/latest/i)).toHaveValue('date-');
    expect(screen.getByText('Price (⇑)')).toHaveValue('price+');
    expect(screen.getByText('Price (⇓)')).toHaveValue('price-');
  });

  describe('on change', () => {
    it('calls setSortBy with correct arguments', () => {
      render(<Sorting setSortBy={setSortBy} />);
      userEvent.selectOptions(screen.getByRole('combobox'), ['date-']);
      expect(setSortBy).toBeCalledWith('date-');
    });
  });
});
