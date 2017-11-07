import React from 'react'
import { gql, graphql } from 'react-apollo'
import PostUpvoter from './PostUpvoter'
import {Router} from '../routes'

// function Post ({ id, data: { loading, error, Post } }) {
//   return (
//     <section>
//       <div key={Post.id}>
//         <h1><a onClick={Router.back()}>Back</a> {Post.title}</h1>
//         <p>ID: {Post.id}<br/>URL: {Post.url}</p>
//         <p><PostUpvoter id={Post.id} votes={Post.votes} /></p>
//       </div>
//     </section>
//   )
// }

class Post extends React.Component {

  goBack = (e) => {
    e.preventDefault()
    Router.back()
  }

  render() {
    return (
      <section>

        <div key={this.props.data.Post.id}>
          <h1><a href="#" onClick={this.goBack}>←</a> {this.props.data.Post.title}</h1>
          <p>ID: {this.props.data.Post.id}<br/>URL: {this.props.data.Post.url}</p>
          <p><PostUpvoter id={this.props.data.Post.id} votes={this.props.data.Post.votes}/></p>
        </div>
      </section>
    )
  }
}

const postql = gql`
    query post($id: ID!) {
        Post(id: $id) {
            id
            title
            votes
            url
            createdAt
        }
    }
`


// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
// Tip: ownProps is parent component's props
export default graphql(postql, {
  options: (ownProps) => {
    return {
      variables: {
        id: ownProps.id
      }
    }
  }
})(Post)
