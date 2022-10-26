import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

import CartContext from "../../store/cart-context";

function Cart(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const cartTotals = cartCtx.totalAmount;

    const cartAddHandler = (item) => cartCtx.addItem({ ...item, amount: 1 });

    const cartRemoveHandler = (id) => cartCtx.removeItem(id);

    const cancelHandler = () => setIsCheckout(false);

    const orderHandler = () => setIsCheckout(true);

    const orderConfirmHandler = async (userData) => {
        setIsSubmitting(true);
        let response = await fetch(
            "https://react-food-order-app-7bb59-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        );

        setIsSubmitting(false);

        if (!response.ok) {
            return;
        }

        setDidSubmit(true);

        cartCtx.clearCart();
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

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartTotals}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onCancel={cancelHandler}
                    onOrderConfirm={orderConfirmHandler}
                />
            )}
            {!isCheckout && modalActions}
        </>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <>
            <p>Order is sent Successfully!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;
