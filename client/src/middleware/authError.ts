import {
	Middleware,
	MiddlewareAPI,
	isRejected,
} from "@reduxjs/toolkit";
import { logout, showErrorMessage } from "state/features/authSlice";


export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => (next) => (action: any) => {
		if (isRejected(action)) {
			if (action.payload?.status === 401) {
				// Check error response message
				if (action.payload?.data?.message?.includes('Invalid email or password')) {
					// Handle login error
					return next(action);
				} else {
					// Handle unauthorized access
					api.dispatch(logout());
					api.dispatch(showErrorMessage({ text: "Session Expired", type: "error" }));
				}
			}
		}

		return next(action);
	};