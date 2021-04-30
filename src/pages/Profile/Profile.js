import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ImageGrid from "./ImageGrid/ImageGrid";
import UploadForm from "../../components/UploadForm/UploadForm";
import UploadButton from "./UploadButton/UploadButton";
import { useParams } from "react-router-dom";
import useProfileData from "../../hooks/useProfileData";
import usePics from "../../hooks/usePics";
import { useUser } from "../../context/UserContext";
import NoUserFound from "./NoUserFound/NoUserFound";

export default function Profile() {
    const { currentUser, uploadImage } = useUser();
    const { username } = useParams();
    const { profileData } = useProfileData(username);
    const { pics } = usePics(username);
    const userData = { ...profileData, posts: pics.length };
    const [showUploadForm, setShowUploadForm] = useState(false);

    console.log();
    return (
        <div className="content" data-testid="profile-page">
            {profileData ? (
                <>
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
                </>
            ) : (
                <NoUserFound />
            )}
        </div>
    );
}
