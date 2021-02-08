import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PropTypes from "prop-types";

import { useUser } from "../../context/UserContext";

const Like = ({ post, update }) => {
    const { currentUser, like, dislike } = useUser();

    return (
        <div data-testid="like-component">
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
    update: PropTypes.func,
};

export default Like;
