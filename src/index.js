const { GraphQLServer } = require('graphql-yoga')

let links = [
	{
  	id: 'link-0',
  	url: 'www.howtographql.com',
  	description: 'Fullstack tutorial for GraphQL'
	}
]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    allLinks: () => links,
    getLink: (parent, args) => {
    	const index = links.findIndex((link => link.id === args.id))
    	return links[index]
    }
  },
  Mutation: {
    createLink: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
    	const index = links.findIndex((link => link.id === args.id))

			links[index].url = args.url ? args.url : links[index].url
			links[index].description = args.description ? args.description : links[index].description

    	return links[index]
    }
  },
}

const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))