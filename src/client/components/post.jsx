import React from "react"
import FetchGraphql from "../fetch-graphql"
import { connect } from "react-redux"
import Header from "./header"
import Footer from "./footer"

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPostId: this.props.params.id,
      currentPost: {
        title: "Loading...",
        id: "1"
      }
    };
  }

  componentDidMount() {
    FetchGraphql(
      `Post (id: "`+this.state.currentPostId+`") {
          id
          title
          votes
          url
          createdAt
      }`,
      (data) => {
        this.setState({currentPost: data.Post});
      })
  }

  render() {
    return (
      <div key={this.state.currentPost.id}>
        <Header/>
        <section>
          <h1>{this.state.currentPost.title}</h1>
        </section>

        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // count: state.count
});

export default connect(mapStateToProps)(Post);
