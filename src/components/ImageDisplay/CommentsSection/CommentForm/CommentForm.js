import React from "react";
import { useUser } from "../../../../context/UserContext";
import useForm from "../../../../hooks/useForm";
import Button from "../../../Button/Button";
import FormInput from "../../../FormInput/FormInput";
import styles from "./CommentForm.module.css";

export default function CommentForm({ selectedImg, parentComment }) {
    const { sendComment } = useUser();
    const { inputs, handleInputChange, handleSubmit } = useForm((inputs) => {
        sendComment(inputs.comment, selectedImg.id, parentComment);
    });
    return (
        <div className={styles.Container} data-testid="comment-form">
            <FormInput
                type="text"
                name="comment"
                placeholder="Comment"
                style={{ marginBottom: "0" }}
                value={inputs.comment}
                onChange={handleInputChange}
                data-testid="comment-form-input"
            />
            <Button
                variant="Comment"
                onClick={handleSubmit}
                disabled={inputs.comment === undefined || inputs.comment === ""}
                data-testid="comment-form-submit-button"
            >
                Send
            </Button>
        </div>
    );
}
