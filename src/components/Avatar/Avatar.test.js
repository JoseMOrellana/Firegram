import React from "react";
import { render, cleanup } from "@testing-library/react";

import Avatar from "./Avatar";

beforeEach(cleanup);

describe("<Avatar />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<Avatar src="" />);
        expect(queryByTestId("avatar-component")).toBeTruthy();
    });
});
