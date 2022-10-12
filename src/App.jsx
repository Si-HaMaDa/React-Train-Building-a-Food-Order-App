import MyHeader from "./components/Layout/MyHeader";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
    return (
        <>
            <Cart />
            <MyHeader />
            <main>
                <Meals />
            </main>
        </>
    );
}

export default App;
