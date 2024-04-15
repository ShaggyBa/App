import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	_id: string,
	name: string,
	email: string,
	password: string,
	projects: string[],
	profileImage: string,
	country: string,
	company: string,
}

interface AuthState {
	user: User | null;
	isSidebarOpen: boolean;
	testId: string;
}

const userInfoString: string | null = localStorage.getItem("userInfo");
const parsedUserInfo: User | null = userInfoString ? JSON.parse(userInfoString) : null;


const initialState: AuthState = {
	user: parsedUserInfo,
	isSidebarOpen: false,
	testId: "66188064eeec4ff8cb71faab"
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<User>) => {

			state.user = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		login: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("userInfo");
		},
		setOpenSidebar: (state, action) => {
			state.isSidebarOpen = action.payload
		}
	}
})

export const { setCredentials, login, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;