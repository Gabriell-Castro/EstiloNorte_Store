import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.scss';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.body}>
        <span className={styles.badge}>{product.category}</span>
        <h3>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footerRow}>
          <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
          <span className={styles.stock}>Estoque {product.stock}</span>
        </div>
        <div className={styles.actions}>
          <Link to={`/products/${product.id}`} className={styles.secondaryButton}>Detalhes</Link>
          <button onClick={() => addToCart(product)} className={styles.primaryButton}>Adicionar</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
