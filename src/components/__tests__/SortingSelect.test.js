import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortingSelect from '../SortingSelect';
import userEvent from '@testing-library/user-event';

const setSortBy = jest.fn();

describe('SortingSelect', () => {
  it('renders options', () => {
    render(<SortingSelect setSortBy={setSortBy} />);
    expect(screen.getByText(/best rated/i)).toHaveValue('rating-');
    expect(screen.getByText(/newest/i)).toHaveValue('date-');
    expect(screen.getByText('Price (⇑)')).toHaveValue('price+');
    expect(screen.getByText('Price (⇓)')).toHaveValue('price-');
  });

  describe('on change', () => {
    it('calls setSortBy with correct arguments', () => {
      render(<SortingSelect setSortBy={setSortBy} />);
      userEvent.selectOptions(screen.getByRole('combobox'), ['date-']);
      expect(setSortBy).toBeCalledWith('date-');
    });
  });
});
