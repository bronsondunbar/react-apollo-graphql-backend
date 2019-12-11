const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// let links = [
// 	{
//   	id: 'link-0',
//   	url: 'www.howtographql.com',
//   	description: 'Fullstack tutorial for GraphQL'
// 	}
// ]
// let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    allLinks: (root, args, context, info) => {
      return context.prisma.links()
    },
    // getLink: (parent, args) => {
    // 	const index = links.findIndex((link => link.id === args.id))
    // 	return links[index]
    // }
  },
  Mutation: {
    createLink: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
   //  updateLink: (parent, args) => {
   //  	const index = links.findIndex((link => link.id === args.id))

			// links[index].url = args.url ? args.url : links[index].url
			// links[index].description = args.description ? args.description : links[index].description

   //  	return links[index]
   //  },
   //  deleteLink: (parent, args) => {
   //  	const index = links.findIndex((link => link.id === args.id))

   //  	links.splice(index, 1)

   //  	return links
   //  }
  },
}

const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))