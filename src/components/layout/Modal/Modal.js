import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ children, close }) => {
    const handleClick = (e) => {
        if (e.target.classList.contains(styles.Modal)) {
            close();
        }
    };

    return (
        <motion.div
            className={styles.Modal}
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-testid="modal-component"
        >
            {/* <motion.img 
                src={selectedImg} 
                alt="enlarged pics" 
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            /> */}
            {children}
        </motion.div>
    );
};

Modal.propTypes = {
    close: PropTypes.func.isRequired,
};

export default Modal;
