import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export default function useProfilePics(usernames) {
    const [profilePics, setProfilePics] = useState();
    useEffect(() => {
        const unsub = projectFirestore
            .collection("users")
            .where("username", "in", usernames)
            .onSnapshot((snap) => {
                let profilePics = {};
                snap.forEach((doc) => {
                    profilePics[doc.data().username] = doc.data().photoURL;
                });
                setProfilePics(profilePics);
            });
        return () => unsub();
    }, []);
    return { profilePics };
}
