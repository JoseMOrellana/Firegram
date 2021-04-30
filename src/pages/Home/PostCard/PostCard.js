import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "../../../components/Avatar/Avatar";
import FollowButton from "../../../components/FollowButton/FollowButton";
import CommentForm from "../../../components/ImageDisplay/CommentsSection/CommentForm/CommentForm";
import Like from "../../../components/Like/Like";
import { useShowImage } from "../../../context/ShowImageContext";
import { timeAgo } from "../../../helpers/timeAgo";
import styles from "./PostCard.module.css";

const PostCard = ({ post }) => {
    const { setImage } = useShowImage();
    const [postState, setPostState] = useState(post);
    return (
        <li className={styles.Card} data-testid="post-card-component">
            <img src={post.url} alt="post" onClick={() => setImage(post)} />
            <div className={styles.UserData}>
                <div className={styles.ImgAndUsername}>
                    <Avatar src={post.userData.photoURL} mini />
                    <Link to={`/u/${post.user}`}>{post.user}</Link>
                </div>
                <FollowButton username={post.user} update={setPostState} />
            </div>

            <div className={styles.Footer}>
                <div className={styles.Details}>
                    <p>{post.description}</p>
                    <Like post={post} update={setPostState} />
                    <span>{timeAgo(post.createdAt?.toDate())}</span>
                </div>
                <CommentForm selectedImg={post} />
            </div>
        </li>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        url: PropTypes.string,
        user: PropTypes.string,
        userData: PropTypes.object,
        createdAt: PropTypes.object,
        likedBy: PropTypes.array,
    }),
};

export default PostCard;
