
import { useEffect, useState } from 'react';
import { products } from '../data/products';
import type { CartItem } from '../types/product';

const STORAGE_KEY = 'modernstore-cart';

function loadCart(): CartItem[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return [];

        const parsed: unknown = JSON.parse(saved);

        if (!Array.isArray(parsed)) return [];

        return parsed.filter((item): item is CartItem => {
            if (typeof item !== 'object' || item === null) {
                return false;
            }

            const value = item as Record<string, unknown>;

            return (
                Number.isInteger(value.productId) &&
                products.some((product) => product.id === value.productId) &&
                typeof value.quantity === 'number' &&
                Number.isInteger(value.quantity) &&
                value.quantity > 0 &&
                value.quantity <= 99
            );
        });
    } catch {
        return [];
    }
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>(loadCart);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error('Не вдалося зберегти кошик:', error);
        }
    }, [cart]);

    function addToCart(productId: number) {
        if (!products.some((product) => product.id === productId)) {
            return;
        }

        setCart((previous) => {
            const exists = previous.some(
                (item) => item.productId === productId
            );

            if (exists) {
                return previous.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: Math.min(99, item.quantity + 1) }
                        : item
                );
            }

            return [...previous, { productId, quantity: 1 }];
        });
    }

    function decreaseQuantity(productId: number) {
        setCart((previous) =>
            previous
                .map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeFromCart(productId: number) {
        setCart((previous) =>
            previous.filter((item) => item.productId !== productId)
        );
    }

    function clearCart() {
        setCart([]);
    }

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cart.reduce((total, item) => {
        const product = products.find(
            (product) => product.id === item.productId
        );

        return total + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
        cart,
        cartCount,
        cartTotal,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    };
}
