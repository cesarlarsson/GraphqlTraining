const resolvers = {
	Query:{
		cars: (parent,args,{models})=>{
			return models.cars
		},
		car:(parent, {id},{models})=>{	
			const car = models.cars.filter(car =>{ 
				return car.id === +id
			});
			return car[0];
		}
	},

	Car:{
		owner:(parent,args,{models})=>{
			console.log(parent.ownerBy);
			//return users[parent.ownerBy]
			const user = models.users.filter(user =>{ 
				return user.id === +parent.ownerBy
			});
			return user[0];
		}

	},
	Mutation:{

		createCar(parent,{id,make,model,color}, {models}){
			const car ={
				id,make,model,color
			}
			models.cars.push(car);
			return car;

		},
		removeCar: (parent,{id},{models})=>{
			let found = false;
			cars = models.cars.filter(car =>{
				if(car.id === id){
					found=true;
				}else{
					return car
				}
			})
			if(found){
				return true;
			}else{
				return false;
			}
		},

	}
  };
  
  module.exports = resolvers;