import React from "react";
import styles from "./Spinner.module.css";

export default function Spinner() {
    return (
        <div className={styles.Spinner} data-testid="spinner-component"></div>
    );
}
