import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useUser } from "../../context/UserContext";
import Button from "../Button/Button";

const FollowButton = ({ username, update, ...rest }) => {
    const { currentUser, follow, unfollow } = useUser();
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        setLoading(true);
        await follow(username);
        setLoading(false);
    };
    const handleUnfollow = async () => {
        setLoading(true);
        await unfollow(username);
        setLoading(false);
    };
    return (
        <Button
            variant="Plain"
            onClick={
                currentUser.following.includes(username)
                    ? handleUnfollow
                    : handleFollow
            }
            disabled={loading}
            data-testid="follow-button-component"
            {...rest}
        >
            {currentUser.following.includes(username) ? "Unfollow" : "Follow"}
        </Button>
    );
};

FollowButton.propTypes = {
    username: PropTypes.string,
    update: PropTypes.func,
};

export default FollowButton;
