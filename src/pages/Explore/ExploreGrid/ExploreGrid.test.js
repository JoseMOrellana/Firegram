import React from "react";
import { render, cleanup } from "@testing-library/react";

import ExploreGrid from "./ExploreGrid";

beforeEach(cleanup);

jest.mock("../../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
    })),
}));

const posts = [
    {
        id: 1,
        url: "",
    },
    {
        id: 2,
        url: "",
    },
];

describe("<ExploreGrid />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<ExploreGrid posts={posts} />);
        expect(queryByTestId("explore-grid-component")).toBeTruthy();
    });

    test("renders the correct amount of posts", () => {
        const { queryAllByTestId } = render(<ExploreGrid posts={posts} />);
        expect(queryAllByTestId("post-wrapper").length).toBe(posts.length);
    });
});
