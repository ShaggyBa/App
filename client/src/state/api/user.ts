import { EndpointBuilder } from "@reduxjs/toolkit/query"
import { apiSlice } from "state/features/apiSlice"
import { TUser } from "types/app.interface"
const API_URL = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (build: EndpointBuilder<any, any, any>) => ({
		login: build.mutation<TUser, { email: string, password: string }>({
			query: (data: { email: string, password: string }) => ({
				url: `${API_URL}/login`,
				method: "POST",
				body: data,
				credentials: "include"
			})
		}),
		register: build.mutation<TUser, { name: string, title: string, email: string, password: string, role: string }>({
			query: (data: { name: string, title: string, email: string, password: string, role: string }) => ({
				url: `${API_URL}/register`,
				method: "POST",
				body: data,
				credentials: "include"
			})
		}),
		logout: build.mutation<TUser, void>({
			query: () => ({
				url: `${API_URL}/logout`,
				method: "POST",
				credentials: "include"
			})
		})
	}),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice