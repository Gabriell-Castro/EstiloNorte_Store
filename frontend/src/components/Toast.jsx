import { useCart } from '../context/CartContext';
import styles from './Toast.module.scss';

function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div key={toast.id} className={`${styles.toast} ${styles.show} ${styles[toast.type || 'info']}`} role="status" aria-live="polite">
      {toast.message}
    </div>
  );
}

export default Toast;
