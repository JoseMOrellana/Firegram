import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import { useUser } from "../../../context/UserContext";

beforeEach(cleanup);

jest.mock("../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: {
            username: "",
        },
        logout: jest.fn(),
    })),
}));

describe("<Header />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <Header />
            </Router>
        );
        expect(queryByTestId("header-component")).toBeTruthy();
    });
    test("shows and hides the user menu", () => {
        const { queryByTestId } = render(
            <Router>
                <Header />
            </Router>
        );
        fireEvent.click(queryByTestId("user-menu-icon-wrapper"));
        expect(queryByTestId("user-menu")).toBeTruthy();
        fireEvent.click(document);
        expect(queryByTestId("user-menu")).toBeFalsy();
    });
});
