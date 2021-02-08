import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import "../../helpers/IntersectionObserverMock";
import { useInfiniteScroll } from "../../context/InfiniteScrollContext";
import Home from "./Home";

beforeEach(cleanup);

jest.mock("../../context/InfiniteScrollContext", () => ({
    useInfiniteScroll: jest.fn(() => ({
        fetchPosts: jest.fn(() => [
            {
                id: 1,
                url: "",
                user: "",
                userData: {
                    photoURL: "",
                },
                likedBy: [],
            },
            {
                id: 2,
                url: "",
                user: "",
                userData: {
                    photoURL: "",
                },
                likedBy: [],
            },
        ]),
        loading: false,
        done: false,
    })),
}));

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: { username: "", following: [] },
        like: jest.fn(),
        dislike: jest.fn(),
        follow: jest.fn(),
        unfollow: jest.fn(),
        sendComment: jest.fn(),
    })),
}));

jest.mock("../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
    })),
}));

describe("<Home />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <Home />
            </Router>
        );
        expect(queryByTestId("home-page")).toBeTruthy();
    });

    test("calls 'fetchPosts' when firing click event in invisible button", () => {
        const fetchPosts = jest.fn(() => [
            {
                id: 1,
                url: "",
                user: "",
                userData: {
                    photoURL: "",
                },
                likedBy: [],
            },
            {
                id: 2,
                url: "",
                user: "",
                userData: {
                    photoURL: "",
                },
                likedBy: [],
            },
        ]);
        useInfiniteScroll.mockImplementation(() => ({
            fetchPosts,
            loading: false,
            done: false,
        }));
        const { queryByTestId, debug } = render(
            <Router>
                <Home />
            </Router>
        );
        debug();
        fireEvent.click(queryByTestId("fetch-more-button"));
        expect(fetchPosts).toHaveBeenCalled();
    });

    test("renders spinner component when loading data", () => {
        useInfiniteScroll.mockImplementation(() => ({
            fetchPosts: jest.fn(() => [
                {
                    id: 1,
                    url: "",
                    user: "",
                    userData: {
                        photoURL: "",
                    },
                    likedBy: [],
                },
                {
                    id: 2,
                    url: "",
                    user: "",
                    userData: {
                        photoURL: "",
                    },
                    likedBy: [],
                },
            ]),
            loading: true,
            done: false,
        }));
        const { queryByTestId } = render(
            <Router>
                <Home />
            </Router>
        );
        expect(queryByTestId("spinner-component")).toBeTruthy();
    });

    test("renders NoMoreLoad component when all data has been fetched", () => {
        useInfiniteScroll.mockImplementation(() => ({
            fetchPosts: jest.fn(() => [
                {
                    id: 1,
                    url: "",
                    user: "",
                    userData: {
                        photoURL: "",
                    },
                    likedBy: [],
                },
                {
                    id: 2,
                    url: "",
                    user: "",
                    userData: {
                        photoURL: "",
                    },
                    likedBy: [],
                },
            ]),
            loading: false,
            done: true,
        }));
        const { queryByTestId } = render(
            <Router>
                <Home />
            </Router>
        );
        expect(queryByTestId("no-more-load-component")).toBeTruthy();
    });
});
