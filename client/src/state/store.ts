import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./features/authSlice"
import { apiSlice } from "./features/apiSlice";
import { setupListeners } from '@reduxjs/toolkit/query';
import tasksSlice from './features/taskSlice';
import { rtkQueryErrorLogger } from '../middleware/authError';
import projectsSlice from './features/projectsSlice';


export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSlice,
		tasks: tasksSlice,
		projects: projectsSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(rtkQueryErrorLogger, apiSlice.middleware),
	devTools: true
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch