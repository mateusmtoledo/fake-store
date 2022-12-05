import styles from './styles/SortingSelect.module.css';

export default function SortingSelect({ sortBy, setSortBy }) {
  function handleChange(e) {
    setSortBy(e.target.value);
  }

  return (
    <select
      className={styles.sortingSelect}
      value={sortBy}
      onChange={handleChange}
    >
      <option value="date-">Newest</option>
      <option value="rating-">Best rated</option>
      <optgroup label="Price">
        <option value="price+">Price (⇑)</option>
        <option value="price-">Price (⇓)</option>
      </optgroup>
    </select>
  );
}
