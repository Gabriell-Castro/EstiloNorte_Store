import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import styles from './Products.module.scss';

function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { products, loading, error } = useProducts(search, category);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal="up">
          <span className={styles.label}>Catálogo</span>
          <h1>Produtos</h1>
          <p>Escolha por categoria, busque pelo nome e navegue por uma grade estável em qualquer cenário.</p>
        </div>

        <div className={styles.filtersCard} data-reveal="up">
          <input
            type="text"
            placeholder="Buscar por nome"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">Todas as categorias</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Calças">Calças</option>
            <option value="Jaquetas">Jaquetas</option>
            <option value="Vestidos">Vestidos</option>
            <option value="Moletons">Moletons</option>
            <option value="Tops">Tops</option>
            <option value="Camisas">Camisas</option>
            <option value="Shorts">Shorts</option>
          </select>
        </div>

        {loading && <p className={styles.message}>Carregando...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && products.length === 0 && (
          <div className={styles.empty} data-reveal="up">
            <h2>Nenhum produto encontrado</h2>
            <p>Tente outro termo de busca ou escolha outra categoria.</p>
          </div>
        )}

        <div className={styles.grid}>
          {products.map((product, index) => (
            <div key={product.id} data-reveal="up" style={{ transitionDelay: `${index * 50}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
