import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./CommentsSection.module.css";
import Comment from "./Comment/Comment";

const CommentsSection = ({ comments, selectedImg }) => {
    return (
        <ul
            className={styles.Comments}
            data-testid="comments-section-component"
        >
            {comments &&
                comments.map((comment) => {
                    return (
                        <li key={comment.id} className={styles.Comment}>
                            <Comment data={comment} selectedImg={selectedImg} />
                        </li>
                    );
                })}
        </ul>
    );
};

CommentsSection.propTypes = {
    comments: PropTypes.array.isRequired,
    selectedImg: PropTypes.object.isRequired,
};

export default CommentsSection;
