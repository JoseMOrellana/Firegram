import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function AuthRoute({ component: Component, render, ...rest }) {
    const { currentUser } = useUser();
    let renderFnc = (props) => {
        return currentUser ? <Redirect to="/home" /> : <Component {...props} />;
    };
    if (render && !currentUser) {
        renderFnc = render;
    }
    return <Route {...rest} render={renderFnc}></Route>;
}
