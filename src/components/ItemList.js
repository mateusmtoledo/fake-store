import { useState } from "react";
import Card from "./Card";
import styles from "./styles/ItemList.module.css";

export const itemsPerPage = 12;

function ItemList({ itemArray, addToCart }) {
  const [ currentPage, setCurrentPage ] = useState(1);
  
  const numberOfPages = Math.ceil(itemArray.length / itemsPerPage);
  const startIndex = itemsPerPage * (currentPage - 1);
  const endIndex = itemsPerPage * (currentPage);

  function nextPage() {
    const newPage = Math.min(numberOfPages, currentPage + 1);
    setCurrentPage(newPage);
  }
  
  function previousPage() {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
  }

  return (
    <div className={styles.itemList}>
      <div className={styles.products}>
        { 
          itemArray
            .slice(startIndex, endIndex)
            .map((item) => <Card key={item.id} item={item} addToCart={addToCart} />)
        }
      </div>
      <div className={styles.navigation}>
        <button type="button" onClick={previousPage}>{'<'}</button>
        <p>Page {currentPage} of {numberOfPages}</p>
        <button type="button" onClick={nextPage}>{'>'}</button>
      </div>
    </div>
  );
}

export default ItemList;
