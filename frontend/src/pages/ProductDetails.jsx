import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../api/api';
import { useCart } from '../context/CartContext';
import styles from './ProductDetails.module.scss';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await apiRequest(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className={styles.message}>Carregando produto...</p>;
  if (error) return <p className={`${styles.message} ${styles.error}`}>{error}</p>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <img src={product.image} alt={product.name} className={styles.image} />

          <div className={styles.card}>
            <span className={styles.badge}>{product.category}</span>
            <h1>{product.name}</h1>
            <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.infoGrid}>
              <div><span>Tamanhos</span><strong>{product.sizes.join(', ')}</strong></div>
              <div><span>Estoque</span><strong>{product.stock}</strong></div>
            </div>
            <button onClick={() => addToCart(product)} className={styles.primaryButton}>Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
