import React from 'react'
import { gql, graphql } from 'react-apollo'
import { Button, Glyphicon } from 'react-bootstrap'

function PostUpvoter ({ upvote, votes, id }) {
  return (
    <Button onClick={() => upvote(id, votes + 1)}>
      <Glyphicon glyph="plus" />{' '}
      Votes: {votes ? votes : '0'}
    </Button>
  )
}

const upvotePost = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`

export default graphql(upvotePost, {
  props: ({ ownProps, mutate }) => ({
    upvote: (id, votes) => mutate({
      variables: { id, votes },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePost: {
          __typename: 'Post',
          id: ownProps.id,
          votes: ownProps.votes + 1
        }
      }
    })
  })
})(PostUpvoter)
