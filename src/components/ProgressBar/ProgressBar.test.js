import React from "react";
import { render, cleanup } from "@testing-library/react";

import ProgressBar from "./ProgressBar";

beforeEach(cleanup);

describe("<ProgressBar />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<ProgressBar />);
        expect(queryByTestId("progress-bar-component")).toBeTruthy();
    });
});
