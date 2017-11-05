import Header from "./header"
import Footer from "./footer"

import React from "react"
// import { connect } from "react-redux"
import {Link} from 'react-router'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import { withApollo } from 'react-apollo';

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

  // componentDidMount() {
  //   FetchGraphql(
  //     `allPosts (filter: `+this.state.postListFilters+`) {
  //         id
  //         title
  //         votes
  //         url
  //         createdAt
  //     }`,
  //     (data) => {
  //       this.setState({allPosts: data.allPosts});
  //     })
  // }

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
    )
  }
}

// function PostList ({ data: { loading, error, allPosts, _allPostsMeta }, loadMorePosts }) {
//   if (error) return <ErrorMessage message='Error loading posts.' />
//   if (allPosts && allPosts.length) {
//     const areMorePosts = allPosts.length < _allPostsMeta.count
//     return (
//       <section>
//         <ul>
//           {allPosts.map((post, index) =>
//             <li key={post.id}>
//               <div>
//                 <h3>
//                   <span>{index + 1}. </span>
//                   <Link href={'/blog/'+post.id}><a>{post.title}</a></Link>
//
//                 </h3>
//                 <PostUpvoter id={post.id} votes={post.votes} />
//               </div>
//             </li>
//           )}
//         </ul>
//         {areMorePosts ? <Button onClick={() => loadMorePosts()}> {loading ? 'Loading...' : 'Show More'} </Button> : ''}
//       </section>
//     )
//   }
//   return <div>Loading</div>
// }

const mapStateToProps = (state) => ({
  // count: state.count
})

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
    }
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


// export default WithData(PostListQuery(PostList));
// export default WithData(PostList)
// export default PostList
export default PostListQuery(PostList);
