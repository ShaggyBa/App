import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
	projects: any;
	loading: boolean;
	error: string | null;
}

const initialState: TasksState = {
	projects: [],
	loading: false,
	error: null,
};

const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {

		// Get projects
		getProjects: (state, action: PayloadAction<any>) => {
			state.projects = action.payload;
		},

		// Update projects
		updateProject: (state, action: PayloadAction<any>) => {
			console.log("Update projects Reducer", action.payload)
			const taskIndex = state.projects.findIndex((projects: any) => projects._id === action.payload._id);
			if (taskIndex !== -1) {
				state.projects[taskIndex] = action.payload;
			}
		},

		// Create projects
		createProject: (state, action: PayloadAction<any>) => {
			console.log("Create projects Reducer", action.payload)
			state.projects.push(action.payload);
		},

		// Delete projects
		deleteProject: (state, action: PayloadAction<string>) => {
			state.projects = state.projects.filter((projects: any) => projects._id !== action.payload);
		},

		// Set loading state
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		// Set error
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const { getProjects, updateProject, createProject, deleteProject, setLoading, setError } = projectsSlice.actions;
export default projectsSlice.reducer; 