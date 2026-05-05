import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { useModel } from 'umi';
import dayjs from 'dayjs';

const FormTask = () => {
	const { isModalVisible, setModalVisible, editingTask, setEditingTask, addTask, updateTask } = useModel('th09') as any;
	const [form] = Form.useForm();

	useEffect(() => {
		if (isModalVisible) {
			if (editingTask) form.setFieldsValue({ ...editingTask, deadline: dayjs(editingTask.deadline) });
			else {
				form.resetFields();
				form.setFieldsValue({ status: 'todo', priority: 'medium' });
			}
		}
	}, [isModalVisible]);

	const handleOk = () => {
		form.validateFields().then((values) => {
			const task = {
				...values,
				id: editingTask ? editingTask.id : Date.now().toString(),
				deadline: values.deadline.toISOString(),
			};
			if (editingTask) updateTask(task);
			else addTask(task);
			setModalVisible(false);
			setEditingTask(null);
		});
	};

	return (
		<Modal
			title={editingTask ? 'Sửa Task' : 'Thêm Task'}
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={() => setModalVisible(false)}
			destroyOnClose
		>
			<Form form={form} layout='vertical'>
				<Form.Item name='title' label='Tên công việc' rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name='deadline' label='Hạn chót' rules={[{ required: true }]}>
					<DatePicker showTime style={{ width: '100%' }} />
				</Form.Item>
				<Form.Item name='priority' label='Ưu tiên'>
					<Select>
						<Select.Option value='high'>Cao</Select.Option>
						<Select.Option value='medium'>Trung bình</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name='status' label='Trạng thái'>
					<Select>
						<Select.Option value='todo'>Cần làm</Select.Option>
						<Select.Option value='in-progress'>Đang làm</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormTask;
