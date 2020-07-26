require('dotenv').config();
const express =require('express');
const app = express();
const {ApolloServer, gql} = require('apollo-server-express');
let models = require('./models');
const cors = require('cors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
//const me = models.users[0];

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context:{
		models,
		secret: process.env.JWT_SECRET
		//me
	}
})

server.applyMiddleware({app});
app.use(cors());

app.listen(3000, ()=> console.info('Apollo GraphQL server is running on port 3000'));
