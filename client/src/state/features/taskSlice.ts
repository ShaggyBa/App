import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "types/task.types";

interface TasksState {
	tasks: ITask[];
	loading: boolean;
	error: string | null;
}

const initialState: TasksState = {
	tasks: [],
	loading: false,
	error: null,
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {

		// Get tasks
		getTasks: (state, action: PayloadAction<ITask[]>) => {
			state.tasks = action.payload;
		},

		// Update task
		updateTask: (state, action: PayloadAction<ITask>) => {
			const taskIndex = state.tasks.findIndex((task) => task._id === action.payload._id);

			if (taskIndex !== -1) {
				state.tasks[taskIndex] = action.payload;
			}
		},

		// Create task
		createTask: (state, action: PayloadAction<ITask>) => {
			state.tasks.push(action.payload);
		},

		// Delete task
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((task) => task._id !== action.payload);
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

export const { getTasks, updateTask, createTask, deleteTask, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;