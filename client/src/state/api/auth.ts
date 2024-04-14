import { apiSlice } from "state/features/apiSlice"
import { TUser } from "types/app.interface"


const AUTH_API_URI = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<TUser, string>({
			query: (id) => `${AUTH_API_URI}/login`,
		})
	}),
})
