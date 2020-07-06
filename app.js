const express =require('express');
const app = express();
const {ApolloServer, gql} = require('apollo-server-express');
const users = require('./data').users;
const cars = require('./data').cars;
const me = require('./data').users[0];
const typeDefs = gql`
	type Query{
		users: [User]
		user(id: ID!): User
		cars: [Car]
		car(id: ID!): Car
		me: User
	}

	type User{
		id: ID!
		name:String!
		cars:[Car]

	}
	type Car{
		id: ID!
		make: String!
		model: String!
		color: String!
		owner: User!
	}
`;
const resolvers = {
	Query:{
		users: ()=>{
			return users
		},
		user:(parent, {id})=>{	
			const user = users.filter(user =>{ 
				return user.id === +id
			});
			return user[0];
		},
		cars: ()=>{
			return cars
		},
		car:(parent, {id})=>{	
			const car = cars.filter(car =>{ 
				return car.id === +id
			});
			return car[0];
		},
		me: () => me
		
	},
	User:{
		cars:(parent)=>{
			let carList=[];
			parent.cars.forEach(element => {
				const car = cars.filter(car =>{ 
					return car.id === +element
				});
				carList.push(car[0]);
			});
			console.log(carList);
			return carList;
		}
	},
	Car:{
		owner:(parent)=>{
			console.log(parent.ownerBy);
			//return users[parent.ownerBy]
			const user = users.filter(user =>{ 
				return user.id === +parent.ownerBy
			});
			return user[0];
		}

	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.applyMiddleware({app});

app.listen(3000, ()=> console.info('Apollo GraphQL server is running on port 3000'));
