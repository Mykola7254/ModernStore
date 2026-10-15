
import { useCallback, useState } from 'react';
import Header from './components/Header/Header';
import ProductCard from './components/ProductCard/ProductCard';
import Cart from './components/Cart/Cart';
import { categories, products } from './data/products';
import { useCart } from './hooks/useCart';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Всі');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

    const matchesCategory =
        category === 'Всі' || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
      <>
        <Header
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
        />

        <main>
          <section className="hero" id="home">
            <div className="container hero-content">
              <div>
              <span className="eyebrow">
                ТЕХНОЛОГІЇ ДЛЯ ТВОГО ЖИТТЯ
              </span>

                <h1>
                  Твій стиль.
                  <br />
                  Твої технології.
                </h1>

                <p>
                  Відкривай сучасні гаджети та аксесуари
                  в одному місці.
                </p>

                <a href="#catalog" className="primary-button">
                  Переглянути товари →
                </a>
              </div>

              <div className="hero-visual" aria-hidden="true">
                🎧
              </div>
            </div>
          </section>

          <section className="catalog container" id="catalog">
            <div className="section-heading">
              <div>
                <span className="eyebrow">НАШ АСОРТИМЕНТ</span>
                <h2>Популярні товари</h2>
              </div>

              <p>Знайди те, що тобі потрібно</p>
            </div>

            <div className="catalog-tools">
              <input
                  type="search"
                  aria-label="Пошук товарів"
                  placeholder="Пошук товарів..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
              />

              <div className="categories">
                {categories.map((item) => (
                    <button
                        type="button"
                        key={item}
                        className={
                          category === item
                              ? 'category active'
                              : 'category'
                        }
                        aria-pressed={category === item}
                        onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                ))}
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                  <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                  />
              ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className="empty">
                  За вашим запитом товарів не знайдено.
                </p>
            )}
          </section>

          <section className="about" id="about">
            <div className="container">
              <h2>ModernStore — технології ближче</h2>
              <p>
                Демонстраційний інтернет-магазин,
                створений на React та TypeScript.
              </p>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer-inner">
            <strong>ModernStore.</strong>
            <span>© 2026 ModernStore. Portfolio demo.</span>
          </div>
        </footer>

        <Cart
            isOpen={isCartOpen}
            cart={cart}
            cartTotal={cartTotal}
            onClose={closeCart}
            onAdd={addToCart}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
        />
      </>
  );
}

export default App;
