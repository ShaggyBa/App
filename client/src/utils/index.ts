import { TPriority, TStage } from "types/task.types";

export const formatDate = (date: Date) => {
	// Get the month, day, and year
	const month = date.toLocaleString("ru-RU", { month: "short" });
	const day = date.getDate();
	const year = date.getFullYear();

	const formattedDate = `${day}-${month}-${year}`;

	return formattedDate;
};

export function dateFormatter(dateString: string | date) {
	const inputDate: Date = new Date(dateString);

	if (!(inputDate)) {
		return "Некорректная дата";
	}

	const year = inputDate.getFullYear();
	const month = String(inputDate.getMonth() + 1).padStart(2, "0");
	const day = String(inputDate.getDate()).padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

export function getInitials(fullName: string) {
	const names = fullName.trim().split(" ");

	if (names.length === 1) return names[0][0].toUpperCase();

	const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

	const initialsStr = initials.join("");

	return initialsStr;
}

export const PRIORITY_STYLES: TPriority = {
	high: "text-red-600",
	medium: "text-yellow-600",
	low: "text-blue-600",
};

export const TASK_TYPE: TStage = {
	todo: "bg-blue-600",
	"in progress": "bg-yellow-600",
	completed: "bg-green-600",
};

export const BGS = [
	"bg-blue-600",
	"bg-yellow-600",
	"bg-red-600",
	"bg-green-600",
];