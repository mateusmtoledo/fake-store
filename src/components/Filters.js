import { capitalizeString } from '../utils/stringUtils';
import styles from './styles/Filters.module.css';
import FILTER_ICON from '../images/filter.svg';
import Modal from './Modal';
import CLOSE_ICON from '../images/close.svg';

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

export function MobileFiltersButton({ setModalVisible }) {
  return (
    <button className={styles.openButton} onClick={() => setModalVisible(true)}>
      <img src={FILTER_ICON} alt="Filters" width="16px" height="16px" />
      <p>Filters</p>
    </button>
  );
}

export function MobileFiltersMenu({ setModalVisible, ...props }) {
  return (
    <Modal>
      <Filters {...props} mobile setModalVisible={setModalVisible} />
    </Modal>
  );
}

export default function Filters({
  products,
  categoriesFilters,
  addCategoryFilter,
  deleteCategoryFilter,
  priceRangeIndex,
  setPriceRangeIndex,
  mobile,
  setModalVisible,
}) {
  const categories = [
    ...products.reduce((set, product) => {
      set.add(product.category);
      return set;
    }, new Set()),
  ];

  function handleCategoryChange(e) {
    const { category } = e.target.dataset;
    if (categoriesFilters.has(category)) {
      deleteCategoryFilter(category);
    } else {
      addCategoryFilter(category);
    }
  }

  function handlePriceRangeChange(e) {
    const elementIndex = Number(e.target.dataset.index);
    if (priceRangeIndex === elementIndex) {
      setPriceRangeIndex(null);
    } else {
      setPriceRangeIndex(elementIndex);
    }
  }

  return (
    <div
      className={styles.filtersContainer + ' ' + (mobile ? styles.mobile : '')}
    >
      <div className={styles.upper}>
        <div className={styles.filtersHeadingContainer}>
          <img src={FILTER_ICON} alt="Filters" width="24px" height="24px" />
          <h2>Filters</h2>
        </div>
        {mobile && (
          <button
            id={styles.closeButton}
            onClick={() => setModalVisible(false)}
          >
            <img src={CLOSE_ICON} alt="Close menu" width="32px" height="32px" />
          </button>
        )}
      </div>
      <h3>Category</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={
                styles.filterButton +
                ' ' +
                (categoriesFilters.has(category) ? styles.selected : '')
              }
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
              className={
                styles.filterButton +
                ' ' +
                (priceRangeIndex === i ? styles.selected : '')
              }
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
