import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import EditProfile from "./EditProfile";

beforeEach(cleanup);

describe("<EditProfile />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <EditProfile />
            </Router>
        );
        expect(queryByTestId("edit-profile-page")).toBeTruthy();
    });
});
