const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users
    }

    return db.users.filter(user =>
      user.name.toLowerCase().includes(args.query.toLowerCase()),
    )
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase())
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase())

      return isTitleMatch || isBodyMatch
    })
  },
  comments(parent, args, { db }, info) {
    return db.comments
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
}

export { Query as default }
