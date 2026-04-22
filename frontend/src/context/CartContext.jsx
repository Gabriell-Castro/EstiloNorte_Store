import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();
const CARTS_STORAGE_KEY = 'estilonorte.carts';

function getStorageKey(user) {
  return user?.email ? `user:${user.email}` : 'guest';
}

function readStoredCarts() {
  const stored = localStorage.getItem(CARTS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const activeKey = getStorageKey(user);
  const previousKeyRef = useRef(activeKey);
  const [cart, setCart] = useState(() => {
    const carts = readStoredCarts();
    return carts[activeKey] || [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const carts = readStoredCarts();
    const previousKey = previousKeyRef.current;

    if (previousKey !== activeKey) {
      carts[previousKey] = cart;
      localStorage.setItem(CARTS_STORAGE_KEY, JSON.stringify(carts));
      setCart(carts[activeKey] || []);
      previousKeyRef.current = activeKey;
      return;
    }

    carts[activeKey] = cart;
    localStorage.setItem(CARTS_STORAGE_KEY, JSON.stringify(carts));
  }, [cart, activeKey]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(timeout);
  }, [toast]);

  function showToast(message, type = 'info') {
    setToast({ id: Date.now(), message, type });
  }

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        showToast(`${product.name} teve a quantidade aumentada.`, 'update');
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      showToast(`${product.name} foi adicionado ao carrinho.`, 'add');
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) => {
      const removedItem = currentCart.find((item) => item.id === productId);
      if (removedItem) showToast(`${removedItem.name} foi removido do carrinho.`, 'remove');
      return currentCart.filter((item) => item.id !== productId);
    });
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) => {
      const updated = currentCart.map((item) => (item.id === productId ? { ...item, quantity } : item));
      const target = updated.find((item) => item.id === productId);
      if (target) showToast(`Quantidade de ${target.name} atualizada.`, 'update');
      return updated;
    });
  }

  function clearActiveCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, updateQuantity, clearActiveCart, total, itemsCount, toast }),
    [cart, total, itemsCount, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
