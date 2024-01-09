import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
type ToastMessage = {
	message: string;
	type: "SUCCESS" | "ERROR";
};

type AppContext = {
	// for toast notification (will return nothing so used void)
	showToast: (toastMessage: ToastMessage) => void;

	isLoggedIn: boolean;
};

// created a context(AppContext) that can have type AppContext(above) or type can be undefined and it is initialized to undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

	// calling the validateToken function and extracting error(it will indicate whether the valida Token endpoint returned 401 or not)
	const { isError } = useQuery("validateToken", apiClient.validateToken, {
		retry: false,
	});

	return (
		<AppContext.Provider
			value={{
				showToast: (toastMessage) => {
					setToast(toastMessage);
				},
				// if there is no error, then the isLoggedIn will be true
				isLoggedIn: !isError,
			}}
		>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(undefined)}
				/>
			)}
			{children}
		</AppContext.Provider>
	);
};

// custom hook to simplify the access of context within components.
export const useAppContext = () => {
	// useContext gets current value of AppContext
	const context = useContext(AppContext);
	// explicitly cast the context to AppContext type
	return context as AppContext;
};
