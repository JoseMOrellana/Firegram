import React, { useState } from "react";

export default function useForm(callback) {
    const [inputs, setInputs] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        callback(inputs);
        setSubmitted(true);
    };

    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        submitted,
        submitting,
    };
}
