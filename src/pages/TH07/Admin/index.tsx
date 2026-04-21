import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Tag, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default () => {
	const [data, setData] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();

	const save = (values: any) => {
		if (values.id) {
			setData(data.map((i) => (i.id === values.id ? values : i)));
		} else {
			setData([...data, { ...values, id: Date.now().toString() }]);
		}
		setOpen(false);
		message.success('Thanh cong');
	};

	const columns = [
		{ title: 'Tieu de', dataIndex: 'tieuDe' },
		{
			title: 'Trang thai',
			dataIndex: 'trangThai',
			render: (t: string) => <Tag color='pink'>{t}</Tag>,
		},
		{
			render: (r: any) => (
				<Space>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							form.setFieldsValue(r);
							setOpen(true);
						}}
					/>
					<Popconfirm onConfirm={() => setData(data.filter((i) => i.id !== r.id))}>
						<Button danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 30 }}>
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={() => {
					form.resetFields();
					setOpen(true);
				}}
			>
				Them
			</Button>

			<Table dataSource={data} columns={columns} rowKey='id' />

			<Modal open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
				<Form form={form} onFinish={save}>
					<Form.Item name='tieuDe' label='Tieu de'>
						<Input />
					</Form.Item>
					<Form.Item name='trangThai' label='Trang thai'>
						<Select>
							<Select.Option value='Da dang'>Da dang</Select.Option>
							<Select.Option value='Nhap'>Nhap</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};
