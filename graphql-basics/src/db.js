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

const db = {
  users,
  posts,
  comments,
}

export { db as default }
