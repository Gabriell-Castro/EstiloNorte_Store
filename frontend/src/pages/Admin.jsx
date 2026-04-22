import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../api/api';
import styles from './Admin.module.scss';

const initialForm = {
  name: '',
  description: '',
  category: 'Camisetas',
  price: '',
  image: '',
  sizes: 'P,M,G',
  stock: '',
  featured: false
};

const categoryOptions = ['Camisetas', 'Calças', 'Jaquetas', 'Vestidos', 'Moletons', 'Tops', 'Camisas', 'Shorts'];

function Admin() {
  const [form, setForm] = useState(initialForm);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingId, setEditingId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const isEditing = Boolean(editingId);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await apiRequest('/products');
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesName && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  function resetForm() {
    setForm(initialForm);
    setEditingId('');
  }

  function fillForm(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: String(product.price),
      image: product.image,
      sizes: product.sizes.join(','),
      stock: String(product.stock),
      featured: Boolean(product.featured)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const payload = {
        ...form,
        sizes: form.sizes.split(',').map((item) => item.trim()).filter(Boolean)
      };

      const endpoint = isEditing ? `/products/${editingId}` : '/products';
      const method = isEditing ? 'PUT' : 'POST';
      const savedProduct = await apiRequest(endpoint, {
        method,
        body: JSON.stringify(payload)
      });

      if (isEditing) {
        setProducts((current) => current.map((product) => (product.id === editingId ? savedProduct : product)));
        setMessage('Produto atualizado com sucesso.');
      } else {
        setProducts((current) => [savedProduct, ...current]);
        setMessage('Produto cadastrado com sucesso.');
      }

      resetForm();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(productId) {
    const confirmed = window.confirm('Deseja remover este produto?');
    if (!confirmed) return;

    setMessage('');
    setError('');

    try {
      await apiRequest(`/products/${productId}`, { method: 'DELETE' });
      setProducts((current) => current.filter((product) => product.id !== productId));
      if (editingId === productId) resetForm();
      setMessage('Produto removido com sucesso.');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal="up">
          <span className={styles.label}>Gestão</span>
          <h1>Painel admin</h1>
          <p>Cadastre, consulte, edite e remova produtos do catálogo em um único fluxo.</p>
        </div>

        <div className={styles.layout}>
          <form onSubmit={handleSubmit} className={styles.card} data-reveal="up">
            <div className={styles.cardHeader}>
              <h2>{isEditing ? 'Editar produto' : 'Novo produto'}</h2>
              {isEditing && <button type="button" className={styles.textButton} onClick={resetForm}>Cancelar edição</button>}
            </div>
            <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <div className={styles.inlineFields}>
              <input type="number" step="0.01" placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input type="number" placeholder="Estoque" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <input type="text" placeholder="URL da imagem" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input type="text" placeholder="Tamanhos separados por vírgula" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
            <label className={styles.checkboxField}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Produto em destaque
            </label>
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.primaryButton}>{isEditing ? 'Salvar alterações' : 'Cadastrar produto'}</button>
          </form>

          <div className={styles.card} data-reveal="up">
            <div className={styles.cardHeader}>
              <h2>Produtos cadastrados</h2>
              <span>{filteredProducts.length} item(ns)</span>
            </div>

            <div className={styles.filters}>
              <input type="text" placeholder="Buscar produto" value={search} onChange={(event) => setSearch(event.target.value)} />
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                <option value="">Todas as categorias</option>
                {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            {loading ? (
              <p className={styles.helper}>Carregando produtos...</p>
            ) : filteredProducts.length === 0 ? (
              <p className={styles.helper}>Nenhum produto encontrado.</p>
            ) : (
              <div className={styles.productList}>
                {filteredProducts.map((product) => (
                  <article key={product.id} className={styles.productItem}>
                    <img src={product.image} alt={product.name} />
                    <div className={styles.productContent}>
                      <div>
                        <strong>{product.name}</strong>
                        <p>{product.category} • R$ {product.price.toFixed(2)} • Estoque {product.stock}</p>
                      </div>
                      <div className={styles.itemActions}>
                        <button type="button" className={styles.secondaryButton} onClick={() => fillForm(product)}>Editar</button>
                        <button type="button" className={styles.dangerButton} onClick={() => handleDelete(product.id)}>Excluir</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
