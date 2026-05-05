import { useState, useEffect } from 'react';

const DUMMY_DATA = [
	{
		id: '1',
		title: 'Học từ vựng HSK 1',
		description: 'Ôn tập 150 từ vựng cơ bản và ngữ pháp theo lộ trình Mon/Wed/Fri',
		deadline: new Date().toISOString(),
		priority: 'high',
		tags: ['Chinese'],
		status: 'in-progress',
	},
	{
		id: '2',
		title: 'Test hệ thống Geminigen AI',
		description: 'QA lỗi Frontend và kiểm tra hiệu năng tạo ảnh 4k',
		deadline: new Date().toISOString(),
		priority: 'high',
		tags: ['QA', 'Frontend'],
		status: 'todo',
	},
	{
		id: '3',
		title: 'Trả lời Slack cho Hiếu/Thêu',
		description: 'Cập nhật tiến độ dự án TH09 và nhận feedback',
		priority: 'medium',
		tags: ['Teamwork'],
		status: 'todo',
		deadline: new Date().toISOString(),
	},
	{
		id: '4',
		title: 'Duy trì 2h làm việc online',
		description: 'Xử lý các task tồn đọng hàng ngày',
		priority: 'medium',
		tags: ['Job'],
		status: 'todo',
		deadline: new Date().toISOString(),
	},
];

export default () => {
	const [tasks, setTasks] = useState(() => {
		const saved = localStorage.getItem('th09_tasks');

		const parsed = saved ? JSON.parse(saved) : [];
		return parsed.length > 1 ? parsed : DUMMY_DATA;
	});

	const [isModalVisible, setModalVisible] = useState(false);
	const [editingTask, setEditingTask] = useState(null);

	useEffect(() => {
		localStorage.setItem('th09_tasks', JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (task: any) => setTasks((prev: any) => [task, ...prev]);
	const updateTask = (updatedTask: any) =>
		setTasks((prev: any) => prev.map((t: any) => (t.id === updatedTask.id ? updatedTask : t)));
	const deleteTask = (id: string) => setTasks((prev: any) => prev.filter((t: any) => t.id !== id));

	const updateTaskStatus = (id: string, status: string) => {
		setTasks((prev: any) => prev.map((t: any) => (t.id === id ? { ...t, status } : t)));
	};

	return {
		tasks,
		addTask,
		updateTask,
		deleteTask,
		updateTaskStatus,
		isModalVisible,
		setModalVisible,
		editingTask,
		setEditingTask,
	};
};
