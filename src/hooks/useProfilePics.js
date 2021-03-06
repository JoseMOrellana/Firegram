import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export default function useProfilePics(usernames) {
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
    return { profilePics };
}
