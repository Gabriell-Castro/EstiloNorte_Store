import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

export function useProducts(search = '', category = '') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);

        const data = await apiRequest(`/products?${params.toString()}`);
        setProducts(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [search, category]);

  return { products, loading, error };
}
