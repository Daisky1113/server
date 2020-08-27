const graphql = require('graphql')
const Author = require('../Models/author')
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
    country: { type: GraphQLString }
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
        console.log(author)
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
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})