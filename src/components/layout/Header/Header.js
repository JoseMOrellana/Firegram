import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FaUser, FaSortDown, FaHome, FaCompass } from "react-icons/fa";

import styles from "./Header.module.css";
import { useUser } from "../../../context/UserContext";

export default function Header() {
    const { currentUser, logout } = useUser();
    const [menu, setMenu] = useState(false);

    const showMenu = () => {
        setMenu(true);
        document.addEventListener("click", hideMenu);
    };

    const hideMenu = () => {
        setMenu(false);
        document.removeEventListener("click", hideMenu);
    };
    return (
        <header className={styles.Header} data-testid="header-component">
            <div className={styles.LogoContainer}>
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className={styles.HeaderLogo}
                />
                <h1 className={styles.HeaderTitle}>Firegram</h1>
            </div>
            <div className={styles.Options}>
                <Link to="/home">
                    <FaHome className={styles.Icons} />
                </Link>
                <Link to="/explore">
                    <FaCompass className={styles.Icons} />
                </Link>
                <div
                    className={styles.Icons}
                    style={{ display: "inline-block" }}
                    onClick={!menu && showMenu}
                    data-testid="user-menu-icon-wrapper"
                >
                    <FaUser />
                    <FaSortDown />
                </div>

                {menu && (
                    <ul className={styles.Menu} data-testid="user-menu">
                        <li>
                            <Link to={"/u/" + currentUser.username}>
                                My profile
                            </Link>
                        </li>
                        <li onClick={logout} className={styles.Logout}>
                            Log out
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
}
