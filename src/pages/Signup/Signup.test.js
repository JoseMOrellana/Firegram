import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Signup from "./Signup";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        signup: jest.fn(),
        error: "An error has occurr",
    })),
}));

describe("<Signup />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <Signup />
            </Router>
        );
        expect(queryByTestId("signup-page")).toBeTruthy();
    });

    test("displays error message after invalid login attempt", () => {
        const { queryByTestId, getByText } = render(
            <Router>
                <Signup />
            </Router>
        );
        fireEvent.click(queryByTestId("submit-button"));
        expect(getByText("An error has occurr")).toBeTruthy();
    });
});
