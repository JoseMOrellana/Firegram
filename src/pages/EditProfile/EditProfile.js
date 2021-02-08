import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./EditProfile.module.css";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import ChangePassword from "./ChangePassword/ChangePassword";

export default function EditProfile() {
    return (
        <div className="content" data-testid="edit-profile-page">
            <div className={styles.Menu}>
                <ul>
                    <li>
                        <NavLink
                            exact
                            to="/edit-profile"
                            activeClassName={styles.Active}
                        >
                            Edit Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/edit-profile/password"
                            activeClassName={styles.Active}
                        >
                            Change Password
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={styles.FormContainer}>
                <Switch>
                    <Route
                        exact
                        path="/edit-profile"
                        component={EditProfileForm}
                    />
                    <Route
                        path="/edit-profile/password"
                        component={ChangePassword}
                    />
                </Switch>
            </div>
        </div>
    );
}
