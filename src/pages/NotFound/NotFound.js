import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";
import { useUser } from "../../context/UserContext";

export default function NotFound() {
    const { currentUser } = useUser();
    return (
        <div className={styles.Container} data-testid="not-found-page">
            <div className={styles.Content}>
                <img
                    src="/images/Loch Ness-big.png"
                    alt="Loch Ness and big foot ilustrations"
                />
                <h1>Whoops!</h1>
                <p>Nothing to see here</p>
                {currentUser ? (
                    <Link to="/home">Go home</Link>
                ) : (
                    <Link to="/">Go to login</Link>
                )}
            </div>
        </div>
    );
}
