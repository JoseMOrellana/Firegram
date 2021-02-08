import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export default function useComments(postId) {
    const [comments, setComments] = useState();
    useEffect(() => {
        const unsub = projectFirestore
            .collection("comments")
            .where("postDoc", "==", postId)
            .orderBy("createdAt")
            .onSnapshot((snap) => {
                let comments = [];
                snap.forEach((doc) => {
                    comments.push({ ...doc.data(), id: doc.id });
                });
                setComments(comments);
            });
        return () => unsub();
    }, []);
    return { comments };
}
