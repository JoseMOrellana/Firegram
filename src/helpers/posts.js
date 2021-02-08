import { projectFirestore } from "../firebase/config";
export const getPosts = async (lastOne, limit) => {
    const posts = await projectFirestore
        .collection("posts")
        .orderBy("createdAt")
        .startAfter(lastOne || null)
        .limit(limit)
        .get();
    const last = posts.docs[posts.docs.length - 1];
    const results = posts.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return [last, results];
};

export const getHomePosts = async (lastOne, limit, following) => {
    // Arrays used in the "in" comparison of where clause cannot be empty, so we add a null item if empty
    if (following.length === 0) {
        following = following.concat([null]);
    }

    const posts = await projectFirestore
        .collection("posts")
        .where("user", "in", following)
        .orderBy("createdAt")
        .startAfter(lastOne || null)
        .limit(limit)
        .get();
    const last = posts.docs[posts.docs.length - 1];
    let results = posts.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    results = await Promise.all(
        results.map(async (result) => {
            const user = await projectFirestore
                .collection("users")
                .doc(result.user)
                .get();

            return {
                ...result,
                userData: {
                    ...user.data(),
                    id: user.id,
                },
            };
        })
    );
    console.log(results);
    return [last, results];
};
