import React from "react"
import FetchGraphql from "../fetch-graphql"
import { connect } from "react-redux"
import Header from "./header"
import Footer from "./footer"
import {Link} from 'react-router'

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postListFilters: `{createdAt_gt: "2016-10-31T22:59:51.000Z"}`,
      allPosts: [{
        title: "Loading...",
        id: "1"
      }]
    };
  }

  componentDidMount() {
    FetchGraphql(
      `allPosts (filter: `+this.state.postListFilters+`) {
          id
          title
          votes
          url
          createdAt
      }`,
      (data) => {
        this.setState({allPosts: data.allPosts});
      })
  }

  render() {
    return (
      <div>
        <Header/>
        <section>
          <h3> Available Records</h3>
          <ul>
            {this.state.allPosts.map(record =>
              <li key={record.id}>
                <Link to={"/posts/" + record.id}>{record.title}</Link>
              </li>
            )}
          </ul>
        </section>

        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // count: state.count
});

export default connect(mapStateToProps)(PostList);
