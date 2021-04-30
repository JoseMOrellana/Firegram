import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PropTypes from "prop-types";

import { useUser } from "../../context/UserContext";
import styles from "./Like.module.css";

const Like = ({ post, update }) => {
    const { currentUser, like, dislike } = useUser();

    return (
        <div data-testid="like-component" className={styles.Container}>
            {post.likedBy.includes(currentUser.username) ? (
                <FaHeart
                    onClick={() => {
                        dislike(post);
                        update({
                            ...post,
                            likedBy: post.likedBy.splice(
                                post.likedBy.indexOf(currentUser.username),
                                1
                            ),
                        });
                    }}
                    className={styles.Liked}
                    data-testid="liked-icon"
                />
            ) : (
                <FaRegHeart
                    onClick={() => {
                        like(post);
                        update({
                            ...post,
                            likedBy: post.likedBy.push(currentUser.username),
                        });
                    }}
                    data-testid="not-liked-icon"
                />
            )}
            <span>{post.likedBy.length} likes</span>
        </div>
    );
};

Like.propTypes = {
    post: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
};

export default Like;
