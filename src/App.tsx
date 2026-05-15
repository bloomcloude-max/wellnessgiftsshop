import React, { useState } from 'react';
import { ShoppingCart, User, Search, ArrowRight, ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useCart, Product } from './context/CartContext';
import './index.css';

// Mock Data
const PRODUCTS: Record<string, Product> = {
  featured: {
    id: 'p-featured',
    name: 'Ритуал Глубокого Сна',
    price: 35000,
    imageUrl: '' 
  },
  basic: {
    id: 'p-basic',
    name: 'Базовое Спокойствие',
    price: 15000,
    imageUrl: ''
  },
  premium: {
    id: 'p-premium',
    name: 'Погружение',
    price: 30000,
    imageUrl: ''
  },
  vip: {
    id: 'p-vip',
    name: 'Абсолютное Уединение',
    price: 60000,
    imageUrl: ''
  }
};

const MEGA_MENU_DATA: Record<string, { links: string[] }> = {
  'Массажи': {
    links: ['Расслабляющий', 'Тайский', 'Спортивный', 'Стоун-терапия']
  },
  'Медитации': {
    links: ['С поющими чашами', 'Дыхательные практики', 'Mindfulness', 'Индивидуальные сессии']
  },
  'Чекапы': {
    links: ['Базовый скрининг', 'Мужское здоровье', 'Женское здоровье', 'Premium генетика']
  },
  'Ретриты': {
    links: ['Уикенд в лесу', 'Детокс на Алтае', 'Йога-тур на Бали', 'Молчание (Випассана)']
  },
  'SPA': {
    links: ['Морской бриз', 'Шоколадное обертывание', 'Термальные источники', 'VIP день для двоих']
  },
  'Йога': {
    links: ['Хатха-йога', 'Аэройога', 'Кундалини', 'Индивидуально с мастером']
  }
};

