import { EndpointBuilder } from "@reduxjs/toolkit/query"
import { apiSlice } from "state/features/apiSlice"
import { TUser } from "types/app.interface"

const API_URL = "/projects"

export const projectsApiSlice = apiSlice.injectEndpoints({
	endpoints: (build: EndpointBuilder<any, any, any>) => ({
		// getDashboardStatistics: build.query<TUser, { _id: string, isAdmin: boolean }>({
		// 	query: (params: { _id: string, isAdmin: boolean }) => ({
		// 		url: `${API_URL}/dashboard`,
		// 		method: "GET",
		// 		body: params,
		// 		credentials: "include"
		// 	})
		// }),
		getProjects: build.query({
			query: () => ({
				url: `${API_URL}`,
				method: "GET",
				credentials: "include"
			})
		}),
		// createTask: build.mutation({
		// 	query: (data: any) => ({
		// 		url: `${API_URL}/create`,
		// 		method: "POST",
		// 		body: data,
		// 		credentials: "include"
		// 	})
		// }),
		// createSubTask: build.mutation({
		// 	query: ({ data, id }: { data: any, id: string }) => ({
		// 		url: `${API_URL}/create-subtask/${id}`,
		// 		method: "PUT",
		// 		body: data,
		// 		credentials: "include"
		// 	})
		// }),
		// duplicateTask: build.mutation({
		// 	query: (id: string) => ({
		// 		url: `${API_URL}/duplicate/${id}`,
		// 		method: "POST",
		// 		body: {},
		// 		credentials: "include"
		// 	})
		// }),
		// updateTask: build.mutation({
		// 	query: ({ newData, id }: any) => ({
		// 		url: `${API_URL}/update/${id}`,
		// 		method: "PUT",
		// 		body: newData,
		// 		credentials: "include"
		// 	})
		// }),
		// trashTask: build.mutation({
		// 	query: (id: string) => ({
		// 		url: `${API_URL}/trash/${id}`,
		// 		method: "PUT",
		// 		body: {},
		// 		credentials: "include"
		// 	})
		// }),
		// getTaskInfo: build.query({
		// 	query: (id: string) => ({
		// 		url: `${API_URL}/${id}`,
		// 		method: "GET",
		// 		credentials: "include"
		// 	})
		// }),
		// postTaskActivity: build.mutation({
		// 	query: ({ data, id }: { data: any, id: string }) => ({
		// 		url: `${API_URL}/activity/${id}`,
		// 		method: "POST",
		// 		body: data,
		// 		credentials: "include"
		// 	})
		// }),
		// deleteOrRestoreTask: build.mutation({
		// 	query: ({ id, actionType }: { id: string, actionType: string }) => ({
		// 		url: `${API_URL}/delete-restore/${id}?actionType=${actionType}`,
		// 		method: "DELETE",
		// 		credentials: "include"
		// 	})
		// })
	})
})
export const {
	// useGetDashboardStatisticsQuery,
	useGetProjectsQuery,
	// useCreateTaskMutation,
	// useCreateSubTaskMutation,
	// useDuplicateTaskMutation,
	// useUpdateTaskMutation,
	// useTrashTaskMutation,
	// useGetTaskInfoQuery,
	// usePostTaskActivityMutation,
	// useDeleteOrRestoreTaskMutation
} = projectsApiSlice