import { useState, useEffect, ChangeEvent } from "react";
import { IAuth } from "../interfaces/IAuth";


export const useForm = (callback: () => void, validate: ({ }: IAuth) => IAuth) => {
    const [values, setValues] = useState<IAuth>({});
    const [errors, setErrors] = useState<IAuth>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors, isSubmitting, callback]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();

        setValues((values: IAuth) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event: ChangeEvent<EventTarget>) => {
        if (event) event.preventDefault();

        values && setErrors(validate(values));
        setIsSubmitting(true);
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    };
};
