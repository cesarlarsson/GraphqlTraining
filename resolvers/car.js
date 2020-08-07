const resolvers = {
	Query:{
		cars: (parent,args,{models})=>{
			return models.Car.findAll();
		},
		car:(parent, {id},{models})=>{	
		/*	const car = models.cars.filter(car =>{ 
				return car.id === +id
			});
			return car[0];*/
			return models.Car.findByPk(id);
		}
	},

	Car:{
		owner:(parent,args,{models})=>{

			return models.User.findByPk(parent.userId)
		}

	},
	Mutation:{

		createCar(parent,{make,model,color}, {models,me}){
			if(!me){
				throw new Error('Not Authenticated');
			}

			const car ={
				make,
				model,
				color,
				userId: me.id
			}
			return  models.Car.create(car);

		},
		removeCar: (parent,{id},{models})=>{
			models.Car.destroy({
				where:{
					id:id
				}
			})
		},

	}
  };
  
  module.exports = resolvers;