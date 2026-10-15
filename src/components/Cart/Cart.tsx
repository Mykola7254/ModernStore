
import { useEffect, useRef } from 'react';
import { products, formatPrice } from '../../data/products';
import type { CartItem } from '../../types/product';

type CartProps = {
    isOpen: boolean;
    cart: CartItem[];
    cartTotal: number;
    onClose: () => void;
    onAdd: (productId: number) => void;
    onDecrease: (productId: number) => void;
    onRemove: (productId: number) => void;
    onClear: () => void;
};

export default function Cart({
                                 isOpen,
                                 cart,
                                 cartTotal,
                                 onClose,
                                 onAdd,
                                 onDecrease,
                                 onRemove,
                                 onClear,
                             }: CartProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        previouslyFocusedRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === 'Tab') {
                const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
                    'button:not(:disabled), a[href], input:not(:disabled)'
                );

                if (!focusable?.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === last
                ) {
                    event.preventDefault();
                    first.focus();
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocusedRef.current?.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="cart-overlay" onMouseDown={onClose}>
            <aside
                ref={dialogRef}
                className="cart-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="cart-header">
                    <h2 id="cart-title">Ваш кошик</h2>

                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="cart-close"
                        onClick={onClose}
                        aria-label="Закрити кошик"
                    >
                        ✕
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <span aria-hidden="true">🛒</span>
                        <h3>Ваш кошик порожній</h3>
                        <p>Додайте товари з каталогу.</p>
                        <button
                            type="button"
                            className="cart-continue"
                            onClick={onClose}
                        >
                            Переглянути товари
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map((item) => {
                                const product = products.find(
                                    (product) => product.id === item.productId
                                );

                                if (!product) return null;

                                return (
                                    <article className="cart-item" key={item.productId}>
                                        <div className="cart-item-image" aria-hidden="true">
                                            {product.emoji}
                                        </div>

                                        <div className="cart-item-info">
                                            <h3>{product.name}</h3>
                                            <p>{formatPrice(product.price)}</p>

                                            <div className="cart-quantity">
                                                <button
                                                    type="button"
                                                    onClick={() => onDecrease(product.id)}
                                                    aria-label={`Зменшити кількість: ${product.name}`}
                                                >
                                                    −
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    type="button"
                                                    onClick={() => onAdd(product.id)}
                                                    disabled={item.quantity >= 99}
                                                    aria-label={`Збільшити кількість: ${product.name}`}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                className="cart-remove"
                                                onClick={() => onRemove(product.id)}
                                            >
                                                Видалити
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="cart-footer">
                            <button
                                type="button"
                                className="clear-cart"
                                onClick={onClear}
                            >
                                Очистити кошик
                            </button>

                            <div className="cart-total">
                                <span>Разом:</span>
                                <strong>{formatPrice(cartTotal)}</strong>
                            </div>

                            <p className="cart-note">
                                Це демонстраційний магазин. Оформлення
                                та оплата замовлень недоступні.
                            </p>

                            <button
                                type="button"
                                className="cart-continue"
                                onClick={onClose}
                            >
                                Продовжити покупки
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
