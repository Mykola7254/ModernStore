
import type { Product } from '../../types/product';
import { formatPrice } from '../../data/products';

type ProductCardProps = {
    product: Product;
    onAddToCart: (productId: number) => void;
};

export default function ProductCard({
                                        product,
                                        onAddToCart,
                                    }: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-image" aria-hidden="true">
                {product.emoji}
            </div>

            <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>

                <h3>{product.name}</h3>

                <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>

                    <button
                        type="button"
                        aria-label={`Додати ${product.name} до кошика`}
                        onClick={() => onAddToCart(product.id)}
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    );
}
