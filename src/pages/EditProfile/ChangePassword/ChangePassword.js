import React from "react";
import Button from "../../../components/Button/Button";
import FormInput from "../../../components/FormInput/FormInput";
import { useUser } from "../../../context/UserContext";
import useForm from "../../../hooks/useForm";
import styles from "./ChangePassword.module.css";

export default function ChangePassword() {
    const { updatePassword } = useUser();
    const { inputs, handleInputChange, handleSubmit } = useForm(updatePassword);
    return (
        <form
            className={styles.Container}
            onSubmit={handleSubmit}
            data-testid="change-password-form"
        >
            <FormInput
                type="password"
                name="currentPassword"
                label="Current Password"
                value={inputs.currentPassword}
                onChange={handleInputChange}
            />
            <FormInput
                type="password"
                name="newPassword"
                label="New Password"
                value={inputs.newPassword}
                onChange={handleInputChange}
            />
            <FormInput
                type="password"
                name="confirmNewPassword"
                label="Confirm New Password"
                value={inputs.confirmNewPassword}
                onChange={handleInputChange}
            />
            <Button type="submit" variant="Plain">
                Update password
            </Button>
        </form>
    );
}
