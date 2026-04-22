import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <span className={styles.label}>404</span>
          <h1>Página não encontrada</h1>
          <p>O endereço que você tentou acessar não existe nesta aplicação.</p>
          <Link to="/" className={styles.primaryButton}>Voltar para início</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
