import React from "react";
import PropTypes from "prop-types";

import styles from "./Avatar.module.css";

const Avatar = ({ src, mini, medium }) => {
    let sizeStyling = {
        maxWidth: "150px",
        margin: "0 10%",
    };
    if (mini) {
        sizeStyling = {
            width: "10%",
            marginRight: "8px",
        };
    }
    if (medium) {
        sizeStyling = {
            width: "80px",
        };
    }
    return (
        <>
            <img
                src={src || "/images/default-user.jpg"}
                alt="User avatar"
                className={styles.Avatar}
                style={sizeStyling}
                data-testid="avatar-component"
            />
        </>
    );
};

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    mini: PropTypes.bool,
    medium: PropTypes.bool,
};

export default Avatar;
