import { projectFirestore } from "../firebase/config";

export const usernameAlreadyTaken = async (username) => {
    const sameUsername = await projectFirestore
        .collection("users")
        .where("username", "==", username)
        .get();

    return sameUsername.docs[0] !== undefined;
};
