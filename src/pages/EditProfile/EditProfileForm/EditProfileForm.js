import React, { useState } from "react";

import styles from "./EditProfileForm.module.css";
import Avatar from "../../../components/Avatar/Avatar";
import { useUser } from "../../../context/UserContext";
import useForm from "../../../hooks/useForm";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import UploadForm from "../../../components/UploadForm/UploadForm";
import Button from "../../../components/Button/Button";
import FormInput from "../../../components/FormInput/FormInput";

export default function EditProfileForm() {
    const { currentUser, updateProfile, uploadAvatar, progress } = useUser();
    const { inputs, handleInputChange, handleSubmit } = useForm(updateProfile);
    const [showUploadForm, setShowUploadForm] = useState(false);

    return (
        <div className={styles.Container} data-testid="edit-profile-form">
            {progress > 0 && <ProgressBar progress={progress} />}
            <Avatar src={currentUser.photoURL} medium />
            <span>{currentUser.username}</span>
            <Button
                variant="Plain"
                onClick={() => setShowUploadForm(true)}
                data-testid="show-form-button"
            >
                Change profile pic
            </Button>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="name"
                    label="Name"
                    value={inputs.name}
                    onChange={handleInputChange}
                />
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputChange}
                />
                <Button type="submit" variant="Plain">
                    Update profile
                </Button>
            </form>
            {showUploadForm && (
                <UploadForm
                    showForm={setShowUploadForm}
                    submit={uploadAvatar}
                />
            )}
        </div>
    );
}
