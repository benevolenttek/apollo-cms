import { gql, graphql } from 'react-apollo'
import ErrorMessage from './ErrorMessage'
import PostUpvoter from './PostUpvoter'

import Link from 'next/link'
import {Table} from 'react-bootstrap'

const POSTS_PER_PAGE = 10

function PostTable ({ data: { loading, error, allPosts, _allPostsMeta }, loadMorePosts }) {
  if (error) return <ErrorMessage message='Error loading posts.' />
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count
    return (
      <section>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((post, index) =>
              <tr key={post.id}>
                <td><Link href={{ pathname: '/blog/'+post.id}}><a>{post.title}</a></Link></td>
                <td>Post</td>
                <td><PostUpvoter id={post.id} votes={post.votes} /></td>
              </tr>
            )}
          </tbody>
        </Table>
        {areMorePosts ? <button onClick={() => loadMorePosts()}> {loading ? 'Loading...' : 'Show More'} </button> : ''}
      </section>
    )
  }
  return <div>Loading</div>
}

const allPosts = gql`
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
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostTable)
export default graphql(allPosts, {
  options: {
    variables: {
      skip: 0,
      first: POSTS_PER_PAGE
    }
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.allPosts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
          })
        }
      })
    }
  })
})(PostTable)
