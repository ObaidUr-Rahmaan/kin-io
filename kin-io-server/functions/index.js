const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const db = require("./util/admin");

const {
  getAllPosts,
  postOnePost,
  getPost,
  commentOnPost,
  likePost,
  unlikePost,
  deletePost,
} = require("./handlers/posts");
const {
  signUp,
  logIn,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

//  API Routes
// --------------------------------------------------------------------------------------------

// Post routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, postOnePost);
app.get("/post/:postId", getPost);
app.delete("/post/:postId", FBAuth, deletePost);
app.get("/post/:postId/like", FBAuth, likePost);
app.get("/post/:postId/unlike", FBAuth, unlikePost);
app.post("/post/:postId/comment", FBAuth, commentOnPost);

// User routes
app.post("/signup", signUp);
app.post("/login", logIn);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.region("europe-west1").https.onRequest(app);

// Notification trigger for 'likes'
exports.createNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    db.doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            postId: doc.id,
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// Delete notification if user 'unlikes'
exports.deleteNotificationOnUnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
    db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// Notification trigger for 'comments'
exports.createNotificationOnComment = functions
  .region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    db.doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            postId: doc.id,
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
