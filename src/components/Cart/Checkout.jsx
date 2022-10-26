import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const notEmpty = (value) => value.trim().length > 0;
const isFiveChars = (value) => value.trim().length === 5;

function Checkout(props) {
    const [formInputsState, setFormInputsState] = useState({
        name: {
            valid: true,
            value: "",
            ref: useRef(),
            classNames: classes.control,
            valdation: notEmpty,
        },
        street: {
            valid: true,
            value: "",
            ref: useRef(),
            classNames: classes.control,
            valdation: notEmpty,
        },
        city: {
            valid: true,
            value: "",
            ref: useRef(),
            classNames: classes.control,
            valdation: notEmpty,
        },
        postal: {
            valid: true,
            value: "",
            ref: useRef(),
            classNames: classes.control,
            valdation: isFiveChars,
        },
    });

    const confirmHandler = (event) => {
        event.preventDefault();

        let newFormState = { ...formInputsState };
        let formIsValid = true;

        for (let inputName in formInputsState) {
            newFormState[inputName].value =
                formInputsState[inputName].ref.current.value;

            let valueIsValid = formInputsState[inputName].valdation(
                newFormState[inputName].value
            );
            newFormState[inputName].valid = valueIsValid;

            newFormState[inputName].classNames = `${classes.control} ${
                valueIsValid ? "" : classes.invalid
            }`;

            if (!valueIsValid) formIsValid = false;
        }

        setFormInputsState(newFormState);

        if (!formIsValid) return;

        console.log("Submit the data!");
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={formInputsState.name.classNames}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    ref={formInputsState.name.ref}
                />
            </div>
            <div className={formInputsState.street.classNames}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    ref={formInputsState.street.ref}
                />
            </div>
            <div className={formInputsState.postal.classNames}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    type="text"
                    id="postal"
                    name="postal"
                    ref={formInputsState.postal.ref}
                />
            </div>
            <div className={formInputsState.city.classNames}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    ref={formInputsState.city.ref}
                />
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;
