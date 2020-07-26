const { sequelize} = require('./models/database');
const models = require('./models');


const createData = async ()=>{
	await models.User.create({
		name:'Tame',
		username:'tame',
		password: 'test1',
		cars:[
			{
				make:'mercedes',
				model:'A250',
				color:'black'
			}
		]
	},{
		include: [models.Car]
	})

	await models.User.create({
		name:'Cesar',
		username:'cesar',
		password: 'test1',
		cars:[
			{
				make:'mercedes',
				model:'A250',
				color:'black'
			},
			{
				make:'renault',
				model:'logan',
				color:'red'
			}
		]
	},{
		include: [models.Car]
	})
}

sequelize.sync({force:true}).then(async ()=>{
	try{
		await createData();
		process.exit();
	}catch(error){
		console.log(error);
	}
});