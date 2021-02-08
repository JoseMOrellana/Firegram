import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Modal from "./Modal";

beforeEach(cleanup);

describe("<Modal />", () => {
    test("renders without crashing", () => {
        const { queryByTestId } = render(<Modal />);
        expect(queryByTestId("modal-component")).toBeTruthy();
    });
    test("calls 'close' func when clicking outside", () => {
        const close = jest.fn();
        const { queryByTestId } = render(<Modal close={close} />);
        fireEvent.click(queryByTestId("modal-component"));
        expect(close).toHaveBeenCalled();
    });
    test("does not call 'close' func when clicking its children", () => {
        const close = jest.fn();
        const { queryByTestId } = render(
            <Modal close={close}>
                <div data-testid="test" />
            </Modal>
        );
        fireEvent.click(queryByTestId("test"));
        expect(close).not.toHaveBeenCalled();
    });
});
