import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.scss';

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.intro}>
            <span className={styles.label}>Acesso</span>
            <h1>Entrar</h1>
            <p>Use os usuários demo informados no README para testar o fluxo completo de autenticação.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.card}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
            <input
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={loading} className={styles.primaryButton}>{loading ? 'Entrando...' : 'Entrar'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
