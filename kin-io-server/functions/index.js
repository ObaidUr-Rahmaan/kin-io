const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/fbAuth");

const { getAllPosts, postOnePost } = require("./handlers/posts");
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

// User routes
app.post("/signup", signUp);
app.post("/login", logIn);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.region("europe-west1").https.onRequest(app);
