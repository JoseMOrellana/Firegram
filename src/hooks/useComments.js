import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export default function useComments(postId) {
    const [comments, setComments] = useState();
    const [profilePics, setProfilePics] = useState();
    useEffect(() => {
        const unsub = projectFirestore
            .collection("comments")
            .where("postDoc", "==", postId)
            .orderBy("createdAt")
            .onSnapshot(async (snap) => {
                let comments = [];
                let usernames = [];
                snap.forEach((doc) => {
                    comments.push({ ...doc.data(), id: doc.id });
                    usernames.push(doc.data().user);
                    if (doc.data().responses) {
                        usernames = usernames.concat(
                            doc
                                .data()
                                .responses.map((response) => response.user)
                        );
                    }
                });
                setComments(comments);
                usernames = [...new Set(usernames)];
                const profilePics = [];
                usernames.forEach(async (username) => {
                    const user = await projectFirestore
                        .collection("users")
                        .doc(username)
                        .get();
                    profilePics.push([username, user.data().photoURL]);
                });
                setProfilePics(profilePics);
            });

        return () => unsub();
    }, []);
    return { comments, profilePics };
}
