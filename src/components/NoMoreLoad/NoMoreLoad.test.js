import React from "react";
import { render, cleanup } from "@testing-library/react";

import NoMoreLoad from "./NoMoreLoad";

beforeEach(cleanup);

describe("<NoMoreLoad />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<NoMoreLoad />);
        expect(queryByTestId("no-more-load-component")).toBeTruthy();
    });
});
