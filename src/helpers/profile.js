import {
    projectFirestore,
    timestamp,
    arrayUnion,
    arrayRemove,
} from "../firebase/config";

export const fetchUserInfo = async (username) => {
    const userInfo = await projectFirestore
        .collection("users")
        .doc(username)
        .get();

    return { userData: userInfo.data() };
};

export const followUser = async (user, userToFollow) => {
    await projectFirestore
        .collection("users")
        .doc(user)
        .update({
            following: arrayUnion(userToFollow),
        });
    await projectFirestore
        .collection("users")
        .doc(userToFollow)
        .update({
            followers: arrayUnion(user),
        });
};

export const unfollowUser = async (user, userToUnfollow) => {
    await projectFirestore
        .collection("users")
        .doc(user)
        .update({
            following: arrayRemove(userToUnfollow),
        });
    await projectFirestore
        .collection("users")
        .doc(userToUnfollow)
        .update({
            followers: arrayRemove(user),
        });
};

export const likePost = async (user, imgId) => {
    await projectFirestore
        .collection("posts")
        .doc(imgId)
        .update({ likedBy: arrayUnion(user) });
};

export const dislikePost = async (user, imgId) => {
    await projectFirestore
        .collection("posts")
        .doc(imgId)
        .update({ likedBy: arrayRemove(user) });
};

export const submitComment = async (user, comment, imgId, parentComment) => {
    console.log(user, comment, imgId, parentComment);
    let createdAt = timestamp();
    if (parentComment) {
        createdAt = new Date();
        await projectFirestore
            .collection("comments")
            .doc(parentComment)
            .update({
                responses: arrayUnion({
                    content: comment,
                    createdAt,
                    user,
                }),
            });
    } else {
        await projectFirestore
            .collection("comments")
            .doc(imgId + user)
            .set({
                content: comment,
                postDoc: imgId,
                createdAt,
                responses: [],
                user,
            });
    }
};
