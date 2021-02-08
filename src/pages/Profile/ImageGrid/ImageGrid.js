import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import styles from "./ImageGrid.module.css";
import { useShowImage } from "../../../context/ShowImageContext";

const ImageGrid = ({ pics, user }) => {
    const { setImage, setUser } = useShowImage();
    return (
        <div className={styles.ImgGrid} data-testid="image-grid-component">
            {pics &&
                pics.map((doc) => (
                    <motion.div
                        className={styles.ImgWrap}
                        key={doc.id}
                        layout
                        whileHover={{ opacity: 1 }}
                        onClick={() => {
                            setImage(doc);
                            setUser(user);
                        }}
                        data-testid="image-wrapper"
                    >
                        <motion.img
                            src={doc.url}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
        </div>
    );
};

ImageGrid.propTypes = {
    pics: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            url: PropTypes.string,
        })
    ),
    user: PropTypes.object,
};

export default ImageGrid;
