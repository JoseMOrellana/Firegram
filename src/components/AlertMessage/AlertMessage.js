import React from "react";
import { FaTimes } from "react-icons/fa";

import styles from "./AlertMessage.module.css";

export default function AlertMessage({ message, close }) {
    return (
        <div className={styles.Alert}>
            <span>{message}</span>
            <FaTimes onClick={close} />
        </div>
    );
}
