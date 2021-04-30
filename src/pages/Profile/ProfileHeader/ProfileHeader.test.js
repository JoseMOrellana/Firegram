import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import ProfileHeader from "./ProfileHeader";
import { useUser } from "../../../context/UserContext";

beforeEach(cleanup);

jest.mock("../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: {
            username: "user",
            following: [],
        },
    })),
}));

const userData = {
    photoURL: "",
    username: "user",
    name: "",
    posts: 2,
    followers: ["", ""],
    following: ["", "", ""],
};

describe("<ProfileHeader />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <ProfileHeader userData={userData} />
            </Router>
        );
        expect(queryByTestId("profile-header-component")).toBeTruthy();
    });

    test("renders data correctly", () => {
        const { queryByTestId } = render(
            <Router>
                <ProfileHeader userData={userData} />
            </Router>
        );
        expect(queryByTestId("user-posts-number")).toHaveTextContent(
            userData.posts.length
        );
        expect(queryByTestId("user-following-number")).toHaveTextContent(
            userData.following.length
        );
        expect(queryByTestId("user-followers-number")).toHaveTextContent(
            userData.followers.length
        );
        expect(queryByTestId("user-username")).toHaveTextContent(
            userData.username
        );
    });

    test("renders edit profile link when user is the same that the current logged in", () => {
        const { queryByTestId } = render(
            <Router>
                <ProfileHeader userData={userData} />
            </Router>
        );
        expect(queryByTestId("edit-profile-link")).toBeTruthy();
    });
});
