import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import ImageDisplay from "./ImageDisplay";
import { webTimestamp } from "../../firebase/config";
import { useShowImage } from "../../context/ShowImageContext";

beforeEach(cleanup);

jest.mock("../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
    })),
}));

jest.mock("../../hooks/useComments", () => jest.fn(() => []));

jest.mock("../../hooks/useProfileData", () =>
    jest.fn(() => ({
        userData: {
            username: "",
            photoURL: "",
        },
    }))
);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        currentUser: {
            username: "",
            following: [],
        },
        sendComment: jest.fn(),
    })),
}));

const selectedImg = {
    id: "",
    createdAt: new webTimestamp(),
    likedBy: [],
};

describe("<ImageDisplay />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <Router>
                <ImageDisplay selectedImg={selectedImg} />
            </Router>
        );
        expect(queryByTestId("image-display-component")).toBeTruthy();
    });
    test("calls 'set image' when clicking users profile link", () => {
        const setImage = jest.fn();
        useShowImage.mockImplementation(() => ({ setImage }));
        const { queryByTestId } = render(
            <Router>
                <ImageDisplay selectedImg={selectedImg} />
            </Router>
        );
        fireEvent.click(queryByTestId("user-link"));
        expect(setImage).toHaveBeenCalled();
    });
});
