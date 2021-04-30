import React, { createContext, useContext, useState, useEffect } from "react";
import {
    auth,
    projectFirestore,
    projectStorage,
    timestamp,
} from "../firebase/config";
import { usernameAlreadyTaken } from "../helpers/auth";
import { useHistory } from "react-router-dom";
import {
    followUser,
    unfollowUser,
    likePost,
    dislikePost,
    submitComment,
} from "../helpers/profile";
import AlertMessage from "../components/AlertMessage/AlertMessage";
const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounting, setMounting] = useState(true);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    function asyncHandler(fn) {
        return function () {
            setLoading(true);
            setError("");
            Promise.resolve(fn(...arguments)).catch((reason) => {
                setError(reason.message);
            });
            setLoading(false);
        };
    }
    const signup = asyncHandler(async (userData) => {
        if (userData.password !== userData.passwordConfirm) {
            setLoading(false);
            return setError("Passwords do not match");
        }
        if (await usernameAlreadyTaken(userData.username)) {
            setLoading(false);
            return setError("Username already taken");
        }

        const { user } = await auth().createUserWithEmailAndPassword(
            userData.email,
            userData.password || ""
        );
        projectFirestore.collection("users").doc(userData.username).set({
            uid: user.uid,
            email: user.email,
            name: userData.name,
            username: userData.username,
            following: [],
            followers: [],
        });
        setAlertMessage("You have successfully signed up!");
        history.push("/");
    });

    const login = asyncHandler(async ({ id, password }) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(id).toLowerCase())) {
            await auth().signInWithEmailAndPassword(id, password);
        }
    });

    const forgotPassword = asyncHandler(async ({ email }) => {
        await auth().sendPasswordResetEmail(email);
        setAlertMessage("Password reset email sent");
    });

    const updatePassword = asyncHandler(
        async ({ currentPassword, newPassword, confirmNewPassword }) => {
            if (newPassword !== confirmNewPassword) {
                return setError("Password confirmation does not match");
            }
            let credential = auth.EmailAuthProvider.credential(
                currentUser.email,
                currentPassword
            );
            await auth().currentUser.reauthenticateWithCredential(credential);
            auth().currentUser.updatePassword(newPassword);
        }
    );

    const updateProfile = asyncHandler(async ({ name, email }) => {
        let updateObj = {};
        if (name && name !== "") {
            updateObj.name = name;
        }
        if (email && email !== "") {
            updateObj.email = email;
        }
        await projectFirestore
            .collection("users")
            .doc(currentUser.username)
            .update(updateObj);
    });

    const logout = asyncHandler(async () => {
        auth().signOut();
        history.push("/");
    });

    const follow = asyncHandler(async (userToFollow) => {
        await followUser(currentUser.username, userToFollow);
        currentUser.following.push(userToFollow);
    });

    const unfollow = asyncHandler(async (userToUnfollow) => {
        await unfollowUser(currentUser.username, userToUnfollow);
        currentUser.following.splice(
            currentUser.following.indexOf(userToUnfollow),
            1
        );
    });

    const uploadAvatar = asyncHandler(async (image) => {
        const time = new Date().getTime();
        const storageRef = projectStorage.ref(time + currentUser.username);
        storageRef.put(image).on(
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
                const photoURL = await storageRef.getDownloadURL();
                projectFirestore
                    .collection("users")
                    .doc(currentUser.username)
                    .update({ photoURL });
                setUrl(url);
                setProgress(0);
            }
        );
    });

    const uploadImage = asyncHandler(async (image, description) => {
        const time = new Date().getTime();
        const storageRef = projectStorage.ref(time + currentUser.username);
        const collectionRef = projectFirestore.collection("posts");
        storageRef.put(image).on(
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
                collectionRef.add({
                    url,
                    createdAt,
                    user,
                    description: description || "",
                    likedBy: [],
                });
                setUrl(url);
            }
        );
    });

    const like = asyncHandler(async (image) => {
        likePost(currentUser.username, image.id);
    });

    const dislike = asyncHandler(async (image) => {
        dislikePost(currentUser.username, image.id);
    });

    const sendComment = asyncHandler((comment, imageId, parentComment) => {
        submitComment(currentUser.username, comment, imageId, parentComment);
    });

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    await projectFirestore
                        .collection("users")
                        .where("email", "==", user.email)
                        .onSnapshot((snap) => {
                            setCurrentUser(snap.docs[0].data());
                            setMounting(false);
                        });
                } catch (err) {
                    setError(err);
                    setMounting(false);
                }
            } else {
                setCurrentUser(null);
                setMounting(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        error,
        progress,
        url,
        loading,
        signup,
        login,
        forgotPassword,
        updatePassword,
        updateProfile,
        logout,
        follow,
        unfollow,
        uploadImage,
        uploadAvatar,
        like,
        dislike,
        sendComment,
    };

    return (
        <UserContext.Provider value={value}>
            {!mounting && children}
            {alertMessage && (
                <AlertMessage
                    message={alertMessage}
                    close={() => setAlertMessage(null)}
                />
            )}
        </UserContext.Provider>
    );
}
