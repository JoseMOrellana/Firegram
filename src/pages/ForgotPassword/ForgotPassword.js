import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
    const { forgotPassword, error } = useUser();
    const { inputs, handleInputChange, handleSubmit, submitted } = useForm(
        forgotPassword,
        "/"
    );
    return (
        <div
            className={styles.ForgotPassword}
            data-testid="forgot-password-page"
        >
            <AuthForm submitFnc={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    required
                />
                <span className={styles.Error}>{submitted && error}</span>
                <Button
                    type="submit"
                    variant="FormSubmit"
                    data-testid="submit-button"
                >
                    Reset Password
                </Button>
                <hr className={styles.Separator} />
                <Link className={styles.Links} to="/">
                    Back to login
                </Link>
                <Link className={styles.Links} to="/signup">
                    Back to signup
                </Link>
            </AuthForm>
        </div>
    );
}
