import { Button, DatePicker, Form, InputNumber, Modal, Space, Tag, Typography, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TableStaticData from '@/components/Table/TableStaticData';
import moment from 'moment';

const ChiSoSucKhoe = () => {
	const [data, setData] = useState([
		{ id: 1, date: '2024-04-28', weight: 70, height: 175, heartRate: 65, sleepHours: 7.5 },
		{ id: 2, date: '2024-04-21', weight: 71, height: 175, heartRate: 68, sleepHours: 6.5 },
		{ id: 3, date: '2024-04-14', weight: 72, height: 175, heartRate: 70, sleepHours: 8.0 },
	]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRecord, setEditingRecord] = useState<any>(null);
	const [form] = Form.useForm();

	const calculateBMI = (weight: number, heightCm: number) => {
		const heightM = heightCm / 100;
		return (weight / (heightM * heightM)).toFixed(1);
	};

	const getBMICategory = (bmi: number) => {
		if (bmi < 18.5) return { label: 'Thiếu cân', color: 'blue' };
		if (bmi >= 18.5 && bmi < 25) return { label: 'Bình thường', color: 'green' };
		if (bmi >= 25 && bmi < 30) return { label: 'Thừa cân', color: 'orange' };
		return { label: 'Béo phì', color: 'red' };
	};

	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'date',
			key: 'date',
			width: 120,
			sortable: true,
		},
		{
			title: 'Cân nặng (kg)',
			dataIndex: 'weight',
			key: 'weight',
			width: 120,
		},
		{
			title: 'Chiều cao (cm)',
			dataIndex: 'height',
			key: 'height',
			width: 120,
		},
		{
			title: 'BMI',
			key: 'bmi',
			width: 150,
			render: (_: any, record: any) => {
				const bmi = parseFloat(calculateBMI(record.weight, record.height));
				const category = getBMICategory(bmi);
				return (
					<Space>
						<span>{bmi}</span>
						<Tag color={category.color}>{category.label}</Tag>
					</Space>
				);
			},
		},
		{
			title: 'Nhịp tim (bpm)',
			dataIndex: 'heartRate',
			key: 'heartRate',
			width: 120,
		},
		{
			title: 'Giờ ngủ',
			dataIndex: 'sleepHours',
			key: 'sleepHours',
			width: 120,
			render: (val: number) => `${val}h`,
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 120,
			align: 'center',
			render: (_: any, record: any) => (
				<Space>
					<Button type='text' icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => handleEdit(record)} />
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa?'
						onConfirm={() => handleDelete(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Button type='text' icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const handleEdit = (record: any) => {
		setEditingRecord(record);
		form.setFieldsValue({
			...record,
			date: moment(record.date),
		});
		setIsModalVisible(true);
	};

	const handleDelete = (id: number) => {
		setData(data.filter((item) => item.id !== id));
		message.success('Đã xóa chỉ số');
	};

	const handleAdd = () => {
		setEditingRecord(null);
		form.resetFields();
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form.validateFields().then((values) => {
			const formattedValues = {
				...values,
				date: values.date.format('YYYY-MM-DD'),
			};

			if (editingRecord) {
				setData(data.map((item) => (item.id === editingRecord.id ? { ...item, ...formattedValues } : item)));
				message.success('Đã cập nhật chỉ số');
			} else {
				const newItem = {
					...formattedValues,
					id: Date.now(),
				};
				setData([newItem, ...data]);
				message.success('Đã thêm chỉ số mới');
			}
			setIsModalVisible(false);
		});
	};

	return (
		<div style={{ padding: '24px' }}>
			<Typography.Title level={3}>Nhật ký chỉ số sức khỏe</Typography.Title>

			<div style={{ marginBottom: 16 }}>
				<Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
					Thêm chỉ số
				</Button>
			</div>

			<TableStaticData data={data} columns={columns} hasTotal addStt />

			<Modal
				title={editingRecord ? 'Sửa chỉ số' : 'Thêm chỉ số mới'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={() => setIsModalVisible(false)}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='date' label='Ngày' rules={[{ required: true }]}>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='weight' label='Cân nặng (kg)' rules={[{ required: true }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='height' label='Chiều cao (cm)' rules={[{ required: true }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='heartRate' label='Nhịp tim lúc nghỉ (bpm)' rules={[{ required: true }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='sleepHours' label='Giờ ngủ' rules={[{ required: true }]}>
						<InputNumber min={0} max={24} step={0.5} style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ChiSoSucKhoe;
