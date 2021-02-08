import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ImageGrid from "./ImageGrid/ImageGrid";
import UploadForm from "../../components/UploadForm/UploadForm";
import UploadButton from "./UploadButton/UploadButton";
import { useParams } from "react-router-dom";
import useProfileData from "../../hooks/useProfileData";
import usePics from "../../hooks/usePics";
import { useUser } from "../../context/UserContext";

export default function Profile() {
    const { currentUser, uploadImage } = useUser();
    const { username } = useParams();
    let { userData } = useProfileData(username);
    const { pics } = usePics(username);
    userData = { ...userData, posts: pics.length };
    const [showUploadForm, setShowUploadForm] = useState(false);

    return (
        <div className="content" data-testid="profile-page">
            <ProfileHeader userData={userData} />
            {username === currentUser.username ? (
                <UploadButton showForm={setShowUploadForm} />
            ) : null}
            {showUploadForm && (
                <UploadForm
                    showForm={setShowUploadForm}
                    description
                    submit={uploadImage}
                />
            )}
            <ImageGrid pics={pics} user={userData} />
        </div>
    );
}
