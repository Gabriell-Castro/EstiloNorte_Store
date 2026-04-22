import Footer from '../components/Footer';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './MainLayout.module.scss';

function MainLayout({ children }) {
  useScrollReveal();

  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Toast />
      <Footer />
    </div>
  );
}

export default MainLayout;
