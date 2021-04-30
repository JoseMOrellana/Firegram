import React, { createContext, useContext, useState, useEffect } from "react";

import { projectFirestore } from "../firebase/config";

const ProfilePicsContext = createContext();

export function useProfilePics() {
    return useContext(ProfilePicsContext);
}

export function ProfilePicsProvider({ children, usernames }) {
    const [profilePics, setProfilePics] = useState();

    useEffect(() => {
        const fetch = async () => {
            const results = await Promise.all(
                usernames.map(async (username) => {
                    const user = await projectFirestore
                        .collection("users")
                        .doc(username)
                        .get();
                    return user.data();
                })
            );
            const pics = {};
            results.forEach((user) => {
                pics[user.username] = user.photoURL;
            });
            setProfilePics(pics);
        };
        fetch();
    }, [usernames]);

    const value = {
        profilePics,
    };

    return (
        <ProfilePicsContext.Provider value={value}>
            {children}
        </ProfilePicsContext.Provider>
    );
}
