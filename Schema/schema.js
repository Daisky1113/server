const graphql = require('graphql')
const Author = require('../Models/author')
const Book = require('../Models/book')
const User = require('../Models/user')
const Comment = require('../Models/comment')


const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull } = graphql

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id })
      }
    }
  })
})


const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ bookId: parent.id })
      }
    }
  })
})


const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({ userId: parent.id })
      }
    }
  })
})

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    head: { type: GraphQLString },
    body: { type: GraphQLString },
    book: {
      type: BookType,
      resolve(parent, args) {
        return Book.findById(parent.bookId)
      }
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({})
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({})
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({})
      }
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Comment.findById(args.id)
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return Comment.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          country: args.country
        })
        return author.save()
      }
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Author.findByIdAndUpdate(args.id, Object.assign({}, args), { new: true })
      }
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Author.findByIdAndDelete(args.id)
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const book = new Book({
          title: args.title,
          authorId: args.authorId
        })
        return book.save()
      }
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(paretn, args) {
        return Book.findByIdAndUpdate(args.id, Object.assign({}, args), { new: true })
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(paretn, args) {
        return Book.findByIdAndRemove(args.id)
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name
        })
        return user.save()
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, Object.assign({}, args), { new: true })
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return user.findByIdAndDelete(args.id)
      }
    },

    addComment: {
      type: CommentType,
      args: {
        head: { type: GraphQLString },
        body: { type: GraphQLString },
        userId: { type: GraphQLNonNull(GraphQLID) },
        bookId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const comment = new Comment({
          head: args.head,
          body: args.body,
          userId: args.userId,
          bookId: args.bookId
        })
        return comment.save()
      }
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        head: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Comment.findByIdAndUpdate(args.id, Object.assign({}, args), { new: true })
      }
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Comment.findByIdAndDelete(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})