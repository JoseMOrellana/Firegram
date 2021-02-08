import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import UploadButton from "./UploadButton";

beforeEach(cleanup);

describe("<UploadButton />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<UploadButton />);
        expect(queryByTestId("upload-button")).toBeTruthy();
    });

    test("calls showForm when clicked", () => {
        const showForm = jest.fn();
        const { queryByTestId } = render(<UploadButton showForm={showForm} />);
        fireEvent.click(queryByTestId("upload-button"));
        expect(showForm).toHaveBeenCalled();
    });
});
