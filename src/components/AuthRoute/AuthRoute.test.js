import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";

import AuthRoute from "./AuthRoute";
import { useUser } from "../../context/UserContext";

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(),
}));

beforeEach(cleanup);

function DummyComponent() {
    return <div data-testid="dummy-component">Dummy Component</div>;
}

describe("<AuthRoute />", () => {
    test("does not render component when user is logged in", () => {
        useUser.mockImplementation(() => ({ currentUser: {} }));
        const { queryByTestId } = render(
            <Router>
                <AuthRoute component={DummyComponent} />
            </Router>
        );
        expect(queryByTestId("dummy-component")).toBeFalsy();
    });

    test("renders component when user is logged in", () => {
        useUser.mockImplementation(() => ({ currentUser: null }));
        const { queryByTestId } = render(
            <Router>
                <AuthRoute component={DummyComponent} />
            </Router>
        );
        expect(queryByTestId("dummy-component")).toBeTruthy();
    });

    test("renders using the render function", () => {
        useUser.mockImplementation(() => ({ currentUser: null }));
        const { queryByTestId } = render(
            <Router>
                <AuthRoute
                    render={() => (
                        <div data-testid="test-component">Test component</div>
                    )}
                />
            </Router>
        );
        expect(queryByTestId("test-component")).toBeTruthy();
    });
});
