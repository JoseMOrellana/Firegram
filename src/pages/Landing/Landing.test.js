import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Landing from "./Landing";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        login: jest.fn(),
        error: "An error has occurr",
    })),
}));

describe("<Landing />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <Landing />
            </Router>
        );
        expect(queryByTestId("landing-page")).toBeTruthy();
    });

    test("displays error message after invalid login attempt", () => {
        const { queryByTestId, getByText } = render(
            <Router>
                <Landing />
            </Router>
        );
        fireEvent.click(queryByTestId("submit-button"));
        expect(getByText("An error has occurr")).toBeTruthy();
    });
});
