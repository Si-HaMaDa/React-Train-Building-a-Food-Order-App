import MyHeader from "./components/Layout/MyHeader";
import Meals from "./components/Meals/Meals";
import Modal from "./components/UI/Modal";

function App() {
    return (
        <>
            <Modal />
            <MyHeader />
            <main>
                <Meals />
            </main>
        </>
    );
}

export default App;
