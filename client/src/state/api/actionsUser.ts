import { EndpointBuilder } from "@reduxjs/toolkit/query"
import { apiSlice } from "state/features/apiSlice"
import { TUser } from "types/app.interface"


const API_URL = "/user"

export const actionsUserApiSlice = apiSlice.injectEndpoints({
	endpoints: (build: EndpointBuilder<any, any, any>) => ({
		updateUserProfile: build.mutation<TUser, { name?: string, title?: string, role?: string }>({
			query: (data: { name?: string, title?: string, role?: string }) => ({
				url: `${API_URL}/profile`,
				method: "PUT",
				body: data,
				credentials: "include"
			})
		}),
		deleteUser: build.mutation<TUser, string>({
			query: (userId: string) => ({
				url: `${API_URL}/logout/${userId}`,
				method: "DELETE",
				credentials: "include"
			})
		}),
		getTeamUsers: build.query<TUser[], void>({
			query: () => ({
				url: `${API_URL}/get-team`,
				method: "GET",
				credentials: "include"
			})
		}),
		setUserStatus: build.mutation<TUser, { userId: string, status: string }>({
			query: ({ userId, status }) => ({
				url: `${API_URL}/status/${userId}`,
				method: "PUT",
				body: { status },
				credentials: "include"
			})
		})
	}),
})

export const {
	useUpdateUserProfileMutation,
	useDeleteUserMutation,
	useGetTeamUsersQuery,
	useSetUserStatusMutation
} = actionsUserApiSlice