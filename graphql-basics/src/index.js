import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: '1',
    name: 'Marcel',
    email: 'marcelcruz@live.com',
    age: 27,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@email.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@email.com',
  },
]

const posts = [
  {
    id: '10',
    title: 'Post number one',
    body: 'This is post number one.',
    published: true,
    author: '1',
  },
  {
    id: '20',
    title: 'Post number two',
    body: 'This is post number two.',
    published: false,
    author: '1',
  },
  {
    id: '30',
    title: 'Post number three',
    body: 'This is post number three.',
    published: true,
    author: '2',
  },
]

const comments = [
  {
    id: '100',
    text: 'This is comment one.',
    author: '1',
    post: '10',
  },
  {
    id: '200',
    text: 'That is another comment.',
    author: '2',
    post: '20',
  },
  {
    id: '300',
    text: 'The third comment.',
    author: '2',
    post: '30',
  },
  {
    id: '400',
    text: 'Last comment.',
    author: '3',
    post: '30',
  },
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }

      return users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase()),
      )
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase())
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase())

        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info) {
      return comments
    },
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'marcelcruz@msn.com',
        age: 28,
      }
    },
    post() {
      return {
        id: '987123',
        title: 'Post title',
        body: 'This is the body of the post',
        published: true,
      }
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id)
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id)
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post)
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})
