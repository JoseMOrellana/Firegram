import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";

import ForgotPassword from "./ForgotPassword";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        forgotPassword: jest.fn(),
        error: "An error has occurr",
    })),
}));

describe("<ForgotPassword />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <ForgotPassword />
            </Router>
        );
        expect(queryByTestId("forgot-password-page")).toBeTruthy();
    });

    test("displays error message after invalid login attempt", () => {
        const { queryByTestId, getByText } = render(
            <Router>
                <ForgotPassword />
            </Router>
        );
        fireEvent.click(queryByTestId("submit-button"));
        expect(getByText("An error has occurr")).toBeTruthy();
    });
});
