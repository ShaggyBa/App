export interface ILoginForm {
	email: string
	password: string
}

export interface IRegisterForm {
	name: string,
	email: string,
	password: string,
	isAdmin?: boolean,
	role: 'developer' | 'teamlead' | 'admin',
	title: string
}

export type TUser = {
	_id: string
	name: string
	email: string
	password: string
	isActive?: boolean
	isAdmin?: boolean
	projects: string[]
	profileImage: string
	country: string
	company: string
}

export type TQueryResult = {
	status: string,
	message: string
	data?: any
}

export type TErrorResponce = {
	message: string
	status?: string
}