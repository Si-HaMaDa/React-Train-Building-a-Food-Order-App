import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
    totalItems: 0,
};

const cartReducer = (state, action = { type: null }) => {
    switch (action.type) {
        case "ADD":
            const updatedTotalAmount = +(
                state.totalAmount +
                action.item.price * action.item.amount
            ).toFixed(2);
            const updatedTotalItems = state.totalItems + action.item.amount;

            const existItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );
            const existItem = state.items[existItemIndex];

            let updatedItems;

            if (existItem) {
                const updateItem = {
                    ...existItem,
                    amount: existItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[existItemIndex] = updateItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            localStorage.setItem(
                "cart",
                JSON.stringify({
                    items: updatedItems,
                    totalAmount: updatedTotalAmount,
                    totalItems: updatedTotalItems,
                })
            );
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
                totalItems: updatedTotalItems,
            };
            break;
        case "REMOVE":
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            const existingItem = state.items[existingItemIndex];

            let updatingItems;

            if (!existingItem) return;

            const updatingTotalAmount = +(
                state.totalAmount - existingItem.price
            ).toFixed(2);
            const updatingTotalItems = state.totalItems - 1;

            if (existingItem.amount < 2) {
                updatingItems = state.items.filter(
                    (item) => item.id != existingItem.id
                );
            } else {
                const updateItem = {
                    ...existingItem,
                    amount: existingItem.amount - 1,
                };
                updatingItems = [...state.items];
                updatingItems[existingItemIndex] = updateItem;
            }

            localStorage.setItem(
                "cart",
                JSON.stringify({
                    items: updatingItems,
                    totalAmount: updatingTotalAmount,
                    totalItems: updatingTotalItems,
                })
            );
            return {
                items: updatingItems,
                totalAmount: updatingTotalAmount,
                totalItems: updatingTotalItems,
            };
            break;
    }
    const localCart = JSON.parse(localStorage.getItem("cart"));
    return localCart ?? defaultCartState;
};

const initCartState = cartReducer();

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initCartState
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
