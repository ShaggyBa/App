export const dataUser = [
	// {
	// 	_id: "63701cc1f03239c72c00017f",
	// 	name: "Konstantine",
	// 	email: "kranstead0@narod.ru",
	// 	password: "omMDCh",
	// 	projects: [],
	// 	profileImage: '',
	// 	country: 'Russian Federation',
	// 	company: 'Avokados'
	// },
	// {
	// 	_id: "63701cc1f03239c72c000180",
	// 	name: "Marilyn",
	// 	email: "mdonlon1@hostgator.com",
	// 	password: "XRYBnKAfm",
	// 	projects: [],
	// 	profileImage: '',
	// 	country: '',
	// 	company: ''
	// },
	// {
	// 	_id: "63701cc1f03239c72c000181",
	// 	name: "Olly",
	// 	email: "oveneur2@marketwatch.com",
	// 	password: "WwDjOlH",
	// 	projects: [],
	// 	profileImage: '',
	// 	country: '',
	// 	company: ''
	// },
	// {
	// 	_id: "63701cc1f03239c72c000182",
	// 	name: "Hale",
	// 	email: "hpyrah3@bbc.co.uk",
	// 	password: "vojl4bBDJ",
	// 	projects: [],
	// 	profileImage: '',
	// 	country: '',
	// 	company: ''
	// },
	// {
	// 	_id: "63701cc1f03239c72c000183",
	// 	name: "Allie",
	// 	email: "afranzschoninger4@simplemachines.org",
	// 	password: "zocih1DjIv",
	// 	projects: [],
	// 	profileImage: '',
	// 	country: '',
	// 	company: ''
	// },
	// {
	// 	_id: "63701cc1f03239c72c000184",
	// 	name: "Donelle",
	// 	email: "dcrossgrove5@constantcontact.com",
	// 	password: "Q81bu6JV",
	// 	projects: [],
	// 	profileImage: '',
	// 	country: '',
	// 	company: ''
	// },
	{
		"email": "admin@mail.ru",
		"name": "ShaggyBa",
		"isAdmin": true,
		"password": "1234admin",
		"role": "admin",
		"title": "Legend"
	}
]

export const dataProject = [
	{
		_id: '65e341f0c6979fcde6fd9f72',
		createdBy: dataUser[0]._id,
		name: "Sample Project",
		date_of_creation: new Date(),
		participants: [{
			userId: dataUser[0]._id,
			accessLevel: "superadmin",
			roleName: "admin",
			roleDescription: "Project owner"
		}],
		tasks: [],
		customTaskCards: [{
			name: "Sample Card",
			color: "blue"
		}],
	}
];

export const dataTasks = [
	{
		createdBy: {
			user: dataUser[0]._id,
			project: dataProject[0]._id
		},
		name: "Sample Task 1",
		date_of_creation: new Date(),
		category: "To do",
		cards: [],
		responсibles: [],
	},
	{
		createdBy: {
			user: dataUser[0]._id,
			project: dataProject[0]._id
		},
		name: "Sample Task 2",
		date_of_creation: new Date(),
		category: "To do",
		cards: [],
		responсibles: [],
	},
	{
		createdBy: {
			user: dataUser[0]._id,
			project: dataProject[0]._id
		},
		name: "Sample Task 3",
		date_of_creation: new Date(),
		category: "To do",
		cards: [],
		responсibles: [],
	}
]