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
    id: '1',
    title: 'Post number one',
    body: 'This is post number one.',
    published: true,
  },
  {
    id: '2',
    title: 'Post number two',
    body: 'This is post number two.',
    published: false,
  },
  {
    id: '1',
    title: 'Post number three',
    body: 'This is post number three.',
    published: true,
  },
]

// greeting(name: String, position: String): String!
// add(numbers: [Float!]!): Float!
// grades: [Int!]!

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
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
}

// greeting(parent, args, ctx, info) {
//   if (args.name && args.position) {
//     return `Hello, ${args.name}! You're my favourite ${args.position}.`
//   }
//   return 'Hello'
// },
// add(parent, args, ctx, info) {
//   if (args.numbers.length === 0) {
//     return 0
//   }

//   return args.numbers.reduce((acc, number) => acc + number)
// },
// grades(parent, args, ctx, info) {
//   return [99, 80, 93]
// },

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})
