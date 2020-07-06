let users = [
	{
		id:1,
		name:"thomas",
		cars:[1,2]
	},
	{
		id:2,
		name:"susan",
		cars:[3]
	},
	{
		id:3,
		name:"steven",
		cars:[]
	}
];

let cars =[
	{
		id:1,
		make: 'Ford',
		model: 'Focus',
		color: 'red',
		ownerBy: 1
	},
	{
		id:2,
		make: 'Ford',
		model: 'Festiva',
		color: 'black',
		ownerBy: 1
	},
	{
		id:3,
		make: 'Ford',
		model: 'bronco',
		color: 'black',
		ownerBy: 2
	},
]

module.exports={
	users,
	cars
}