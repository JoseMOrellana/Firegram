import React from "react";
import { render, cleanup } from "@testing-library/react";

import Spinner from "./Spinner";

beforeEach(cleanup);

describe("<Spinner />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<Spinner />);
        expect(queryByTestId("spinner-component")).toBeTruthy();
    });
});
