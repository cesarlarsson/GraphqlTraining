const { sequelize} = require('./models/database');
const models = require('./models');


const createData = async ()=>{
	await models.User.create({
		name:'Tame',
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
}

sequelize.sync().then(async ()=>{
	try{
		await createData();
		process.exit();
	}catch(error){
		console.log(error);
	}
});