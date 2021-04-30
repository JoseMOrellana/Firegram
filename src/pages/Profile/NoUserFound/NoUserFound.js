import React from "react";
import styles from "./NoUserFound.module.css";

const NoUserFound = () => (
    <div className={styles.NoUser}>
        <img src="/images/404-space.png" alt="Astronaut 404" />
        <h1>No user found...</h1>
    </div>
);

export default NoUserFound;
