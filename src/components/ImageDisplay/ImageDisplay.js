import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./ImageDisplay.module.css";
import useComments from "../../hooks/useComments";
import Avatar from "../Avatar/Avatar";
import CommentsSection from "./CommentsSection/CommentsSection";
import { timeAgo } from "../../helpers/timeAgo";
import CommentForm from "./CommentsSection/CommentForm/CommentForm";
import useProfileData from "../../hooks/useProfileData";
import { useShowImage } from "../../context/ShowImageContext";
import FollowButton from "../FollowButton/FollowButton";
import Like from "../Like/Like";

const ImageDisplay = ({ selectedImg }) => {
    const { setImage } = useShowImage();
    const { comments } = useComments(selectedImg.id);
    const { userData } = useProfileData(selectedImg.user);

    return (
        <div className={styles.Container} data-testid="image-display-component">
            <img
                src={selectedImg.url}
                alt="Selected by user"
                className={styles.ImgWrapper}
            />
            <div className={styles.Info}>
                <div className={styles.Header}>
                    <Avatar src={userData.photoURL} mini />
                    <Link
                        to={"/u/" + userData.username}
                        className={styles.Username}
                        onClick={() => {
                            setImage(null);
                        }}
                        data-testid="user-link"
                    >
                        {userData.username}
                    </Link>
                    <FollowButton
                        username={userData.username}
                        style={{ marginLeft: "auto" }}
                    />
                </div>
                <CommentsSection
                    comments={comments}
                    selectedImg={selectedImg}
                />
                <div className={styles.Footer}>
                    <div className={styles.Details}>
                        <Like post={selectedImg} />
                        <span>{timeAgo(selectedImg.createdAt.toDate())}</span>
                    </div>
                    <CommentForm selectedImg={selectedImg} />
                </div>
            </div>
        </div>
    );
};

ImageDisplay.propTypes = {
    selectedImg: PropTypes.object.isRequired,
};

export default ImageDisplay;
