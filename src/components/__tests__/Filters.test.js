import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from '../Filters';
import products from '../../fakeData/products.json';
import userEvent from '@testing-library/user-event';

const props = {
  products,
  categoriesFilters: new Set(),
  addCategoryFilter: jest.fn(),
  deleteCategoryFilter: jest.fn(),
  setPriceRangeIndex: jest.fn(),
};

describe('Filters', () => {
  it('renders list of categories', () => {
    render(<Filters {...props} />);
    expect(screen.getByText("Men's clothing")).toBeInTheDocument();
    expect(screen.getByText('Jewelery')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText("Women's clothing")).toBeInTheDocument();
  });

  it('renders price range filters', () => {
    render(<Filters {...props} />);
    expect(screen.getByText('Below $10')).toBeInTheDocument();
    expect(screen.getByText('$10 to $20')).toBeInTheDocument();
    expect(screen.getByText('$20 to $50')).toBeInTheDocument();
    expect(screen.getByText('$50 to $100')).toBeInTheDocument();
    expect(screen.getByText('$100 to $500')).toBeInTheDocument();
    expect(screen.getByText('Above $500')).toBeInTheDocument();
  });

  describe('when a category is clicked', () => {
    it('calls setCategoriesFilter with correct arguments', () => {
      render(<Filters {...props} />);
      userEvent.click(screen.getByText("Men's clothing"));
      expect(props.addCategoryFilter).toBeCalledWith("men's clothing");
      expect(props.deleteCategoryFilter).not.toBeCalled();
    });

    describe('if category is already selected', () => {
      it('calls deleteCategoriesFilter with correct arguments', () => {
        render(
          <Filters
            {...props}
            categoriesFilters={new Set(["men's clothing", "women's clothing"])}
          />,
        );
        userEvent.click(screen.getByText("Women's clothing"));
        expect(props.deleteCategoryFilter).toBeCalledWith("women's clothing");
        expect(props.addCategoryFilter).not.toBeCalled();
      });
    });
  });

  describe('when a price range is clicked', () => {
    it('calls setPriceRangeIndex with correct arguments', () => {
      render(<Filters {...props} />);
      userEvent.click(screen.getByText('$50 to $100'));
      expect(props.setPriceRangeIndex).toBeCalledWith(3);
    });

    describe('if price range is already selected', () => {
      it('calls setPriceRangeIndex with null', () => {
        render(<Filters {...props} priceRangeIndex={3} />);
        userEvent.click(screen.getByText('$50 to $100'));
        expect(props.setPriceRangeIndex).toBeCalledWith(null);
      });
    });
  });
});
