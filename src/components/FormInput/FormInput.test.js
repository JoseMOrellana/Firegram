import React from "react";
import { render, cleanup } from "@testing-library/react";

import FormInput from "./FormInput";

beforeEach(cleanup);

describe("<FormInput />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<FormInput />);
        expect(queryByTestId("form-input-component")).toBeTruthy();
    });

    test("renders label element passed as props", () => {
        const { queryByTestId } = render(<FormInput label="label" />);
        expect(queryByTestId("form-input-label")).toBeTruthy();
    });
});
