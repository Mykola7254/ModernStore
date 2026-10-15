
import type { Product } from '../types/product';

export const products: Product[] = [
    {
        id: 1,
        name: 'Навушники Pro',
        category: 'Аудіо',
        price: 3499,
        emoji: '🎧',
    },
    {
        id: 2,
        name: 'Смартгодинник X',
        category: 'Гаджети',
        price: 5299,
        emoji: '⌚',
    },
    {
        id: 3,
        name: 'Бездротова колонка',
        category: 'Аудіо',
        price: 2499,
        emoji: '🔊',
    },
    {
        id: 4,
        name: 'Ігрова клавіатура',
        category: 'Аксесуари',
        price: 1899,
        emoji: '⌨️',
    },
    {
        id: 5,
        name: 'Смартфон Ultra',
        category: 'Гаджети',
        price: 21999,
        emoji: '📱',
    },
    {
        id: 6,
        name: 'Комп’ютерна миша',
        category: 'Аксесуари',
        price: 1299,
        emoji: '🖱️',
    },
];

export const categories = [
    'Всі',
    'Аудіо',
    'Гаджети',
    'Аксесуари',
];

export const formatPrice = (price: number): string =>
    `${price.toLocaleString('uk-UA')} ₴`;
