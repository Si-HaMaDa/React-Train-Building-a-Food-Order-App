import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [
        { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
        { id: "c2", name: "Torky", amount: 2, price: 10.99 },
    ],
    totalAmount: 0,
    totalItems: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            console.log("ADD");
            break;
        case "REMOVE":
            console.log("REMOVE");
            break;
    }
    return defaultCartState;
};

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        totalItems: cartState.totalItems,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
