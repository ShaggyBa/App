import { EndpointBuilder } from "@reduxjs/toolkit/query"
import { apiSlice } from "state/features/apiSlice"

const API_URL = "/projects"

export const projectsApiSlice = apiSlice.injectEndpoints({
	endpoints: (build: EndpointBuilder<any, any, any>) => ({
		getProjects: build.query({
			query: () => ({
				url: `${API_URL}`,
				method: "GET",
				credentials: "include"
			})
		}),
		getProject: build.query({
			query: (params: { _id: string }) => {
				return ({
					url: `${API_URL}/${params}`,
					method: "GET",
					credentials: "include"
				})
			}
		}),
		createProject: build.mutation({
			query: (data) => ({
				url: `${API_URL}/create`,
				method: "POST",
				body: data,
				credentials: "include"
			})
		}),
		updateProject: build.mutation({
			query: ({ id, data }: { id: string, data: any }) => ({
				url: `${API_URL}/${id}`,
				method: "PUT",
				body: data,
				credentials: "include"
			})
		}),
		deleteProject: build.mutation({
			query: (id: string) => ({
				url: `${API_URL}/${id}`,
				method: "DELETE",
				credentials: "include"
			})
		}),
	})
})
export const {
	useGetProjectsQuery,
	useGetProjectQuery,
	useCreateProjectMutation,
	useUpdateProjectMutation,
	useDeleteProjectMutation
} = projectsApiSlice