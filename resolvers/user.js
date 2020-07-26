const jwt = require('jsonwebtoken');

const createToken = (user,secret,expiresIn)=>{
	const {id,name,username} = user;
	return jwt.sign({id,name,username},secret,{expiresIn});
}

//parent, args, context, info
const resolvers = {
	Query:{
		users: (parent,args,{models})=>{
			return models.User.findAll()
		},
		user:(parent, {id},{models})=>{	

			return models.User.findByPk(id)
			/*const user = models.users.filter(user =>{ 
				return user.id === +id
			});
			return user[0];*/
		},
	//	me: (parent,args,{me}) => me
		
	},
	Mutation:{
		//makeUser: (parent,{id, name},{models})=>{
		makeUser: (parent,{ name},{models})=>{

			const user={

				name
			}
			return models.User.create(user);
		},
		removeUser: (parent,{id},{models})=>{
			/*let found = false;
			users = models.users.filter(user =>{
				if(user.id === id){
					found=true;
				}else{
					return user
				}
			})
			if(found){
				return true;
			}else{
				return false;
			}*/
			return models.User.destroy({
				where:{
					id
				}
			})
		},
		register: async (parent,{name,username,password},{models})=>{
			const user = {
				name,
				username,
				password
			}
			const registeredUser =await models.User.create(user);
			try{
				if(typeof registeredUser.id === 'number'){
					return true;
				}else {
					return false;
				}
			}catch(error){
				console.error(error);
				return false;
			}
		},
		login: async (parent,{username,password},{models,secret})=>
		{
			const user = await models.User.findOne({where: {username}}); 
			if(!user){
				throw new Error('User not found');
			}

			const validPassword =await user.validatePassword(password);
			if(!validPassword){
				throw new Error()
			}
			return{
				token: createToken(user, secret, '30m')
			}
			
		}
	},
  User:{
	Car:(parent,arg,{models})=>{
		/*let carList=[];
		parent.cars.forEach(element => {
			const car = models.cars.filter(car =>{ 
				return car.id === +element
			});
			carList.push(car[0]);
		});
		console.log(carList);
		return carList;*/
		return models.Car.findAll({
			where:{
				userId:parent.id
			}
		})
	}
},

};

module.exports = resolvers;
