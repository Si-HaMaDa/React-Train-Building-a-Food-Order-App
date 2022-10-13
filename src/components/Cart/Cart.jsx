import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

import CartContext from "../../store/cart-context";

function Cart(props) {
    const cartCtx = useContext(CartContext);

    const cartTotals = cartCtx.items.reduce((num, item) => {
        return num + item.amount * item.price;
    }, 0);

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                // <li key={item.id}>{item.name}</li>
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={() => {}}
                    onRemove={() => {}}
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
