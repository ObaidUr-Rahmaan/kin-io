const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/fbAuth");

const {
  getAllPosts,
  postOnePost,
  getPost,
  commentOnPost,
  likePost,
  unlikePost,
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
// TODO: delete a post
// TODO: like a post
// TODO: unlike a post
app.post("/post/:postId/comment", FBAuth, commentOnPost);

// User routes
app.post("/signup", signUp);
app.post("/login", logIn);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.region("europe-west1").https.onRequest(app);
