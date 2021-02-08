import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import "../../helpers/IntersectionObserverMock";
import Explore from "./Explore";
import { useInfiniteScroll } from "../../context/InfiniteScrollContext";

beforeEach(cleanup);

jest.mock("../../context/InfiniteScrollContext", () => ({
    useInfiniteScroll: jest.fn(() => ({
        fetchPosts: jest.fn(() => [
            {
                id: 1,
                url: "",
            },
            {
                id: 2,
                url: "",
            },
        ]),
        loading: false,
        done: false,
    })),
}));

jest.mock("../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
    })),
}));

describe("<Explore />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<Explore />);
        expect(queryByTestId("explore-page")).toBeTruthy();
    });

    test("calls 'fetchPosts' when firing click event in invisible button", () => {
        const fetchPosts = jest.fn(() => [
            {
                id: 1,
                url: "",
            },
            {
                id: 2,
                url: "",
            },
        ]);
        useInfiniteScroll.mockImplementation(() => ({
            fetchPosts,
            loading: false,
            done: false,
        }));
        const { queryByTestId, debug } = render(<Explore />);
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
                },
                {
                    id: 2,
                    url: "",
                },
            ]),
            loading: true,
            done: false,
        }));
        const { queryByTestId } = render(<Explore />);
        expect(queryByTestId("spinner-component")).toBeTruthy();
    });

    test("renders NoMoreLoad component when all data has been fetched", () => {
        useInfiniteScroll.mockImplementation(() => ({
            fetchPosts: jest.fn(() => [
                {
                    id: 1,
                    url: "",
                },
                {
                    id: 2,
                    url: "",
                },
            ]),
            loading: false,
            done: true,
        }));
        const { queryByTestId } = render(<Explore />);
        expect(queryByTestId("no-more-load-component")).toBeTruthy();
    });
});
