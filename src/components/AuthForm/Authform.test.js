import React from "react";
import { render, cleanup } from "@testing-library/react";

import AuthForm from "./AuthForm";

beforeEach(cleanup);

describe("<AuthForm />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<AuthForm />);
        expect(queryByTestId("auth-form")).toBeTruthy();
    });
});
