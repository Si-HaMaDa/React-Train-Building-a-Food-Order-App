import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
    const cartCtx = useContext(CartContext);

    const cartItemsNum = cartCtx.totalItems;

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartItemsNum}</span>
        </button>
    );
}

export default HeaderCartButton;