const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="animate-fade-in" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.5rem 4rem',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 500
    }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 500 }} className="serif">
        Wellness Gift Shop
      </Link>
      
      <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>
        <Link to="/" className="nav-link active" style={{ color: 'var(--text-dark)' }}>Каталог</Link>
        <a href="#" className="nav-link">Хиты продаж</a>
        <a href="#" className="nav-link">О нас</a>
      </nav>

      <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-dark)', position: 'relative' }}>
        <button className="hover-btn" style={{ position: 'relative' }} onClick={() => navigate('/cart')}>
          <ShoppingCart size={20} strokeWidth={1.5} />
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>
        <button className="hover-btn"><User size={20} strokeWidth={1.5} /></button>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="animate-fade-in delay-400" style={{ 
    backgroundColor: 'var(--footer-bg)', 
    padding: '3rem 4rem', 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 'auto'
  }}>
    <div>
      <div style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1rem', color: '#2a2a2a' }} className="serif">
        Wellness Gift Shop
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', maxWidth: '250px', lineHeight: 1.5 }}>
        &copy; 2026 Wellness Gift Shop. Привержены 100% экологичным практикам.
      </p>
    </div>
    
    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
      <a href="#" className="nav-link">Экологичность</a>
      <a href="#" className="nav-link">Доставка</a>
      <a href="#" className="nav-link">Возвраты</a>
      <a href="#" className="nav-link">Политика конфиденциальности</a>
      <a href="#" className="nav-link">Контакты</a>
    </div>
  </footer>
);

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <main style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* SEARCH & PILLS */}
      <div className="animate-fade-in delay-100" style={{ 
        width: '100%', 
        maxWidth: '700px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '4rem',
        position: 'relative',
        zIndex: 100
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '600px',
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#f3efe9', 
          borderRadius: '50px', 
          padding: '0.75rem 1.5rem',
          marginBottom: '2rem',
          transition: 'box-shadow 0.3s',
        }}
        onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)'}
        onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.75rem' }} />
          <input 
            type="text" 
            placeholder="Найдите идеальный подарок для отдыха..." 
            style={{ 
              border: 'none', 
              background: 'transparent', 
              outline: 'none', 
              width: '100%', 
              fontSize: '0.9rem',
              fontFamily: 'var(--font-sans)'
            }} 
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(MEGA_MENU_DATA).map((cat) => (
            <div key={cat} className="category-container">
              <button className="hover-btn" style={{ 
                padding: '0.6rem 1.25rem', 
                borderRadius: '50px', 
                backgroundColor: cat === 'Йога' ? '#3a443e' : '#f3efe9',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: cat === 'Йога' ? '#fff' : 'var(--text-dark)'
              }}>
                {cat}
              </button>
              <div className="mega-menu">
                <div className="mega-menu-list">
                  <h4 className="serif" style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{cat}</h4>
                  {MEGA_MENU_DATA[cat].links.map(link => (
                    <a href="#" key={link}>{link}</a>
                  ))}
                </div>
                <div className="mega-menu-img"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HERO FEATURED */}
      <div className="animate-fade-in delay-200" style={{ 
        width: '100%', 
        maxWidth: '1000px', 
        height: '450px', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        position: 'relative',
        marginBottom: '5rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        zIndex: 1
      }}>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#d1cdc3' }} />
        
        <div style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 600 }}>
            Специальное предложение
          </span>
          <h1 className="serif" style={{ color: '#fff', fontSize: '3.5rem', fontWeight: 400, marginBottom: '1rem' }}>
            Ритуал Глубокого Сна
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', maxWidth: '450px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Восстанавливающая вечерняя программа, сочетающая стоун-терапию, звуковое исцеление и соматическое расслабление для восстановления ваших биоритмов.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button 
              className="hero-btn" 
              onClick={() => {
                addToCart(PRODUCTS.featured);
                navigate('/cart');
              }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.85rem 1.75rem', 
                backgroundColor: 'rgba(255,255,255,0.15)', 
                backdropFilter: 'blur(5px)',
                borderRadius: '50px',
                color: '#fff',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.4)',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
            >
              В корзину <Plus size={16} />
            </button>
            <span className="serif" style={{ color: '#fff', fontSize: '1.5rem' }}>35 000 ₽</span>
          </div>
        </div>
      </div>

      {/* TIERS SECTION */}
      <div className="animate-fade-in delay-300" style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '1rem', color: '#2a2a2a' }}>
          Подборки Подарков
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          Выберите уровень заботы. Каждая категория открывает тщательно подобранный список холистических процедур и доступ в премиальные пространства.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          
          {/* Basic Card */}
          <div className="hover-card" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '380px' }}>
            <div className="card-img" style={{ width: '100%', height: '100%', backgroundColor: '#dfdbd0' }} />
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
              padding: '2rem 1.5rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '50px', color: '#fff', marginBottom: '0.75rem', backdropFilter: 'blur(4px)', letterSpacing: '0.05em' }}>BASIC</span>
              <h3 className="serif" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.25rem' }}>Базовое Спокойствие</h3>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>От 15 000 ₽</span>
            </div>
            <div className="add-to-cart-overlay">
              <button className="add-btn-primary" onClick={() => { addToCart(PRODUCTS.basic); navigate('/cart'); }}>
                <Plus size={16} /> В корзину
              </button>
            </div>
          </div>

          {/* Premium Card */}
          <div className="hover-card" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '380px' }}>
            <div className="card-img" style={{ width: '100%', height: '100%', backgroundColor: '#c5c2b6' }} />
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
              padding: '2rem 1.5rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '50px', color: '#fff', marginBottom: '0.75rem', backdropFilter: 'blur(4px)', letterSpacing: '0.05em' }}>PREMIUM</span>
              <h3 className="serif" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.25rem' }}>Погружение</h3>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>От 30 000 ₽</span>
            </div>
            <div className="add-to-cart-overlay">
              <button className="add-btn-primary" onClick={() => { addToCart(PRODUCTS.premium); navigate('/cart'); }}>
                <Plus size={16} /> В корзину
              </button>
            </div>
          </div>

          {/* VIP Card */}
          <div className="hover-card" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '380px' }}>
            <div className="card-img" style={{ width: '100%', height: '100%', backgroundColor: '#aba89e' }} />
            <div style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
              padding: '2rem 1.5rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '50px', color: '#fff', marginBottom: '0.75rem', backdropFilter: 'blur(4px)', letterSpacing: '0.05em' }}>VIP</span>
              <h3 className="serif" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.25rem' }}>Абсолютное Уединение</h3>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>От 60 000 ₽</span>
            </div>
            <div className="add-to-cart-overlay">
              <button className="add-btn-primary" onClick={() => { addToCart(PRODUCTS.vip); navigate('/cart'); }}>
                <Plus size={16} /> В корзину
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <main className="animate-fade-in" style={{ flex: 1, padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px', backgroundColor: '#fff', borderRadius: '16px', padding: '3rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
          <h1 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, color: '#1a1a1a' }}>Корзина</h1>
          <button onClick={() => navigate('/')} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--text-muted)', paddingBottom: '2px' }} className="hover-btn">
            Вернуться к покупкам
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <ShoppingCart size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.1rem' }}>Ваша корзина пуста</p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundColor: '#dfdbd0' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 className="serif" style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.25rem' }}>{item.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Премиальная упаковка включена</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{item.price.toLocaleString()} ₽</span>
                        {item.quantity > 1 && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>x {item.quantity} шт.</span>}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="hover-btn"
                        style={{ color: '#ff4444', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <X size={14} /> Убрать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#f9f8f6', padding: '2rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 400, marginBottom: '2rem' }} className="serif">
                <span>Итого к оплате</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
              <button style={{ 
                width: '100%', 
                padding: '1.25rem', 
                backgroundColor: '#1a1a1a', 
                color: '#fff', 
                borderRadius: '50px', 
                fontSize: '1rem', 
                fontWeight: 500,
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
