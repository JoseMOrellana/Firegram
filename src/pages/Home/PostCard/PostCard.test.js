import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import PostCard from "./PostCard";
import { webTimestamp } from "../../../firebase/config";

beforeEach(cleanup);

jest.mock("../../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
    })),
}));

jest.mock("../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: { username: "", following: [] },
        like: jest.fn(),
        dislike: jest.fn(),
        follow: jest.fn(),
        unfollow: jest.fn(),
        sendComment: jest.fn(),
    })),
}));

const post = {
    url: "",
    user: "",
    userData: {
        photoURL: "",
    },
    createdAt: new webTimestamp(),
    likedBy: [],
};

console.log(post);

describe("<PostCard />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <PostCard post={post} />
            </Router>
        );
        expect(queryByTestId("post-card-component")).toBeTruthy();
    });
});
