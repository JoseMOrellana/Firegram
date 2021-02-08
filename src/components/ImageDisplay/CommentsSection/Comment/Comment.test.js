import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Comment from "./Comment";
import { webTimestamp } from "../../../../firebase/config";
import { useShowImage } from "../../../../context/ShowImageContext";

jest.mock("../../../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
    })),
}));

jest.mock("../../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        sendComment: jest.fn(),
    })),
}));

const data = {
    responses: [{ user: "" }, { user: "" }],
    user: "",
    id: "",
    createdAt: new webTimestamp(),
    content: "",
};

describe("<Comment />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <Comment data={data} />
            </Router>
        );
        expect(queryByTestId("comment-component")).toBeTruthy();
    });

    test("renders responses and comment form when user clicks the respectives placeholders", () => {
        const { queryByTestId } = render(
            <Router>
                <Comment data={data} selectedImg="img" />
            </Router>
        );
        fireEvent.click(queryByTestId("comment-form-placeholder"));
        fireEvent.click(queryByTestId("responses-placeholder"));
        expect(queryByTestId("comment-form")).toBeTruthy();
        expect(queryByTestId("responses-wrapper")).toBeTruthy();
    });

    test("calls 'setImage' func when clicking an user link", () => {
        const setImage = jest.fn();
        useShowImage.mockImplementation(() => ({ setImage }));
        const { queryByTestId } = render(
            <Router>
                <Comment data={data} selectedImg="img" />
            </Router>
        );
        fireEvent.click(queryByTestId("user-link"));
        expect(setImage).toHaveBeenCalled();
    });
});
