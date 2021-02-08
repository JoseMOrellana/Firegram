import React from "react";
import styles from "./AuthForm.module.css";

export default function AuthForm({ children, submitFnc }) {
    return (
        <div className={styles.AuthForm}>
            <h1 className={styles.Heading}>Firegram</h1>
            <form onSubmit={submitFnc} data-testid="auth-form">
                {children}
            </form>
        </div>
    );
}
