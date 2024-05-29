export interface ITask {
	_id: string,
	title: string,
	date: string,
	priority: string,
	stage: string,
	assets: string[],
	team: TTeam[],
	isTrashed: boolean,
	activities: any,
	subTasks: TSubTasks[],
	createdAt: string,
	updatedAt: string,
	__v: number,
}

export type TSubTasks = {
	title: string,
	date: string,
	tag: string,
	_id: string
}

export type TTeam = {
	_id: string,
	name: string,
	title: string,
	role?: string,
	email: string,
}

export type TStage = {
	[key: string]: string
}

export type TPriority = {
	[key: string]: string
}


export enum TStageEnum {
	"TODO" = "todo",
	"IN_PROGRESS" = "in progress",
	"COMPLETED" = "completed",
}