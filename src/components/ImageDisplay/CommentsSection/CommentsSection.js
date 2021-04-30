import React from "react";
import PropTypes from "prop-types";

import styles from "./CommentsSection.module.css";
import Comment from "./Comment/Comment";
import {
    ProfilePicsContext,
    ProfilePicsProvider,
} from "../../../context/ProfilePicsContext";

const CommentsSection = ({ comments, selectedImg }) => {
    let usernames = [];
    if (comments) {
        comments.forEach((comment) => {
            usernames.push(comment.user);
            if (comment.responses) {
                usernames = usernames.concat(
                    comment.responses.map((response) => response.user)
                );
            }
        });
    }
    return (
        <ProfilePicsProvider usernames={[...new Set(usernames)]}>
            <ul
                className={styles.Comments}
                data-testid="comments-section-component"
            >
                {comments &&
                    comments.map((comment) => {
                        return (
                            <Comment
                                data={comment}
                                selectedImg={selectedImg}
                                key={comment.id}
                            />
                        );
                    })}
            </ul>
        </ProfilePicsProvider>
    );
};

CommentsSection.propTypes = {
    comments: PropTypes.array,
    selectedImg: PropTypes.object,
};

export default CommentsSection;
