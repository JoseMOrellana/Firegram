import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FollowButton from "./FollowButton";
import { useUser } from "../../context/UserContext";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: {
            following: [],
        },
        follow: jest.fn(),
        unfollow: jest.fn(),
    })),
}));

describe("<FollowButton />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<FollowButton username="user" />);
        expect(queryByTestId("follow-button-component")).toBeTruthy();
    });

    test("renders 'Follow' text and calls 'follow' func when user is not following profile ", () => {
        const follow = jest.fn();
        useUser.mockImplementation(() => ({
            currentUser: { following: [] },
            follow,
        }));
        const { queryByTestId } = render(<FollowButton username="user" />);
        expect(queryByTestId("follow-button-component")).toHaveTextContent(
            "Follow"
        );
        fireEvent.click(queryByTestId("follow-button-component"));
        expect(follow).toHaveBeenCalled();
    });

    test("renders 'Unfollow' text and calls 'unfollow' func when user is following profile ", () => {
        const unfollow = jest.fn();
        useUser.mockImplementation(() => ({
            currentUser: { following: ["user"] },
            unfollow,
        }));
        const { queryByTestId } = render(<FollowButton username="user" />);
        expect(queryByTestId("follow-button-component")).toHaveTextContent(
            "Unfollow"
        );
        fireEvent.click(queryByTestId("follow-button-component"));
        expect(unfollow).toHaveBeenCalled();
    });
});
