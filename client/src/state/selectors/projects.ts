import { RootState } from "../store"
import { TProject } from "types/project.types"

export const getProjectsSelector = (state: RootState) => state.projects.projects