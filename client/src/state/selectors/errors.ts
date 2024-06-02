import { RootState } from "state/store";

export const getErrorMessage = (state: RootState) => state.auth.errorMsg;
