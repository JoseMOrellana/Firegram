import React from "react";
import { render, cleanup } from "@testing-library/react";

import ChangePassword from "./ChangePassword";

beforeEach(cleanup);

jest.mock("../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        updatePassword: jest.fn(),
    })),
}));

describe("<ChangePassword />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<ChangePassword />);
        expect(queryByTestId("change-password-form")).toBeTruthy();
    });
});
