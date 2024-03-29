import ProductCard from "./ProductCard";
import styles from "./styles/ProductList.module.css";
import VOID_IMG from "../images/void.svg";
import { Product } from "../hooks/useProducts";

export default function ProductList({
  products,
}: {
  products: Array<Product>;
}) {
  if (!products.length) {
    return (
      <div className={styles.noResults}>
        <img src={VOID_IMG} alt="No results found" />
        <p>No results found</p>
      </div>
    );
  }

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
