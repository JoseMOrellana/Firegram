import React, { useState } from "react";
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
    const { comments, profilePics } = useComments(selectedImg.id);
    const { profileData } = useProfileData(selectedImg.user);
    const [postState, setPostState] = useState(selectedImg);

    return (
        <div className={styles.Container} data-testid="image-display-component">
            <img
                src={selectedImg.url}
                alt="Selected by user"
                className={styles.ImgWrapper}
            />
            <div className={styles.Info}>
                <div className={styles.Header}>
                    <Avatar src={profileData.photoURL} mini />
                    <Link
                        to={"/u/" + profileData.username}
                        className={styles.Username}
                        onClick={() => {
                            setImage(null);
                        }}
                        data-testid="user-link"
                    >
                        {profileData.username}
                    </Link>
                    <FollowButton
                        username={profileData.username}
                        style={{ marginLeft: "auto" }}
                    />
                </div>
                <CommentsSection
                    comments={comments}
                    profilePics={profilePics}
                    selectedImg={selectedImg}
                />
                <div className={styles.Footer}>
                    <div className={styles.Details}>
                        <Like post={selectedImg} update={setPostState} />
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
