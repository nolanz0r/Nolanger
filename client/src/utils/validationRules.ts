import { IAuth } from "../interfaces/IAuth";


export const loginValidation = (values: IAuth) => {
    const errors: IAuth = {};
    commonValidation(values, errors);
    return errors;
};

export const registerValidation = (values: IAuth) => {
    const errors: IAuth = {};
    if (!values.name) {
        errors.name = "Name is required";
    } else if (values.name.length < 2) {
        errors.name = "Name must be 2 or more characters";
    }
    commonValidation(values, errors);
    return errors;
};

const commonValidation = (values: IAuth, errors: IAuth) => {
    if (!values.email) {
        errors.email = "Email address is required";
    } else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Email address is invalid";
    }
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be 6 or more characters";
    }
};