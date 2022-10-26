import { useEffect, useState } from "react";
import Card from "./../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                "https://react-food-order-app-7bb59-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    if (isLoading)
        return (
            <section className={`${classes.meals} ${classes.MealsLoading}`}>
                <Card>
                    <p>Loading...</p>
                </Card>
            </section>
        );

    if (httpError)
        return (
            <section className={`${classes.meals} ${classes.MealsError}`}>
                <Card>
                    <p>{httpError}</p>
                </Card>
            </section>
        );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;
