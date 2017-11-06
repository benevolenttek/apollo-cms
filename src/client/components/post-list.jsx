import React from "react"
import FetchGraphql from "../fetch-graphql"
import { connect } from "react-redux"
import Header from "./header"
import Footer from "./footer"
import {Link} from 'react-router'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

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

const POSTS_PER_PAGE = 10
const PostListQuery = graphql(
  gql`
    query allPosts($first: Int!, $skip: Int!) {
      allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
        id
        title
        votes
        url
        createdAt
      },
      _allPostsMeta {
        count
      }
    },
  `,
  {
    options: {
      variables: {
        skip: 0,
        first: 1
      }
    },
    withRef: true,
    // ,
    // props: ({ data }) => ({
    //   data,
    //   loadMorePosts: () => {
    //     return data.fetchMore({
    //       variables: {
    //         skip: data.allPosts.length
    //       },
    //       updateQuery: (previousResult, { fetchMoreResult }) => {
    //         if (!fetchMoreResult) {
    //           return previousResult
    //         }
    //         return Object.assign({}, previousResult, {
    //           // Append the new posts results to the old one
    //           allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
    //         })
    //       }
    //     })
    //   }
    // })
  }
);


// export default connect(mapStateToProps)

export default compose(
  connect(mapStateToProps),
  PostListQuery
)(PostList);


