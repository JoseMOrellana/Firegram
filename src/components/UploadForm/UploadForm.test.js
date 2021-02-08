import React from "react";
import {
    render,
    cleanup,
    fireEvent,
    getByTestId,
} from "@testing-library/react";

import UploadForm from "./UploadForm";
import { useUser } from "../../context/UserContext";

beforeEach(cleanup);

jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn(() => ({
        progress: 0,
    })),
}));

describe("<UploadForm />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(
            <UploadForm showForm={() => {}} submit={() => {}} />
        );
        expect(queryByTestId("upload-form")).toBeTruthy();
    });

    test("renders progressbar when uploading file", () => {
        useUser.mockImplementation(() => ({ progress: 50 }));
        const { queryByTestId } = render(
            <UploadForm showForm={() => {}} submit={() => {}} />
        );
        expect(queryByTestId("progress-bar-component")).toBeTruthy();
    });

    test("renders description textarea when when passing 'description' prop", () => {
        useUser.mockImplementation(() => ({ progress: 50 }));
        const { queryByTestId } = render(
            <UploadForm showForm={() => {}} submit={() => {}} description />
        );
        expect(queryByTestId("description-textarea")).toBeTruthy();
    });

    test("renders error message when selecting invalid file type", () => {
        const { queryByTestId } = render(
            <UploadForm showForm={() => {}} submit={() => {}} description />
        );
        fireEvent.change(queryByTestId("file-input"), {
            type: "image/svg+xml",
        });
        expect(queryByTestId("error-span")).toBeTruthy();
    });
});
