import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

import CartContext from "../../store/cart-context";

function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const cartTotals = cartCtx.totalAmount;

    const cartAddHandler = (item) => cartCtx.addItem({ ...item, amount: 1 });

    const cartRemoveHandler = (id) => cartCtx.removeItem(id);

    const cancelHandler = () => setIsCheckout(false);

    const orderHandler = () => setIsCheckout(true);

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

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
                Close
            </button>
            {cartCtx.items.length > 0 && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartTotals}</span>
            </div>
            {isCheckout && <Checkout onCancel={cancelHandler} />}
            {!isCheckout && modalActions}
        </Modal>
    );
}

export default Cart;
