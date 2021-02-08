import React from "react";
import styles from "./UploadButton.module.css";

export default function UploadButton({ showForm }) {
    return (
        <div
            className={styles.UploadButton}
            onClick={() => showForm(true)}
            data-testid="upload-button"
        >
            <span>+</span>
        </div>
    );
}
