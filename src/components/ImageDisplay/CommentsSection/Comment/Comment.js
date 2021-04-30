import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./Comment.module.css";
import { useShowImage } from "../../../../context/ShowImageContext";
import Avatar from "../../../Avatar/Avatar";
import CommentForm from "../CommentForm/CommentForm";
import { useProfilePics } from "../../../../context/ProfilePicsContext";

const Comment = ({ data, selectedImg }) => {
    const { profilePics } = useProfilePics();
    const { setImage } = useShowImage();
    const [showResponses, setShowResponses] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const responses = data.responses?.map((response) => (
        <Comment data={response} />
    ));

    return (
        <li key={data.id || data.createdAt} data-testid="comment-component">
            <div className={styles.Container}>
                <Avatar src={profilePics[data.user]} mini />
                <div className={styles.Content}>
                    <Link
                        to={`/u/${data.user}`}
                        className={styles.Username}
                        onClick={() => {
                            setImage(null);
                        }}
                        data-testid="user-link"
                    >
                        {data.user}
                    </Link>
                    <span>{data.content}</span>
                </div>
            </div>
            <ul className={styles.InnerList}>
                {responses && responses.length > 0 ? (
                    showResponses ? (
                        <div data-testid="responses-wrapper">{responses}</div>
                    ) : (
                        <li
                            onClick={() => setShowResponses(true)}
                            className={styles.Placeholders}
                            data-testid="responses-placeholder"
                        >{`-See (${responses.length}) responses-`}</li>
                    )
                ) : null}
                {showForm ? (
                    <CommentForm
                        selectedImg={selectedImg}
                        parentComment={data.id}
                    />
                ) : selectedImg ? (
                    <li
                        onClick={() => setShowForm(true)}
                        className={styles.Placeholders}
                        data-testid="comment-form-placeholder"
                    >
                        -Respond-
                    </li>
                ) : null}
            </ul>
        </li>
    );
};

Comment.propTypes = {
    data: PropTypes.object,
    selectedImg: PropTypes.object,
};

export default Comment;
