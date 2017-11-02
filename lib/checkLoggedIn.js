import { gql } from 'react-apollo'

export default (context, apolloClient) => (
  apolloClient.query({
    query: gql`
        query getUser {
            user {
                id
                name
            }
        }
    `
  }).then(({ data }) => {
    return { loggedInUser: data }
  }).catch(() => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)


// function CheckLoggedIn ({data: { loading, error, user } }) {
//   return {loggedInUser: (error ? {} : user)}
// }
//
// const query = gql`
//     query getUser {
//         user {
//             id
//             name
//         }
//     }
// `
//
//
// // The `graphql` wrapper executes a GraphQL query and makes the results
// // available on the `data` prop of the wrapped component (PostList)
// // Tip: ownProps is parent component's props
// export default graphql(query)(CheckLoggedIn)