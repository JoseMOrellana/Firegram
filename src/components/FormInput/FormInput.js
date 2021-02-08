import React from "react";
import PropTypes from "prop-types";

import styles from "./FormInput.module.css";

const FormInput = ({ label, style, ...rest }) => {
    let inputStyling = {};
    if (!label) {
        inputStyling = { width: "100%" };
    }
    return (
        <div
            className={styles.InputContainer}
            data-testid="form-input-component"
        >
            {label && <label data-testid="form-input-label">{label}</label>}
            <input style={{ ...inputStyling, ...style }} {...rest} />
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
};

export default FormInput;
