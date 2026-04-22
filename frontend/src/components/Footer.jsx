import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.card} data-reveal="up">
          <div>
            <strong>EstiloNorte</strong>
            <p>Peças versáteis, caimento moderno e uma seleção pensada para o dia a dia.</p>
          </div>
          <span>Novas entradas toda semana</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
