import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import CommentsSection from "./CommentsSection";
import { webTimestamp } from "../../../firebase/config";

jest.mock("../../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
    })),
}));

jest.mock("../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        sendComment: jest.fn(),
    })),
}));

const comments = [
    {
        responses: [{ user: "" }, { user: "" }],
        user: "",
        id: "",
        createdAt: new webTimestamp(),
        content: "",
    },
    {
        responses: [{ user: "" }, { user: "" }],
        user: "",
        id: "",
        createdAt: new webTimestamp(),
        content: "",
    },
];

describe("<CommentSection />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<CommentsSection />);
        expect(queryByTestId("comments-section-component")).toBeTruthy();
    });
    test("renders the right amount of comments", () => {
        const { queryAllByTestId } = render(
            <Router>
                <CommentsSection comments={comments} selectedImg="" />
            </Router>
        );
        expect(queryAllByTestId("comment-component").length).toBe(
            comments.length
        );
    });
});
