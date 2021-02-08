import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

const Button = ({ children, variant, ...rest }) => {
    return (
        <button {...rest} className={styles[variant]}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.any,
    variant: PropTypes.string,
};

export default Button;
