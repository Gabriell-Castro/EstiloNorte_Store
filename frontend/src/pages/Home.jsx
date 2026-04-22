import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import styles from './Home.module.scss';

function Home() {
  const { products, loading } = useProducts();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 8);
  const latestProducts = products.slice(0, 4);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy} data-reveal="up">
              <span className={styles.eyebrow}>Nova coleção • Essenciais do dia a dia</span>
              <h1>Peças urbanas com modelagem atual, conforto e presença em qualquer composição.</h1>
              <p>
                Uma seleção de camisetas, jaquetas, vestidos, tops e básicos versáteis para montar looks com mais personalidade.
              </p>
              <div className={styles.heroActions}>
                <Link to="/products" className={styles.primaryButton}>Explorar coleção</Link>
                <Link to="/register" className={styles.secondaryButton}>Criar conta</Link>
              </div>
              <div className={styles.metrics}>
                <div><strong>Entrega nacional</strong><span>Envio para todo o Brasil</span></div>
                <div><strong>Novidades frequentes</strong><span>Atualização constante do catálogo</span></div>
                <div><strong>Compra simples</strong><span>Navegação rápida e objetiva</span></div>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.highlightCard} data-reveal="up">
                <span className={styles.tag}>Favoritos da semana</span>
                <h2>Itens em destaque para montar uma vitrine forte logo na primeira visita.</h2>
                <ul>
                  <li>Seleção com peças casuais e atemporais</li>
                  <li>Filtros rápidos por categoria</li>
                  <li>Carrinho persistente por usuário</li>
                </ul>
              </div>
              <div className={styles.heroGrid}>
                {featuredProducts.slice(0, 2).map((product, index) => (
                  <article key={product.id} className={styles.miniCard} data-reveal="up" style={{ transitionDelay: `${index * 80}ms` }}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.category}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-reveal="up">
            <div>
              <span className={styles.label}>Em destaque</span>
              <h2>Produtos selecionados</h2>
              <p>Uma vitrine com mais presença visual para destacar o catálogo logo na home.</p>
            </div>
            <Link to="/products" className={styles.secondaryButton}>Ver tudo</Link>
          </div>

          {loading ? <p className={styles.message}>Carregando produtos...</p> : (
            <div className={styles.grid}>
              {featuredProducts.map((product, index) => (
                <div key={product.id} data-reveal="up" style={{ transitionDelay: `${index * 60}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} data-reveal="up">
            <div>
              <span className={styles.label}>Novidades</span>
              <h2>Seleção da semana</h2>
              <p>Peças para complementar a vitrine principal e enriquecer a experiência da página inicial.</p>
            </div>
          </div>

          <div className={styles.grid}>
            {latestProducts.map((product, index) => (
              <div key={product.id} data-reveal="up" style={{ transitionDelay: `${index * 60}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
