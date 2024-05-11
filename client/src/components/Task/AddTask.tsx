import { Dialog } from "@headlessui/react"
import { ModalWrapper } from "components/ModalWrapper"
import { Textbox } from "components/TextBox"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { TeamList } from "./TeamList"
import { SelectList } from "./SelectList"
import Button from "components/Button"
import { BiImages } from "react-icons/bi"
import { ITask } from "types/task.types"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from "utils/firebase"
import { useCreateTaskMutation, useUpdateTaskMutation } from "state/api/tasks"
import { toast } from "sonner"
import { dateFormatter } from "utils/index"


const LISTS: string[] = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY: string[] = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs: string[] = [];


export const AddTask = ({ onSubmit, open, setOpen, task }: { onSubmit?: any, open: boolean, setOpen: any, task?: ITask | undefined }) => {

	const defaultValues = {
		title: task?.title || "",
		team: task?.team || [],
		date: dateFormatter(task?.date || new Date()),
		stage: task?.stage?.toUpperCase() || LISTS[0],
		priority: task?.priority?.toUpperCase() || PRIORITY[2],
		assets: [],
	}

	const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

	const [team, setTeam] = useState(task?.team || [])

	const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0])

	const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2])

	const [assets, setAssets] = useState<File[]>([]);

	const [uploading, setUploading] = useState(false)

	const [createTask, { isLoading }] = useCreateTaskMutation()
	const [updateTask, { isLoading: updateLoading }] = useUpdateTaskMutation()

	const URLS = task?.assets ? [...task?.assets] : []

	const submitHandler = async (data: any) => {
		for (const file of assets) {
			setUploading(true)
			try {
				await uploadFile(file);
			}
			catch (err) {
				toast.error("Something went wrong: " + err)
			}
			finally {
				setUploading(false)
			}
		}

		try {
			const newData = {
				...data,
				title: data.title ? data.title : task?.title,
				date: data.date ? data.date : task?.date,
				assets: [...URLS, ...uploadedFileURLs],
				team,
				stage,
				priority
			}

			const res = task?._id ? await updateTask({ newData, id: task?._id }).unwrap() : await createTask(newData).unwrap();

			if (onSubmit)
				onSubmit()
			else
				window.location.reload()

			toast.success(`${task?._id ? "Task Updated: " + res.message : "Task Created: " + res.message}`)

			setTimeout(() => {
				setOpen(false)
			}, 500)
		}
		catch (err) {

		}
	}

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		setAssets(files ? Array.from(files) : []);
	};

	const uploadFile = async (file: any) => {
		const storage = getStorage(app);

		const name = new Date().getTime() + file.name;
		const storageRef = ref(storage, name);

		const uploadTask = uploadBytesResumable(storageRef, file);

		return new Promise((resolve, reject) => {
			uploadTask.on("state_changed", (snapshot) => {
				console.log("Upload is " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "% done");
			}, (error) => {
				reject(error);
			}, () => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL) => {
						uploadedFileURLs.push(downloadURL);
						resolve(downloadURL);
					})
					.catch((error) => {
						reject(error)
					})
			})
		})
	}

	return <ModalWrapper open={open} setOpen={setOpen}>
		<form onSubmit={handleSubmit(submitHandler)}>
			<Dialog.Title
				as="h2"
				className={"text-base font-bold leading-6 text-gray-900 mb-4"}
			>
				{task ? "Update task" : "Add task"}
			</Dialog.Title>

			<div className="mt-2 flex flex-col gap-6">
				<Textbox
					placeholder={task?.title}
					type="text"
					name="title"
					label="Task title"
					className="w-full rounded"
					register={register("title", { required: task ? false : "Title is required" })}
					error={errors.title ? errors.title.message : ""}
				/>

				<TeamList
					setTeam={setTeam}
					team={team}
				/>

				<div className="flex gap-4">
					<SelectList
						label="Task stage"
						lists={LISTS}
						selected={stage}
						setSelected={setStage}
					/>

					<div className="w-full">
						<Textbox
							type="date"
							name="date"
							label="Task date"
							className="w-full rounded"
							register={register("date", { required: task ? false : "Date is required" })}
							error={errors.date ? errors.date.message : ""}
						/>
					</div>
				</div>

				<div className='flex gap-4'>
					<SelectList
						label='Priority Level'
						lists={PRIORITY}
						selected={priority}
						setSelected={setPriority}
					/>

					<div className='w-full flex items-center justify-center mt-4'>
						<label
							className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
							htmlFor='imgUpload'
						>
							<input
								type='file'
								className='hidden'
								id='imgUpload'
								onChange={(e) => handleSelect(e)}
								accept='.jpg, .png, .jpeg'
								multiple={true}
							/>
							<BiImages />
							<span>Add Assets</span>
						</label>
					</div>
				</div>

				<div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
					{uploading ? (
						<span className='text-sm py-2 text-red-500'>
							Uploading assets
						</span>
					) : (
						<Button
							label='Submit'
							type='submit'
							className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
						/>
					)}

					<Button
						type='button'
						className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
						onClick={() => setOpen(false)}
						label='Cancel'
					/>
				</div>

			</div>
		</form>
	</ModalWrapper>
}