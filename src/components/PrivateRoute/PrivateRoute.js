import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { useUser } from "../../context/UserContext";

const PrivateRoute = ({ component: Component, render, ...rest }) => {
    const { currentUser } = useUser();
    let renderFnc = (props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
    };
    if (render && currentUser) {
        renderFnc = render;
    }
    return <Route {...rest} render={renderFnc}></Route>;
};

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]),
    render: PropTypes.func,
};

export default PrivateRoute;
