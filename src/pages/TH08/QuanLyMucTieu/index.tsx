import {
	Button,
	Card,
	Col,
	Drawer,
	Form,
	Input,
	InputNumber,
	Progress,
	Row,
	Segmented,
	Select,
	Space,
	Tag,
	Typography,
	Popconfirm,
	message,
	DatePicker,
} from 'antd';
import {
	PlusOutlined,
	DeleteOutlined,
	CheckCircleOutlined,
	SyncOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';

const { Title, Text } = Typography;

const QuanLyMucTieu = () => {
	const [goals, setGoals] = useState([
		{
			id: 1,
			name: 'Giảm cân đón Tết',
			type: 'Giảm cân',
			target: 65,
			current: 68.5,
			unit: 'kg',
			deadline: '2024-12-31',
			status: 'Đang thực hiện',
		},
		{
			id: 2,
			name: 'Chạy bộ 5km',
			type: 'Cải thiện sức bền',
			target: 5,
			current: 5,
			unit: 'km',
			deadline: '2024-05-15',
			status: 'Đã đạt',
		},
		{
			id: 3,
			name: 'Tăng cơ tay',
			type: 'Tăng cơ',
			target: 35,
			current: 32,
			unit: 'cm',
			deadline: '2024-06-30',
			status: 'Đang thực hiện',
		},
	]);

	const [filterStatus, setFilterStatus] = useState<string>('Tất cả');
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [form] = Form.useForm();

	const handleAddGoal = () => {
		form.resetFields();
		setIsDrawerVisible(true);
	};

	const onFinish = (values: any) => {
		const newGoal = {
			...values,
			id: Date.now(),
			deadline: values.deadline.format('YYYY-MM-DD'),
			status: 'Đang thực hiện',
		};
		setGoals([...goals, newGoal]);
		setIsDrawerVisible(false);
		message.success('Đã thêm mục tiêu mới');
	};

	const handleDelete = (id: number) => {
		setGoals(goals.filter((g) => g.id !== id));
		message.success('Đã xóa mục tiêu');
	};

	const updateCurrentValue = (id: number, value: number | null) => {
		if (value === null) return;
		setGoals(
			goals.map((g) => {
				if (g.id === id) {
					const status = value >= g.target ? 'Đã đạt' : g.status;
					return { ...g, current: value, status };
				}
				return g;
			}),
		);
	};

	const filteredGoals = goals.filter((g) => filterStatus === 'Tất cả' || g.status === filterStatus);

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Đã đạt':
				return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
			case 'Đã hủy':
				return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
			default:
				return <SyncOutlined spin style={{ color: '#1890ff' }} />;
		}
	};

	const calculateProgress = (goal: any) => {
		if (goal.type === 'Giảm cân') {
			// Special logic for weight loss: progress is higher as current gets closer to target from above
			// This is a bit complex for a mock, let's keep it simple:
			const progress = Math.round((goal.current / goal.target) * 100);
			return progress > 100 ? 100 : progress; // simplified
		}
		const progress = Math.round((goal.current / goal.target) * 100);
		return progress > 100 ? 100 : progress;
	};

	return (
		<div style={{ padding: '24px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
				<Title level={3}>Quản lý mục tiêu</Title>
				<Button type='primary' icon={<PlusOutlined />} onClick={handleAddGoal}>
					Thêm mục tiêu
				</Button>
			</div>

			<div style={{ marginBottom: 24 }}>
				<Segmented
					options={['Tất cả', 'Đang thực hiện', 'Đã đạt', 'Đã hủy']}
					value={filterStatus}
					onChange={(value) => setFilterStatus(value as string)}
				/>
			</div>

			<Row gutter={[16, 16]}>
				{filteredGoals.map((goal) => (
					<Col xs={24} sm={12} lg={8} key={goal.id}>
						<Card
							hoverable
							title={goal.name}
							extra={
								<Popconfirm title='Xóa mục tiêu này?' onConfirm={() => handleDelete(goal.id)}>
									<Button type='text' danger icon={<DeleteOutlined />} />
								</Popconfirm>
							}
							actions={[
								<div key='status' style={{ padding: '0 12px', textAlign: 'left' }}>
									{getStatusIcon(goal.status)} <Text strong>{goal.status}</Text>
								</div>,
								<div key='deadline' style={{ padding: '0 12px', textAlign: 'right' }}>
									Hạn chót: <Text type='secondary'>{goal.deadline}</Text>
								</div>,
							]}
						>
							<div style={{ marginBottom: 16 }}>
								<Tag color='blue'>{goal.type}</Tag>
							</div>

							<div style={{ marginBottom: 16 }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
									<Text>
										Tiến độ: {goal.current} / {goal.target} {goal.unit}
									</Text>
									<Text strong>{calculateProgress(goal)}%</Text>
								</div>
								<Progress percent={calculateProgress(goal)} status={goal.status === 'Đã đạt' ? 'success' : 'active'} />
							</div>

							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Text style={{ marginRight: 8 }}>Cập nhật hiện tại:</Text>
								<InputNumber
									min={0}
									value={goal.current}
									onChange={(val) => updateCurrentValue(goal.id, val)}
									style={{ width: '100px' }}
								/>
								<Text style={{ marginLeft: 8 }}>{goal.unit}</Text>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			<Drawer
				title='Thêm mục tiêu mới'
				width={400}
				onClose={() => setIsDrawerVisible(false)}
				visible={isDrawerVisible}
				bodyStyle={{ paddingBottom: 80 }}
				extra={
					<Space>
						<Button onClick={() => setIsDrawerVisible(false)}>Hủy</Button>
						<Button onClick={() => form.submit()} type='primary'>
							Lưu
						</Button>
					</Space>
				}
			>
				<Form form={form} layout='vertical' onFinish={onFinish}>
					<Form.Item name='name' label='Tên mục tiêu' rules={[{ required: true }]}>
						<Input placeholder='Nhập tên mục tiêu' />
					</Form.Item>
					<Form.Item name='type' label='Loại mục tiêu' rules={[{ required: true }]}>
						<Select placeholder='Chọn loại mục tiêu'>
							<Select.Option value='Giảm cân'>Giảm cân</Select.Option>
							<Select.Option value='Tăng cơ'>Tăng cơ</Select.Option>
							<Select.Option value='Cải thiện sức bền'>Cải thiện sức bền</Select.Option>
							<Select.Option value='Khác'>Khác</Select.Option>
						</Select>
					</Form.Item>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='target' label='Giá trị mục tiêu' rules={[{ required: true }]}>
								<InputNumber min={0} style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='current' label='Giá trị hiện tại' rules={[{ required: true }]}>
								<InputNumber min={0} style={{ width: '100%' }} />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name='unit' label='Đơn vị (kg, km, cm, ...)' rules={[{ required: true }]}>
						<Input placeholder='Ví dụ: kg' />
					</Form.Item>
					<Form.Item name='deadline' label='Hạn chót (Deadline)' rules={[{ required: true }]}>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default QuanLyMucTieu;
