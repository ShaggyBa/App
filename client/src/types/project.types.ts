export type TProject = {
	_id: string,
	owner: string,
	name: string
	tasks: string[],
	createdAt: string,
	team: TTeamInProject[]
}

export type TTeamInProject = {
	userId: string,
	userEmail: string,
	roleName: string,
	userName: string,
	accessLevel: string,
	isActive: boolean,
	roleDescription: string
}