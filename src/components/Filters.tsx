import { capitalizeString } from "../utils/stringUtils";
import styles from "./styles/Filters.module.css";
import FILTER_ICON from "../icons/filter.svg";
import Modal from "./Modal";
import CLOSE_ICON from "../icons/close.svg";
import { Product } from "../hooks/useProducts";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export type PriceRangeType = {
  min: number | null;
  max: number | null;
};

export const priceRanges: Array<PriceRangeType> = [
  { min: null, max: 10 },
  { min: 10, max: 20 },
  { min: 20, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 500 },
  { min: 500, max: null },
];

export function MobileFiltersButton({
  setModalVisible,
}: {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button className={styles.openButton} onClick={() => setModalVisible(true)}>
      <img src={FILTER_ICON} alt="Filters" width="16px" height="16px" />
      <p>Filters</p>
    </button>
  );
}

export function MobileFiltersMenu(props: FiltersProps) {
  return (
    <Modal>
      <Filters {...props} mobile />
    </Modal>
  );
}

interface FiltersProps {
  products: Array<Product>;
  mobile?: boolean;
  setModalVisible?: Dispatch<SetStateAction<boolean>>;
  categoriesFilters: Set<string>;
  addCategoryFilter: (category: string) => void;
  deleteCategoryFilter: (category: string) => void;
  priceRangeIndex: number | null;
  setPriceRangeIndex: Dispatch<SetStateAction<number | null>>;
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
}: FiltersProps) {
  const categories = [
    ...products.reduce((set, product) => {
      set.add(product.category);
      return set;
    }, new Set<string>()),
  ];

  function handleCategoryChange(e: MouseEvent<HTMLButtonElement>) {
    const { category } = e.currentTarget.dataset;
    if (!category) return;
    if (categoriesFilters.has(category)) {
      deleteCategoryFilter(category);
    } else {
      addCategoryFilter(category);
    }
  }

  function handlePriceRangeChange(e: MouseEvent<HTMLButtonElement>) {
    const elementIndex = Number(e.currentTarget.dataset.index);
    if (priceRangeIndex === elementIndex) {
      setPriceRangeIndex(null);
    } else {
      setPriceRangeIndex(elementIndex);
    }
  }

  return (
    <div
      className={styles.filtersContainer + " " + (mobile ? styles.mobile : "")}
    >
      <div className={styles.upper}>
        <div className={styles.filtersHeadingContainer}>
          <img src={FILTER_ICON} alt="Filters" width="32px" height="32px" />
          <h2>Filters</h2>
        </div>
        {mobile && (
          <button
            id={styles.closeButton}
            onClick={setModalVisible && (() => setModalVisible(false))}
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
                " " +
                (categoriesFilters.has(category) ? styles.selected : "")
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
                " " +
                (priceRangeIndex === i ? styles.selected : "")
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
