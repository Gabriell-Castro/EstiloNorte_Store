import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.scss';

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Seu pedido</span>
          <h1>Carrinho</h1>
          <p>Persistente por conta. Ao entrar novamente com o mesmo usuário, os itens retornam.</p>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos para testar o fluxo completo da aplicação.</p>
            <Link to="/products" className={styles.primaryButton}>Ir para produtos</Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.list}>
              {cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <strong>R$ {item.price.toFixed(2)}</strong>
                  </div>
                  <div className={styles.quantityControl}>
                    <button type="button" className={styles.smallButton} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                    />
                    <button type="button" className={styles.smallButton} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>Remover</button>
                </div>
              ))}
            </div>

            <aside className={styles.summary}>
              <span className={styles.label}>Resumo do pedido</span>
              <h2>Total: R$ {total.toFixed(2)}</h2>
              <p>Frete, cupom e checkout podem entrar em uma próxima versão com integração real.</p>
              <button className={styles.primaryButton}>Finalizar compra</button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
