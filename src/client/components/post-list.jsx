import React from "react"
import Header from "./header"
import Footer from "./footer"
import {Link} from 'react-router'
import { gql, graphql } from 'react-apollo';

function PostList({ data: {allPosts}}){
  return (
    <div>
      <Header/>
      <section>
        <h3> Available Records</h3>
        <ul>
          {
            (allPosts) ?
              allPosts.map(record =>
                <li key={record.id}>
                  <Link to={"/posts/" + record.id}>{record.title}</Link>
                </li>
              )
              :
              ''
          }
        </ul>
      </section>

      <Footer/>
    </div>
  );
}

const query = gql`
    query AllPostQuery {
      allPosts(filter: {createdAt_gt: "2016-10-31T22:59:51.000Z"}) {
        id
        title
        votes
        url
        createdAt
      }
    },
  `

export default graphql(query)(PostList)


