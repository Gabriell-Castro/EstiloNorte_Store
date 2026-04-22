import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.scss';

function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await register(formData);
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
            <span className={styles.label}>Novo usuário</span>
            <h1>Criar conta</h1>
            <p>Cadastro simples para demonstrar fluxo de autenticação integrado à API.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.card}>
            <input
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            />
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
            <button type="submit" disabled={loading} className={styles.primaryButton}>{loading ? 'Criando...' : 'Cadastrar'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
