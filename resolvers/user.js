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
