import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
    projectStorage,
    projectFirestore,
    timestamp,
} from "../firebase/config";

const useStorage = (file) => {
    const { currentUser } = useUser();
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const time = new Date().getTime();
        const storageRef = projectStorage.ref(time + currentUser.username);
        const collectionRef = projectFirestore.collection("posts");
        storageRef.put(file).on(
            "state_changed",
            (snap) => {
                let percentage =
                    (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            },
            (err) => {
                setError(err);
            },
            async () => {
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp();
                const user = currentUser.username;
                collectionRef.add({ url, createdAt, user });
                setUrl(url);
            }
        );
    }, [file]);

    return { progress, url, error };
};

export default useStorage;
