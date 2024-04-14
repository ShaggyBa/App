import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { TUser } from "types/app.interface"


const API_URL = import.meta.env.VITE_API_BASE_URL

export const apiSlice = createApi(
	{
		baseQuery: fetchBaseQuery({ baseUrl: API_URL + "/api" }),
		reducerPath: "api",
		tagTypes: ["User"],
		endpoints: (build) => ({
			getUser: build.query<TUser, string>({
				query: (id) => `login/user/${id}`,
				providesTags: ["User"],
			})
		})
	}
)
//@ts-ignore
export const { useGetUserQuery } = apiSlice