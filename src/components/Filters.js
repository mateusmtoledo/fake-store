import { capitalizeString } from '../utils/stringUtils';
import styles from './styles/Filters.module.css';

function minmaxFactory(min, max) {
  return { min, max };
}

export const priceRanges = [
  minmaxFactory(null, 10),
  minmaxFactory(10, 20),
  minmaxFactory(20, 50),
  minmaxFactory(50, 100),
  minmaxFactory(100, 500),
  minmaxFactory(500, null),
];

export default function Filters({
  products,
  categoriesFilter,
  setCategoriesFilter,
  priceRangeIndex,
  setPriceRangeIndex,
  goToFirstPage,
}) {
  const categories = [
    ...products.reduce((set, product) => {
      set.add(product.category);
      return set;
    }, new Set()),
  ];

  function handleCategoryChange(e) {
    goToFirstPage();
    if (categoriesFilter === e.target.dataset.category) {
      setCategoriesFilter(null);
    } else {
      setCategoriesFilter(e.target.dataset.category);
    }
  }

  function handlePriceRangeChange(e) {
    goToFirstPage();
    const elementIndex = Number(e.target.dataset.index);
    if (priceRangeIndex === elementIndex) {
      setPriceRangeIndex(null);
    } else {
      setPriceRangeIndex(elementIndex);
    }
  }

  return (
    <div className={styles.filtersContainer}>
      <h2>Filters</h2>
      <h3>Category</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={category === categoriesFilter ? styles.selected : null}
              data-category={category}
              onClick={handleCategoryChange}
            >
              {capitalizeString(category)}
            </button>
          </li>
        ))}
      </ul>
      <h3>Price</h3>
      <ul>
        {priceRanges.map((range, i) => (
          <li key={i}>
            <button
              type="button"
              className={priceRangeIndex === i ? styles.selected : null}
              data-index={i}
              onClick={handlePriceRangeChange}
            >
              {range.min === null
                ? `Below $${range.max}`
                : range.max === null
                ? `Above $${range.min}`
                : `$${range.min} to $${range.max}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
