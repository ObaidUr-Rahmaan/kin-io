import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Post from "../components/Post";

class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
    };
  }

  componentDidMount() {
    axios
      .get("/posts")
      .then((result) => {
        console.log(result.data);
        this.setState({
          posts: result.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
