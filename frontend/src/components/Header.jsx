import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Header.module.scss';

function Header() {
  const { user, logout } = useAuth();
  const { itemsCount, clearActiveCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [user]);

  function handleLogout() {
    clearActiveCart();
    logout();
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <Link to="/" className={styles.brand}>
            <span>EstiloNorte</span>
            <small>Moda urbana</small>
          </Link>

          <button
            type="button"
            className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`} onClick={() => setMenuOpen(false)} />

          <div className={`${styles.panel} ${menuOpen ? styles.panelOpen : ''}`}>
            <nav className={styles.menu}>
              <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>Início</NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>Produtos</NavLink>
              <NavLink to="/cart" className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>
                Carrinho <span className={styles.counter}>{itemsCount}</span>
              </NavLink>
              {user?.role === 'admin' && (
                <NavLink to="/admin" className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>
                  Admin
                </NavLink>
              )}
            </nav>

            <div className={styles.authActions}>
              {user ? (
                <>
                  <div className={styles.profileChip}>
                    <span className={styles.profileLabel}>Conectado</span>
                    <strong>{user.name}</strong>
                  </div>
                  <button onClick={handleLogout} className={styles.secondaryButton}>Sair</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>Entrar</NavLink>
                  <NavLink to="/register" className={styles.primaryButton} onClick={() => setMenuOpen(false)}>Criar conta</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
