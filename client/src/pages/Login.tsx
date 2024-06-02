import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Button from "components/Button"
import FormField from "components/FormField"
import { ILoginForm } from "types/app.interface"
import { setCredentials, showErrorMessage } from "state/features/authSlice"
import { useLoginMutation } from "state/api/user"
import { toast } from "sonner"
import { Loader } from "components/Loader"
import { getErrorMessage } from "state/selectors/errors"

const Login = () => {

	const { user } = useSelector((state: any) => state.auth)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ILoginForm>()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const errorMsg = useSelector(getErrorMessage)

	if (errorMsg.type === "error")
		setTimeout(() => {
			toast.info(errorMsg.text)
		}, 100)

	const [login, { isLoading }] = useLoginMutation()

	const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
		try {
			const result = await login(data).unwrap()
			dispatch(setCredentials(result))
			dispatch(showErrorMessage({ text: "", type: "" }))
			navigate("/")
		} catch (err: any) {
			toast.error(err?.data?.message || err.message)
		}
		reset()
	}


	useEffect(() => {
		user && navigate('/dashboard')
	}, [user])


	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center lg:flex-row bg-[#f3f4f6]">
			<div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">

				{/* left side */}
				<div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
					<div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">

						<span
							className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600"
						>Manage all your task and projects here
						</span>

						<p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
							<span>Cloud-Based</span>
							<span>Task Manager</span>
						</p>

						<div className="cell">
							<div className="circle rotate-in-up-left">

							</div>
						</div>

					</div>
				</div>

				{/* right side */}
				<div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-14"
					>
						<div className="">
							<p className="text-blue-600 text-3xl font-bold text-center">Welcome back!</p>
							<p className="text-center text-base text-gray-700 ">
								Keep all your credentials safe.
							</p>
						</div>
						<div className="flex flex-col gap-y-5 ">
							<FormField
								placeholder="mail@example.com"
								type="email"
								name="email"
								label="Email"
								className="w-full rounded-full"
								register={register("email", {
									required: "Email is required",
									pattern: {
										value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
										message: "Invalid email address"
									}
								})}
								error={errors.email ? errors.email.message : ""}
							/>
							<FormField
								placeholder="Your password"
								type="password"
								name="password"
								label="Password"
								className="w-full rounded-full"
								register={register("password", {
									required: "Password is required",

								})}
								error={errors.password ? errors.password.message : ""}

							/>
							<span className="text-sm text-gray-500 hover:text-blue-500 hover:underline cursor-pointer">
								Forgot the password?
							</span>

							{
								!isLoading
									? <Button
										type="submit"
										label="Login"
										className="w-full h-10 bg-blue-700 text-white rounded-full"
									/>
									: <Loader />
							}

						</div>
					</form>
				</div>

			</div>
		</div>
	)
}

export default Login
