import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import CommentForm from "./CommentForm";
import { useUser } from "../../../../context/UserContext";

jest.mock("../../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        sendComment: jest.fn(),
    })),
}));

beforeEach(cleanup);

describe("<CommentForm />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<CommentForm />);
        expect(queryByTestId("comment-form")).toBeTruthy();
    });

    test("calls 'send comment' func", () => {
        const sendComment = jest.fn();
        useUser.mockImplementation(() => ({ sendComment }));
        const { queryByTestId, debug } = render(
            <CommentForm selectedImg={{}} />
        );
        fireEvent.change(queryByTestId("comment-form-input"), {
            target: { value: "a" },
        });
        debug();
        fireEvent.click(queryByTestId("comment-form-submit-button"));
        expect(sendComment).toHaveBeenCalled();
    });
});
