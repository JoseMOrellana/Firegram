import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import styles from "./Signup.module.css";

export default function Signup() {
    const { signup, error, loading } = useUser();
    const { inputs, handleInputChange, handleSubmit, submitted } = useForm(
        signup,
        "/home"
    );
    return (
        <div className={styles.Signup} data-testid="signup-page">
            <AuthForm submitFnc={handleSubmit}>
                <span>Signup to see pictures and videos of your friends</span>
                <FormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={inputs.name}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={inputs.username}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={inputs.passwordConfirm}
                    onChange={handleInputChange}
                    required
                />
                <span className={styles.Error}>{submitted && error}</span>
                <Button
                    type="submit"
                    variant="FormSubmit"
                    disabled={loading}
                    data-testid="submit-button"
                >
                    Sign Up
                </Button>
                <hr className={styles.Separator} />
                <span>
                    Already have an account? <Link to="/">Log in</Link>
                </span>
            </AuthForm>
        </div>
    );
}
