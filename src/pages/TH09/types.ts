export type TaskStatus = 'Cần làm' | 'Đang làm' | 'Hoàn thành';
export type TaskPriority = 'Cao' | 'TB' | 'Thấp';

export interface Task {
	id: string;
	title: string;
	description: string;
	deadline: string | Date;
	priority: TaskPriority;
	tags: string[];
	status: TaskStatus;
}
