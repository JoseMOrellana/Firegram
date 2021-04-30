import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const usePics = (userID) => {
    const [pics, setPics] = useState([]);
    useEffect(() => {
        const unsub = projectFirestore
            .collection("posts")
            .where("user", "==", userID)
            .orderBy("createdAt", "desc")
            .onSnapshot((snap) => {
                console.log(userID);
                let pics = [];
                snap.forEach((doc) => {
                    pics.push({ ...doc.data(), id: doc.id });
                });
                setPics(pics);
            });
        return () => unsub();
    }, [userID]);
    return { pics };
};

export default usePics;
