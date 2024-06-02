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
				api.dispatch(logout());
				api.dispatch(showErrorMessage({ text: "Session Expired", type: "error" }));
			}
		}

		return next(action);
	};