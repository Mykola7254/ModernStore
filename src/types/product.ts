
export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    emoji: string;
};

export type CartItem = {
    productId: number;
    quantity: number;
};
