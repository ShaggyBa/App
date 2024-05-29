import { RootState } from "../store"
import { ITask, TStageEnum } from "types/task.types";

export const getTasksSelector = (state: RootState) => state.tasks.tasks; // Selects all tasks
export const getTaskByIdSelector = (state: RootState, taskId: string) => state.tasks.tasks.find((task: ITask) => task._id === taskId); // Selects a task by ID
export const getTasksByStageSelector = (state: RootState, stage: TStageEnum) => state.tasks.tasks.filter((task: ITask) => task.stage === stage); // Selects tasks by stage