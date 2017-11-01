import {gql, graphql} from 'react-apollo'
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

function Submit({createPost}) {
  function handleSubmit(e) {
    e.preventDefault()

    let title = e.target.elements.title.value
    let url = e.target.elements.url.value

    if (title === '' || url === '') {
      window.alert('Both fields are required.')
      return false
    }

    // prepend http if missing from url
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = `http://${url}`
    }

    createPost(title, url)

    // reset form
    e.target.elements.title.value = ''
    e.target.elements.url.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup controlId="formBasicText">
        <h3>Add New</h3>

        <FieldGroup
          type="text"
          label="Title"
          placeholder="Enter title"

        />
        <FieldGroup
          type="text"
          label="Url"
          placeholder="Enter url"

        />

        <Button type='submit'>Submit</Button>

        <style jsx>{`
          form {
            border-bottom: 1px solid #ececec;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 20px;
          }
          input {
            display: block;
            margin-bottom: 10px;
          }
      `}</style>
      </FormGroup>
    </form>
  )
}

const createPost = gql`
    mutation createPost($title: String!, $url: String!) {
        createPost(title: $title, url: $url) {
            id
            title
            votes
            url
            createdAt
        }
    }
`

export default graphql(createPost, {
  props: ({mutate}) => ({
    createPost: (title, url) => mutate({
      variables: {title, url},
      updateQueries: {
        allPosts: (previousResult, {mutationResult}) => {
          const newPost = mutationResult.data.createPost
          return Object.assign({}, previousResult, {
            // Append the new post
            allPosts: [newPost, ...previousResult.allPosts]
          })
        }
      }
    })
  })
})(Submit)
