import React from "react";
import { render, cleanup } from "@testing-library/react";

import Button from "./Button";

beforeEach(cleanup);

describe("<Button />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Button data-testid="button-component" />
        );
        expect(queryByTestId("button-component")).toBeTruthy();
    });
});
