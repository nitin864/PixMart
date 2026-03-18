import React, { useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
  emoji: string
}

const initialItems: CartItem[] = [
  { id: 1, name: 'Wireless Headphones', price: 89.99, qty: 1, emoji: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: 149.00, qty: 2, emoji: '⌨️' },
  { id: 3, name: 'USB-C Hub', price: 49.95, qty: 1, emoji: '🔌' },
]

export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const [removed, setRemoved] = useState<number[]>([])

  const update = (id: number, delta: number) =>
    setItems((prev: CartItem[]) =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    )

  const remove = (id: number) => {
    setRemoved((r: number[]) => [...r, id])
    setTimeout(() => setItems((prev: CartItem[]) => prev.filter(i => i.id !== id)), 300)
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cart-root {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .cart-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(255,200,80,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 80%, rgba(255,100,80,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .cart-wrap {
          width: 100%;
          max-width: 520px;
          position: relative;
          z-index: 1;
        }

        .cart-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .cart-title {
          font-size: 2.4rem;
          font-weight: 800;
          color: #f5f0e8;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .cart-count {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          color: #ffc84a;
          background: rgba(255,200,74,0.12);
          border: 1px solid rgba(255,200,74,0.25);
          padding: 4px 10px;
          border-radius: 99px;
          letter-spacing: 0.08em;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .cart-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.1rem 1.25rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1rem;
          transition: opacity 0.3s, transform 0.3s;
          backdrop-filter: blur(8px);
        }

        .cart-item.removing {
          opacity: 0;
          transform: translateX(20px);
        }

        .cart-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.13);
        }

        .item-icon {
          font-size: 1.9rem;
          width: 46px;
          height: 46px;
          background: rgba(255,255,255,0.06);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .item-info { min-width: 0; }

        .item-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #f0ece3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-price {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          color: #9a9280;
          margin-top: 2px;
        }

        .item-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #f0ece3;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s, transform 0.1s;
          line-height: 1;
          padding-bottom: 1px;
        }

        .qty-btn:hover {
          background: rgba(255,200,74,0.15);
          border-color: rgba(255,200,74,0.4);
          color: #ffc84a;
          transform: scale(1.08);
        }

        .qty-btn:active { transform: scale(0.95); }

        .qty-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.88rem;
          color: #f0ece3;
          width: 20px;
          text-align: center;
          font-weight: 500;
        }

        .remove-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid rgba(255,80,80,0.18);
          background: rgba(255,80,80,0.07);
          color: rgba(255,120,100,0.7);
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 2px;
          transition: all 0.15s;
        }

        .remove-btn:hover {
          background: rgba(255,80,80,0.18);
          border-color: rgba(255,80,80,0.4);
          color: #ff6b5b;
          transform: scale(1.08);
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 1.25rem;
        }

        .summary {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1.25rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
          font-size: 0.88rem;
          color: #7a7468;
        }

        .summary-row:last-child { margin-bottom: 0; }

        .summary-row .val {
          font-family: 'DM Mono', monospace;
          font-size: 0.84rem;
          color: #a09890;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 0.9rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .total-label {
          font-size: 1rem;
          font-weight: 700;
          color: #f5f0e8;
          letter-spacing: -0.01em;
        }

        .total-val {
          font-family: 'DM Mono', monospace;
          font-size: 1.35rem;
          font-weight: 500;
          color: #ffc84a;
          letter-spacing: -0.02em;
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          background: #ffc84a;
          color: #0a0a0a;
          border: none;
          border-radius: 14px;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background 0.18s, transform 0.12s, box-shadow 0.18s;
          box-shadow: 0 4px 24px rgba(255,200,74,0.22);
          position: relative;
          overflow: hidden;
        }

        .checkout-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s;
        }

        .checkout-btn:hover {
          background: #ffd166;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,200,74,0.35);
        }

        .checkout-btn:hover::after { transform: translateX(100%); }

        .checkout-btn:active { transform: translateY(0); }

        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: #4a4540;
        }

        .empty-state .emoji { font-size: 3rem; margin-bottom: 1rem; }
        .empty-state p { font-size: 1rem; color: #6a6058; }
      `}</style>

      <div className="cart-root">
        <div className="cart-wrap">
          <div className="cart-header">
            <h1 className="cart-title">Cart</h1>
            <span className="cart-count">{items.reduce((s, i) => s + i.qty, 0)} items</span>
          </div>

          <div className="cart-items">
            {items.length === 0 ? (
              <div className="empty-state">
                <div className="emoji">🛒</div>
                <p>Your cart is empty</p>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className={`cart-item${removed.includes(item.id) ? ' removing' : ''}`}
                >
                  <div className="item-icon">{item.emoji}</div>
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">${item.price.toFixed(2)} each</div>
                  </div>
                  <div className="item-controls">
                    <button className="qty-btn" onClick={() => update(item.id, -1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => update(item.id, +1)}>+</button>
                    <button className="remove-btn" onClick={() => remove(item.id)}>✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <>
              <div className="divider" />
              <div className="summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="val">${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="val" style={{ color: '#6abf7b' }}>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span className="val">${tax.toFixed(2)}</span>
                </div>
                <div className="summary-total">
                  <span className="total-label">Total</span>
                  <span className="total-val">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="checkout-btn">Proceed to Checkout →</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}