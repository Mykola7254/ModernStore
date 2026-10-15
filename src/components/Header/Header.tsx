
type HeaderProps = {
    cartCount: number;
    onOpenCart: () => void;
};

export default function Header({
                                   cartCount,
                                   onOpenCart,
                               }: HeaderProps) {
    return (
        <header className="header">
            <div className="container header-inner">
                <a href="#home" className="logo">
                    Modern<span>Store.</span>
                </a>

                <nav className="nav" aria-label="Основна навігація">
                    <a href="#home">Головна</a>
                    <a href="#catalog">Каталог</a>
                    <a href="#about">Про нас</a>
                </nav>

                <button
                    type="button"
                    className="cart-indicator"
                    onClick={onOpenCart}
                    aria-label={`Відкрити кошик. Товарів: ${cartCount}`}
                >
                    🛒 Кошик ({cartCount})
                </button>
            </div>
        </header>
    );
}
