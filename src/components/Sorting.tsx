import styles from "./styles/Sorting.module.css";
import SORT_ICON from "../icons/sort.svg";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SortingProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

export default function Sorting({ sortBy, setSortBy }: SortingProps) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value);
  }

  return (
    <div className={styles.sortingContainer}>
      <img src={SORT_ICON} alt="Sort" width="24px" height="24px" />
      <select
        className={styles.sortingSelect}
        value={sortBy}
        onChange={handleChange}
      >
        <option value="date-">Latest</option>
        <option value="rating-">Best rated</option>
        <optgroup label="Price">
          <option value="price+">Price (⇑)</option>
          <option value="price-">Price (⇓)</option>
        </optgroup>
      </select>
    </div>
  );
}
