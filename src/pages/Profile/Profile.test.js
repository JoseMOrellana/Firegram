import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Profile from "./Profile";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: {
            username: "user",
            following: [],
        },
        uploadImage: jest.fn(),
    })),
}));

jest.mock("react-router-dom", () => ({
    useParams: jest.fn(() => ({ username: "user" })),
}));

jest.mock("../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
        setUser: jest.fn(),
    })),
}));

jest.mock("../../hooks/useProfileData", () =>
    jest.fn(() => ({
        photoURL: "",
        username: "user",
        name: "",
        posts: [""],
        followers: ["", ""],
        following: ["", "", ""],
    }))
);
jest.mock("../../hooks/usePics", () => jest.fn(() => ({ pics: [] })));

describe("<Profile />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<Profile />);
        expect(queryByTestId("profile-page")).toBeTruthy();
    });
});
