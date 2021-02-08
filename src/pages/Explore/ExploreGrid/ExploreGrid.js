import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useInfiniteScroll } from "../../../context/InfiniteScrollContext";
import styles from "./ExploreGrid.module.css";
import { useShowImage } from "../../../context/ShowImageContext";

const ExploreGrid = ({ posts }) => {
    const { setImage } = useShowImage();
    return (
        <>
            <li
                className={styles.Container}
                data-testid="explore-grid-component"
            >
                {posts.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={
                            index === 0 && posts.length > 5
                                ? styles.BigImg
                                : styles.Img
                        }
                        whileHover={{ opacity: 1 }}
                        onClick={() => {
                            setImage(item);
                        }}
                        data-testid="post-wrapper"
                    >
                        <motion.img
                            src={item.url}
                            alt="random post"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
            </li>
        </>
    );
};

ExploreGrid.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
};

export default ExploreGrid;
