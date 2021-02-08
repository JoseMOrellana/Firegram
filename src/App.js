import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { UserProvider } from "./context/UserContext";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Explore from "./pages/Explore/Explore";
import { InfiniteScrollProvider } from "./context/InfiniteScrollContext";
import { ShowImageProvider } from "./context/ShowImageContext";
import { getHomePosts, getPosts } from "./helpers/posts";
import NotFound from "./pages/NotFound/NotFound";
import AuthRoute from "./components/AuthRoute/AuthRoute";

function App() {
    return (
        <Router>
            <UserProvider>
                <ShowImageProvider>
                    <Route
                        render={({ location }) =>
                            ![
                                "/",
                                "/signup",
                                "/reset-password",
                                "/404",
                            ].includes(location.pathname) ? (
                                <Header />
                            ) : null
                        }
                    />
                    <Switch>
                        <AuthRoute exact path="/" component={Landing} />
                        <AuthRoute path="/signup" component={Signup} />
                        <AuthRoute
                            path="/reset-password"
                            component={ForgotPassword}
                        />
                        <PrivateRoute
                            path="/home"
                            render={(props) => (
                                <InfiniteScrollProvider
                                    limit={10}
                                    fnc={getHomePosts}
                                    followingOnly
                                >
                                    <Home />
                                </InfiniteScrollProvider>
                            )}
                        />
                        <PrivateRoute
                            path="/edit-profile"
                            component={EditProfile}
                        />
                        <PrivateRoute
                            path="/explore"
                            render={(props) => (
                                <InfiniteScrollProvider
                                    limit={18}
                                    fnc={getPosts}
                                >
                                    <Explore />
                                </InfiniteScrollProvider>
                            )}
                        />
                        <PrivateRoute path="/u/:username" component={Profile} />
                        <Route path="/404" component={NotFound} />
                        <Route render={() => <Redirect to="/404" />} />
                    </Switch>
                </ShowImageProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
