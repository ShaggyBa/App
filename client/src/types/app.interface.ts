export interface ILoginForm {
	email: string
	password: string
}

export type TUser = {
	_id: string
	name: string
	email: string
	password: string
	isActive?: boolean
	projects: string[]
	profileImage: string
	country: string
	company: string
}