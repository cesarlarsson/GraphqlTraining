require('dotenv').config();
const express =require('express');
const app = express();
const {ApolloServer, gql} = require('apollo-server-express');
let models = require('./models');
const cors = require('cors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const jwt = require('jsonwebtoken');

const getLoggedInUser = req =>{
	const token = req.headers['x-auth-token'];
	if(token){
		try{
			return jwt.verify(token, process.env.JWT_SECRET);
		}catch(error){
			throw new Error('Session expired')
		}
	}
}


const server = new ApolloServer({
	typeDefs,
	resolvers,
	context:({req})=>({
		models,
		secret: process.env.JWT_SECRET,
		me: getLoggedInUser(req)
	})
})

server.applyMiddleware({app});
app.use(cors());

app.listen(3000, ()=> console.info('Apollo GraphQL server is running on port 3000'));
