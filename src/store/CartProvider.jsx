import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
    totalItems: 0,
};

const cartReducer = (state, action = { type: null }) => {
    let updateTotalAmount,
        updateTotalItems,
        existItemIndex,
        existItem,
        updateItems;

    switch (action.type) {
        case "ADD":
            updateTotalAmount = +(
                state.totalAmount +
                action.item.price * action.item.amount
            ).toFixed(2);
            updateTotalItems = state.totalItems + action.item.amount;

            existItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );
            existItem = state.items[existItemIndex];

            if (existItem) {
                let updateItem = {
                    ...existItem,
                    amount: existItem.amount + action.item.amount,
                };
                updateItems = [...state.items];
                updateItems[existItemIndex] = updateItem;
            } else {
                updateItems = state.items.concat(action.item);
            }
            break;

        case "REMOVE":
            existItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            existItem = state.items[existItemIndex];

            if (!existItem) return;

            updateTotalAmount = +(state.totalAmount - existItem.price).toFixed(
                2
            );
            updateTotalItems = state.totalItems - 1;

            if (existItem.amount < 2) {
                updateItems = state.items.filter(
                    (item) => item.id != existItem.id
                );
            } else {
                let updateItem = {
                    ...existItem,
                    amount: existItem.amount - 1,
                };
                updateItems = [...state.items];
                updateItems[existItemIndex] = updateItem;
            }
            break;
        case "CLEAR":
            updateItems = [];
            updateTotalAmount = updateTotalItems = 0;
            break;
    }

    if (
        updateItems != undefined &&
        updateTotalAmount != undefined &&
        updateTotalItems != undefined
    ) {
        localStorage.setItem(
            "cart",
            JSON.stringify({
                items: updateItems,
                totalAmount: updateTotalAmount,
                totalItems: updateTotalItems,
            })
        );
        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
            totalItems: updateTotalItems,
        };
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

    const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        totalItems: cartState.totalItems,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
