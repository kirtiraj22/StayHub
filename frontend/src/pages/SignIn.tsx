import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type SignInFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInFormData>();

	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async () => {
			showToast({
				message: "Sign in Successful",
				type: "SUCCESS",
			});
			navigate("/");
		},
		onError: (error: Error) => {
			showToast({
				message: error.message,
				type: "ERROR",
			});
		},
	});

	// handleSubmit will check if the data entered is valid and if it is valid then it will extract the data(from the form) and pass it to mutate() function
	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<form
			className="flex flex-col gap-5 max-w-md mx-auto border border-black shadow-lg p-16 rounded-xl"
			onSubmit={onSubmit}
		>
			<h2 className="text-2xl font-bold mx-auto">Sign In</h2>
			<label className="text-gray-700 text-md font-bold flex-1">
				Email
				<input
					type="email"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register("email", {
						required: "Field is required",
					})}
				/>
				{errors.email && (
					<span className="text-red-500 text-sm">
						{errors.email.message}
					</span>
				)}
			</label>
			<label className="text-gray-700 text-md font-bold flex-1">
				Password
				<input
					type="password"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register("password", {
						required: "Field is required",
						minLength: {
							value: 6,
							message: "Password must be atleast 6 characters",
						},
					})}
				/>
				{errors.password && (
					<span className="text-red-500 text-sm">
						{errors.password.message}
					</span>
				)}
			</label>
			<span className="mx-auto">
				<button
					type="submit"
					className="bg-blue-600 text-white py-2 font-bold hover:bg-blue-500 text-xl px-6 border rounded-lg"
				>
					Login
				</button>
			</span>
		</form>
	);
};

export default SignIn;
