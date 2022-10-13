import { useState } from "react";
import MyHeader from "./components/Layout/MyHeader";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const toggleCartHandler = () => {
        setCartIsShown(!cartIsShown);
    };

    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={toggleCartHandler} />}
            <MyHeader onCartClick={toggleCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
