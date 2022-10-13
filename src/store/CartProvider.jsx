import CartContext from "./cart-context";

function CartProvider(props) {
    const cartContext = {
        items: [
            { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
            { id: "c2", name: "Torky", amount: 2, price: 10.99 },
        ],
        totalAmount: 0,
        addItem: (item) => {},
        removeItem: (id) => {},
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
