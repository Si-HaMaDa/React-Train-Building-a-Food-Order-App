import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

import CartContext from "../../store/cart-context";

function Cart(props) {
    const cartCtx = useContext(CartContext);

    const cartTotals = cartCtx.totalAmount;

    const cartAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                // <li key={item.id}>{item.name}</li>
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={cartAddHandler.bind(null, item)}
                    onRemove={cartRemoveHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartTotals}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes["button--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;
