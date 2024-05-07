import { useState } from "react";
import { ITask } from "types/task.types";
import { ListHead } from "./ListHeader";
import { ListRow } from "./ListRow";
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow";


export const ListView = ({ tasks, setSelected }: { tasks: ITask[], setSelected: any }) => {

	const [openDialog, setOpenDialog] = useState(false)

	const deleteHandler = () => { }

	return <>
		<div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
			<div className="overflow-x-auto">
				<table className="w-full">
					<ListHead />
					<tbody>
						{tasks.map((task, index: number) => (
							<ListRow
								setSelected={setSelected}
								setOpenDialog={setOpenDialog}
								key={index}
								task={task}

							/>
						))}
					</tbody>
				</table>
			</div>
		</div>

		<ConfirmationWindow
			open={openDialog}
			setOpen={setOpenDialog}
			onClick={deleteHandler}
		/>

	</>
}