import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => {
    return (
        <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: progress + "%" }}
            data-testid="progress-bar-component"
        ></motion.div>
    );
};

export default ProgressBar;
