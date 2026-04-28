import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	Space,
	Tag,
	Typography,
	Popconfirm,
	message,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TableStaticData from '@/components/Table/TableStaticData';
import moment from 'moment';

const { RangePicker } = DatePicker;

const NhatKyTapLuyen = () => {
	const [data, setData] = useState([
		{
			id: 1,
			date: '2024-04-28',
			type: 'Cardio',
			duration: 30,
			calories: 300,
			notes: 'Chạy bộ buổi sáng',
			status: 'Hoàn thành',
		},
		{
			id: 2,
			date: '2024-04-27',
			type: 'Sức mạnh',
			duration: 45,
			calories: 200,
			notes: 'Tập tạ tay',
			status: 'Hoàn thành',
		},
		{
			id: 3,
			date: '2024-04-26',
			type: 'Yoga',
			duration: 60,
			calories: 150,
			notes: 'Tập yoga tại nhà',
			status: 'Bỏ lỡ',
		},
		{
			id: 4,
			date: '2024-04-25',
			type: 'HIIT',
			duration: 20,
			calories: 250,
			notes: 'Bài tập cường độ cao',
			status: 'Hoàn thành',
		},
	]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingRecord, setEditingRecord] = useState<any>(null);
	const [form] = Form.useForm();

	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'date',
			key: 'date',
			width: 120,
			sortable: true,
		},
		{
			title: 'Loại bài tập',
			dataIndex: 'type',
			key: 'type',
			width: 120,
			filterType: 'select',
			filterData: ['Cardio', 'Sức mạnh', 'Yoga', 'HIIT', 'Khác'],
		},
		{
			title: 'Thời lượng (phút)',
			dataIndex: 'duration',
			key: 'duration',
			width: 150,
			render: (val: number) => `${val} phút`,
		},
		{
			title: 'Calo đốt',
			dataIndex: 'calories',
			key: 'calories',
			width: 120,
			render: (val: number) => `${val} kcal`,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'notes',
			key: 'notes',
			filterType: 'string',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			width: 120,
			render: (status: string) => <Tag color={status === 'Hoàn thành' ? 'green' : 'volcano'}>{status}</Tag>,
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
		message.success('Đã xóa buổi tập');
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
				message.success('Đã cập nhật buổi tập');
			} else {
				const newItem = {
					...formattedValues,
					id: Date.now(),
				};
				setData([newItem, ...data]);
				message.success('Đã thêm buổi tập mới');
			}
			setIsModalVisible(false);
		});
	};

	return (
		<div style={{ padding: '24px' }}>
			<Typography.Title level={3}>Nhật ký tập luyện</Typography.Title>

			<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Space>
					<RangePicker />
					<Button type='primary' onClick={handleAdd}>
						Thêm buổi tập
					</Button>
				</Space>
			</div>

			<TableStaticData data={data} columns={columns} hasTotal addStt />

			<Modal
				title={editingRecord ? 'Sửa buổi tập' : 'Thêm buổi tập mới'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={() => setIsModalVisible(false)}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='date' label='Ngày tập' rules={[{ required: true }]}>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='type' label='Loại bài tập' rules={[{ required: true }]}>
						<Select>
							<Select.Option value='Cardio'>Cardio</Select.Option>
							<Select.Option value='Sức mạnh'>Sức mạnh</Select.Option>
							<Select.Option value='Yoga'>Yoga</Select.Option>
							<Select.Option value='HIIT'>HIIT</Select.Option>
							<Select.Option value='Khác'>Khác</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name='duration' label='Thời lượng (phút)' rules={[{ required: true }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='calories' label='Calo đốt' rules={[{ required: true }]}>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='notes' label='Ghi chú'>
						<Input.TextArea rows={3} />
					</Form.Item>
					<Form.Item name='status' label='Trạng thái' rules={[{ required: true }]}>
						<Select>
							<Select.Option value='Hoàn thành'>Hoàn thành</Select.Option>
							<Select.Option value='Bỏ lỡ'>Bỏ lỡ</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default NhatKyTapLuyen;
