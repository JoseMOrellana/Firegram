import React from "react";
import styles from "./NoMoreLoad.module.css";

export default function NoMoreLoad() {
    return (
        <div className={styles.Container} data-testid="no-more-load-component">
            No more posts to load
        </div>
    );
}
