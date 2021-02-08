import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Like from "./Like";
import { useUser } from "../../context/UserContext";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: { username: "user" },
        like: jest.fn(),
        dislike: jest.fn(),
    })),
}));

const post = {
    likedBy: [],
};

const update = jest.fn();

describe("<Like />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<Like post={post} update={update} />);
        expect(queryByTestId("like-component")).toBeTruthy();
    });
    test("calls 'like' func when user has not liked post", () => {
        const like = jest.fn();
        useUser.mockImplementation(() => ({
            currentUser: { username: "user" },
            like,
            dislike: jest.fn(),
        }));
        const { queryByTestId } = render(<Like post={post} update={update} />);
        fireEvent.click(queryByTestId("not-liked-icon"));
        expect(like).toHaveBeenCalled();
    });
    test("calls 'dislike' func when user has liked post", () => {
        const dislike = jest.fn();
        useUser.mockImplementation(() => ({
            currentUser: { username: "user" },
            like: jest.fn(),
            dislike,
        }));
        post.likedBy.push("user");
        const { queryByTestId } = render(<Like post={post} update={update} />);
        fireEvent.click(queryByTestId("liked-icon"));
        expect(dislike).toHaveBeenCalled();
    });
});
