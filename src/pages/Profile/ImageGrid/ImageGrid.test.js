import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import ImageGrid from "./ImageGrid";
import { useShowImage } from "../../../context/ShowImageContext";

beforeEach(cleanup);

jest.mock("../../../context/ShowImageContext", () => ({
    useShowImage: jest.fn(() => ({
        setImage: jest.fn(),
        setUser: jest.fn(),
    })),
}));

const pics = [
    { id: "1", url: "" },
    { id: "2", url: "" },
];

describe("<ImageGrid />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<ImageGrid pics={pics} user={{}} />);
        expect(queryByTestId("image-grid-component")).toBeTruthy();
    });

    test("renders the right amount of pics", () => {
        const { queryAllByTestId } = render(
            <ImageGrid pics={pics} user={{}} />
        );
        expect(queryAllByTestId("image-wrapper").length).toBe(pics.length);
    });

    test("calls 'setImage' and 'setUser' when clicking a picture", () => {
        const setImage = jest.fn();
        const setUser = jest.fn();
        useShowImage.mockImplementation(() => ({ setImage, setUser }));
        const { queryAllByTestId } = render(
            <ImageGrid pics={pics} user={{}} />
        );
        fireEvent.click(queryAllByTestId("image-wrapper")[0]);
        expect(setImage).toHaveBeenCalled();
        expect(setUser).toHaveBeenCalled();
    });
});
