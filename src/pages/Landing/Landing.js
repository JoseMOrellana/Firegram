import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import styles from "./Landing.module.css";

export default function Landing() {
    const { login, error } = useUser();
    const { inputs, handleInputChange, handleSubmit, submitted } = useForm(
        login,
        "/home"
    );

    return (
        <div className={styles.Landing} data-testid="landing-page">
            <AuthForm submitFnc={handleSubmit}>
                <FormInput
                    type="text"
                    name="id"
                    placeholder="User or email"
                    value={inputs.id}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.passwords}
                    onChange={handleInputChange}
                    required
                />
                <span className={styles.Error}>{submitted && error}</span>
                <Button
                    type="submit"
                    variant="FormSubmit"
                    data-testid="submit-button"
                >
                    Log In
                </Button>
                <hr className={styles.Separator} />
                <Link to="reset-password" className={styles.ForgotPassword}>
                    Forgot password?
                </Link>
                <span className={styles.SignUp}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </span>
            </AuthForm>
        </div>
    );
}
