import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import EditProfileForm from "./EditProfileForm";
import { useUser } from "../../../context/UserContext";

beforeEach(cleanup);

jest.mock("../../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: { photoURL: "", username: "" },
        updateProfile: jest.fn(),
        uploadAvatar: jest.fn(),
        progress: null,
    })),
}));

describe("<EditProfileForm />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<EditProfileForm />);
        expect(queryByTestId("edit-profile-form")).toBeTruthy();
    });

    test("displays uploadForm when clicking upload button", () => {
        const { queryByTestId } = render(<EditProfileForm />);
        fireEvent.click(queryByTestId("show-form-button"));
        expect(queryByTestId("upload-form")).toBeTruthy();
    });

    test("displays progress bar", () => {
        useUser.mockImplementation(() => ({
            currentUser: { photoURL: "", username: "" },
            updateProfile: jest.fn(),
            uploadAvatar: jest.fn(),
            progress: 20,
        }));
        const { queryByTestId } = render(<EditProfileForm />);
        expect(queryByTestId("progress-bar-component")).toBeTruthy();
    });
});
