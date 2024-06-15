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
import { dateFormatter, translatedData } from "utils/index"
import { createTask, updateTask } from "state/features/taskSlice"
import { useDispatch } from "react-redux"
import { TQueryResult } from "types/app.interface"
import { useTranslation } from "react-i18next"


const LISTS: string[] = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY: string[] = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs: string[] = [];


export const AddTask = ({ open, setOpen, task }: { open: boolean, setOpen: any, task?: ITask | undefined }) => {

	const defaultValues = {
		title: task?.title || "",
		team: task?.team || [],
		date: dateFormatter(task?.date || new Date()),
		stage: task?.stage?.toUpperCase() || LISTS[0],
		priority: task?.priority?.toUpperCase() || PRIORITY[2],
		assets: [],
	}

	const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

	const { t } = useTranslation()

	const [team, setTeam] = useState(task?.team || [])

	const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0])

	const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2])

	const [assets, setAssets] = useState<File[]>([]);

	const [uploading, setUploading] = useState(false)

	const [createTaskQuery] = useCreateTaskMutation()
	const [updateTaskQuery] = useUpdateTaskMutation()

	const URLS = task?.assets ? [...task?.assets] : []

	const dispatch = useDispatch()

	console.log(t(priority.toLowerCase(), { lng: "en" }))

	const submitHandler = async (data: any) => {
		for (const file of assets) {
			setUploading(true)
			try {
				await uploadFile(file);
			}
			catch (err) {
				toast.error(t("SomethingWentWrong") + err)
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

			task?._id
				? await updateTaskQuery({ newData, id: task?._id }).unwrap().then((res: TQueryResult) => {
					dispatch(updateTask({ ...newData, _id: task?._id }))
					toast.success(`${task?._id ? t("TaskUpdated") + res.message : t("TaskCreated") + res.message}`)

				})
				: await createTaskQuery(newData).unwrap().then((res: TQueryResult) => {
					dispatch(createTask({ ...newData }))
					toast.success(`${task?._id ? t("TaskUpdated") + res.message : t("TaskCreated") + res.message}`)

				});



			setTimeout(() => {
				setOpen(false)
			}, 500)
		}
		catch (err) {
			toast.error(`Error while ${task?._id ? "updating" : "creating"} task: ` + err)
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
			uploadTask.on("state_changed", () => {
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
				{task ? t("UpdateTask") : t("AddTask")}
			</Dialog.Title>

			<div className="mt-2 flex flex-col gap-6">
				<Textbox
					placeholder={task?.title}
					type="text"
					name="title"
					label={t("Title")}
					className="w-full rounded"
					register={register("title", { required: task ? false : `${t("Title")} ${t("IsRequired")}` })}
					error={errors.title ? errors.title.message : ""}
				/>

				<TeamList
					setTeam={setTeam}
					// @ts-ignore
					team={team}
				/>

				<div className="flex gap-4">
					<SelectList
						label={t("TaskStage")}
						lists={LISTS}
						selected={stage}
						setSelected={setStage}
					/>

					<div className="w-full">
						<Textbox
							type="date"
							name="date"
							label={t("Date")}
							className="w-full rounded"
							register={register("date", { required: task ? false : `${t("Date")} ${t("IsRequired")}` })}
							error={errors.date ? errors.date.message : ""}
						/>
					</div>
				</div>

				<div className='flex gap-4'>

					<SelectList
						label={t('PriorityLevel')}
						lists={translatedData(PRIORITY, t)}
						selected={translatedData(priority, t)}
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
							<span>{t("AddAssets")}</span>
						</label>
					</div>
				</div>

				<div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
					{uploading ? (
						<span className='text-sm py-2 text-red-500'>
							{t("UploadingAssets")}
						</span>
					) : (
						<Button
							label={t('Submit')}
							type='submit'
							className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
						/>
					)}

					<Button
						type='button'
						className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
						onClick={() => setOpen(false)}
						label={t('Cancel')}
					/>
				</div>

			</div>
		</form>
	</ModalWrapper>
}