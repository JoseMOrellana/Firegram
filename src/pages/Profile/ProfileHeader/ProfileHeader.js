import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./ProfileHeader.module.css";
import { useUser } from "../../../context/UserContext";
import Avatar from "../../../components/Avatar/Avatar";
import FollowButton from "../../../components/FollowButton/FollowButton";

const ProfileHeader = ({ userData }) => {
    const { currentUser } = useUser();

    const editProfile = (
        <Link
            to="/edit-profile"
            className={styles.HeaderButton}
            data-testid="edit-profile-link"
        >
            Edit Profile
        </Link>
    );
    return (
        <>
            <div
                className={styles.ProfileHeader}
                data-testid="profile-header-component"
            >
                <Avatar src={userData.photoURL} />
                <div className={styles.Info}>
                    <div className={styles.First}>
                        <span
                            className={styles.Username}
                            data-testid="user-username"
                        >
                            {userData.username}
                        </span>
                        {userData.username === currentUser.username ? (
                            editProfile
                        ) : (
                            <FollowButton username={userData.username} />
                        )}
                    </div>
                    <div className={styles.Second}>
                        <span>
                            <strong data-testid="user-posts-number">
                                {userData?.posts.length}
                            </strong>{" "}
                            posts
                        </span>
                        <span>
                            <strong data-testid="user-followers-number">
                                {userData?.followers?.length}
                            </strong>{" "}
                            followers
                        </span>
                        <span>
                            <strong data-testid="user-following-number">
                                {userData?.following?.length}
                            </strong>{" "}
                            Following
                        </span>
                    </div>
                    <span className={styles.Name}>{userData.name}</span>
                </div>
            </div>
            <span className={styles.NameMobile}>{userData.name}</span>
            <div className={styles.SecondMobile}>
                <span>
                    <strong>{userData?.posts.length}</strong> posts
                </span>
                <span>
                    <strong>{userData?.followers}</strong> followers
                </span>
                <span>
                    <strong>{userData?.following}</strong> Following
                </span>
            </div>
        </>
    );
};

ProfileHeader.propTypes = {
    userData: PropTypes.shape({
        photoURL: PropTypes.string,
        username: PropTypes.string,
        name: PropTypes.string,
        posts: PropTypes.array,
        followers: PropTypes.array,
        following: PropTypes.array,
    }),
};

export default ProfileHeader;
