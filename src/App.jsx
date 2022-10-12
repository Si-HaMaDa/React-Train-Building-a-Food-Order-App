import { useState } from "react";
import MyHeader from "./components/Layout/MyHeader";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const toggleCartHandler = (old) => {
        setCartIsShown(!cartIsShown);
    };

    return (
        <>
            {cartIsShown && <Cart onClose={toggleCartHandler} />}
            <MyHeader onCartClick={toggleCartHandler} />
            <main>
                <Meals />
            </main>
        </>
    );
}

export default App;
