import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import NotFound from "./NotFound";
import { useUser } from "../../context/UserContext";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: null,
    })),
}));

describe("<NotFound />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <NotFound />
            </Router>
        );
        expect(queryByTestId("not-found-page")).toBeTruthy();
    });

    test("renders a login page link when user is not logged in", () => {
        const { getByText } = render(
            <Router>
                <NotFound />
            </Router>
        );
        expect(getByText("Go to login")).toBeTruthy();
    });

    test("renders a home page link when user is logged in", () => {
        useUser.mockImplementation(() => ({ currentUser: {} }));
        const { getByText } = render(
            <Router>
                <NotFound />
            </Router>
        );
        expect(getByText("Go home")).toBeTruthy();
    });
});
