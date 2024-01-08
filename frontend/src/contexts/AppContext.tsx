import React, { useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
	message: string;
	type: "SUCCESS" | "ERROR";
};

type AppContext = {
	// for toast notification (will return nothing so used void)
	showToast: (toastMessage: ToastMessage) => void;
};

// created a context(AppContext) that can have type AppContext(above) or type can be undefined and it is initialized to undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

	return (
		<AppContext.Provider
			value={{
				showToast: (toastMessage) => {
					setToast(toastMessage);
				},
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
