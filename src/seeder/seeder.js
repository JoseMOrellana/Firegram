require("dotenv").config({ path: "./src/seeder/seederConfig.env" });
const fs = require("fs");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");
const img = fs.readFileSync(__dirname + "/images/1.jpg");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    ssagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
});
const userRecords = require("./userRecords");
const hash_config = {
    algorithm: process.env.ALGORITHM,
    base64_signer_key: process.env.BASE64_SIGNER_KEY,
    base64_salt_separator: process.env.BASE64_SALT_SEPARATOR,
    rounds: process.env.ROUNDS,
    mem_cost: process.env.MEM_COST,
};
const imgTokens = [
    "8d920394-65e3-4e01-8930-8b7fa25a366e",
    "cb135e3e-3d66-4e12-a82b-4d3bde9e176b",
    "19647415-d693-4121-89aa-dd4dbd344942",
    "4fae7eca-ff58-4468-93e8-8e8a5175dca8",
    "336c9ea5-1624-4286-959d-f382f3cce131",
    "5dd39e7f-1e7a-49f9-a484-8c2057f6661f",
    "48a4a573-daca-47e2-bb3b-82eee74e1e87",
    "d83f0173-cb85-4765-8ef3-9fb9be9d2ef5",
    "9f045b12-6db6-4c8f-be6f-7e90b4db0b83",
    "f1b04595-ffb0-4dd0-bf24-5767dc434fcf",
    "001a084a-b86c-4d16-9e01-f6a71ef12fee",
    "46836588-9c60-443c-9fa7-f3b59ac157d6",
    "da40ed1b-1f85-4ebb-93a6-2182a7843e4b",
    "a620e537-fada-46e7-b8e0-eee0cf8c54dd",
    "3150e833-aa1e-4b45-b1f7-5b790b85c17c",
    "3796cf27-f8dd-4ce1-b081-09f842f53308",
    "13f3a89c-f0a0-473c-9bfb-063cf43e0a55",
    "51b2df64-8ddd-49cb-9d06-1093be22e3ba",
    "eecbc826-2e0c-41e3-9adb-d4b04c86ec9b",
    "5635c9b8-c73b-45ff-9530-5daecc2283c7",
];
const timestamp = admin.firestore.FieldValue.serverTimestamp();

if (process.argv[2] === "--create") {
    // admin
    //     .auth()
    //     .importUsers(userRecords, hash_config)
    //     .then((results) => console.log("Success"))
    //     .catch((err) => console.log(err));

    var batch = admin.firestore().batch();

    const users = userRecords.map((user) => ({
        username: user.username,
        following: [],
        followers: [],
    }));

    // users.forEach((user) => {
    //     let random = Math.random();
    //     while (random < 0.95) {
    //         let userNumber = Math.floor(Math.random() * userRecords.length);
    //         let UserToFollow = users[userNumber];
    //         user.following.push(UserToFollow.username);
    //         UserToFollow.followers.push(user.username);
    //         random = Math.random();
    //     }
    // });
    // userRecords.forEach((user, index) => {
    //     batch.set(admin.firestore().collection("users").doc(user.username), {
    //         ...user,
    //         following: users[index].following,
    //         followers: users[index].followers,
    //     });
    // });
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    console.log(timestamp);
    const postsDocs = [];
    imgTokens.forEach((token, index) => {
        let random = Math.random();
        while (random < 0.75) {
            let userIndex = Math.floor(Math.random() * users.length);
            let userPosting = users[userIndex].username;
            let randomLike = Math.random();
            let likedBy = [];
            while (randomLike < 0.95) {
                userIndex = Math.floor(Math.random() * users.length);
                let userLiking = users[userIndex].username;
                likedBy.push(userLiking);
                randomLike = Math.random();
            }
            const time = new Date().getTime();
            const description = "This pic was uploaded automatically";
            const url = `https://firebasestorage.googleapis.com/v0/b/firegram-ecd03.appspot.com/o/${
                index + 1 + ".jpg"
            }?alt=media&token=${token}`;
            postsDocs.push(time + userPosting);
            batch.set(
                admin
                    .firestore()
                    .collection("posts")
                    .doc(time + userPosting),
                {
                    createdAt: timestamp,
                    url,
                    likedBy,
                    description,
                    user: userPosting,
                }
            );
            random = Math.random();
        }
    });
    postsDocs.forEach((postDoc) => {
        let random = Math.random();
        while (random < 0.8) {
            const content = "This is a comment!";
            let userIndex = Math.floor(Math.random() * users.length);
            const userCommenting = users[userIndex].username;
            const responses = [];
            let randomResponses = Math.random();
            while (randomResponses < 0.5) {
                const time = new Date().getTime();
                const responseContent = "This is a response!";
                userIndex = Math.floor(Math.random() * users.length);
                const userResponding = users[userIndex].username;
                responses.push({
                    content: responseContent,
                    user: userResponding,
                    createdAt: time,
                });
                randomResponses = Math.random();
            }
            batch.set(
                admin
                    .firestore()
                    .collection("comments")
                    .doc(postDoc + userCommenting),
                {
                    postDoc,
                    content,
                    user: userCommenting,
                    createdAt: timestamp,
                    responses,
                }
            );

            random = Math.random();
        }
    });

    batch.commit().then(() => {
        console.log("Success");
        process.exit(0);
    });
}

// if (process.argv[2] === "--delete") {
//     admin
//         .auth()
//         .listUsers(1000)
//         .then((listUsersResults) => {
//             const usersUIDs = listUsersResults.users.map((user) => user.uid);
//             admin
//                 .auth()
//                 .deleteUsers(usersUIDs)
//                 .then(() => {
//                     console.log("Users successfully deleted");
//                     process.exit(0);
//                 })
//                 .catch((err) => console.log(err));
//         });
// }
