import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Tag, Typography, Popconfirm, message } from 'antd';
import {
	PlusOutlined,
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
	EyeOutlined,
	FireOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const ThuVienBaiTap = () => {
	const [exercises, setExercises] = useState([
		{
			id: 1,
			name: 'Hít đất (Push Up)',
			muscle: 'Ngực',
			difficulty: 'Dễ',
			shortDesc: 'Bài tập hít đất cơ bản giúp phát triển cơ ngực.',
			fullDesc:
				'1. Đặt hai tay xuống sàn, rộng hơn vai một chút.\n2. Giữ thân người thẳng từ đầu đến gót chân.\n3. Hạ người xuống cho đến khi ngực gần chạm sàn.\n4. Đẩy người trở lại vị trí ban đầu.',
			calories: 300,
		},
		{
			id: 2,
			name: 'Squat',
			muscle: 'Chân',
			difficulty: 'Trung bình',
			shortDesc: 'Bài tập đứng lên ngồi xuống cho đôi chân khỏe mạnh.',
			fullDesc:
				'1. Đứng thẳng, hai chân rộng bằng vai.\n2. Hạ hông xuống như đang ngồi vào một chiếc ghế.\n3. Giữ lưng thẳng và mắt nhìn về phía trước.\n4. Đẩy người đứng dậy bằng lực gót chân.',
			calories: 400,
		},
		{
			id: 3,
			name: 'Nâng tạ (Deadlift)',
			muscle: 'Lưng',
			difficulty: 'Khó',
			shortDesc: 'Bài tập nâng tạ giúp phát triển toàn bộ vùng lưng.',
			fullDesc:
				'1. Đứng trước tạ đòn, hai chân rộng bằng vai.\n2. Cúi người nắm lấy tạ, giữ lưng thẳng.\n3. Dùng lực chân và lưng để kéo tạ lên đến khi đứng thẳng.\n4. Hạ tạ xuống một cách có kiểm soát.',
			calories: 600,
		},
		{
			id: 4,
			name: 'Plank',
			muscle: 'Bụng',
			difficulty: 'Dễ',
			shortDesc: 'Bài tập giữ người giúp săn chắc cơ bụng.',
			fullDesc:
				'1. Tựa người trên hai khuỷu tay và mũi chân.\n2. Giữ cơ thể nằm trên một đường thẳng.\n3. Siết chặt cơ bụng và giữ tư thế lâu nhất có thể.',
			calories: 200,
		},
	]);

	const [searchText, setSearchText] = useState('');
	const [filterMuscle, setFilterMuscle] = useState('Tất cả');
	const [filterDifficulty, setFilterDifficulty] = useState('Tất cả');

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isDetailVisible, setIsDetailVisible] = useState(false);
	const [currentExercise, setCurrentExercise] = useState<any>(null);
	const [form] = Form.useForm();

	const muscleGroups = ['Ngực', 'Lưng', 'Chân', 'Vai', 'Tay', 'Bụng', 'Toàn thân'];
	const difficultyLevels = ['Dễ', 'Trung bình', 'Khó'];

	const getDifficultyColor = (level: string) => {
		switch (level) {
			case 'Dễ':
				return 'green';
			case 'Trung bình':
				return 'blue';
			case 'Khó':
				return 'red';
			default:
				return 'default';
		}
	};

	const handleAdd = () => {
		setCurrentExercise(null);
		form.resetFields();
		setIsModalVisible(true);
	};

	const handleEdit = (exercise: any) => {
		setCurrentExercise(exercise);
		form.setFieldsValue(exercise);
		setIsModalVisible(true);
	};

	const handleViewDetail = (exercise: any) => {
		setCurrentExercise(exercise);
		setIsDetailVisible(true);
	};

	const handleDelete = (id: number) => {
		setExercises(exercises.filter((ex) => ex.id !== id));
		message.success('Đã xóa bài tập');
	};

	const handleSave = () => {
		form.validateFields().then((values) => {
			if (currentExercise) {
				setExercises(exercises.map((ex) => (ex.id === currentExercise.id ? { ...ex, ...values } : ex)));
				message.success('Đã cập nhật bài tập');
			} else {
				const newEx = {
					...values,
					id: Date.now(),
				};
				setExercises([...exercises, newEx]);
				message.success('Đã thêm bài tập mới');
			}
			setIsModalVisible(false);
		});
	};

	const filteredExercises = exercises.filter((ex) => {
		const matchesSearch = ex.name.toLowerCase().includes(searchText.toLowerCase());
		const matchesMuscle = filterMuscle === 'Tất cả' || ex.muscle === filterMuscle;
		const matchesDifficulty = filterDifficulty === 'Tất cả' || ex.difficulty === filterDifficulty;
		return matchesSearch && matchesMuscle && matchesDifficulty;
	});

	return (
		<div style={{ padding: '24px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
				<Title level={3}>Thư viện bài tập</Title>
				<Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
					Thêm bài tập
				</Button>
			</div>

			<Card style={{ marginBottom: 24 }}>
				<Row gutter={[16, 16]} align='middle'>
					<Col xs={24} md={8}>
						<Input
							placeholder='Tìm kiếm theo tên...'
							prefix={<SearchOutlined />}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							allowClear
						/>
					</Col>
					<Col xs={12} md={8}>
						<Select style={{ width: '100%' }} placeholder='Nhóm cơ' onChange={setFilterMuscle} value={filterMuscle}>
							<Option value='Tất cả'>Tất cả nhóm cơ</Option>
							{muscleGroups.map((m) => (
								<Option key={m} value={m}>
									{m}
								</Option>
							))}
						</Select>
					</Col>
					<Col xs={12} md={8}>
						<Select
							style={{ width: '100%' }}
							placeholder='Mức độ'
							onChange={setFilterDifficulty}
							value={filterDifficulty}
						>
							<Option value='Tất cả'>Tất cả mức độ</Option>
							{difficultyLevels.map((d) => (
								<Option key={d} value={d}>
									{d}
								</Option>
							))}
						</Select>
					</Col>
				</Row>
			</Card>

			<Row gutter={[16, 16]}>
				{filteredExercises.map((ex) => (
					<Col xs={24} sm={12} lg={8} key={ex.id}>
						<Card
							hoverable
							actions={[
								<EyeOutlined key='view' onClick={() => handleViewDetail(ex)} />,
								<EditOutlined key='edit' onClick={() => handleEdit(ex)} />,
								<Popconfirm key='delete' title='Xóa bài tập này?' onConfirm={() => handleDelete(ex.id)}>
									<DeleteOutlined style={{ color: '#ff4d4f' }} />
								</Popconfirm>,
							]}
						>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
								<Title level={4} style={{ margin: 0 }}>
									{ex.name}
								</Title>
								<Tag color={getDifficultyColor(ex.difficulty)}>{ex.difficulty}</Tag>
							</div>
							<div style={{ margin: '12px 0' }}>
								<Tag color='cyan'>{ex.muscle}</Tag>
								<Text type='secondary'>
									<FireOutlined /> {ex.calories} kcal/h
								</Text>
							</div>
							<Paragraph ellipsis={{ rows: 2 }}>{ex.shortDesc}</Paragraph>
						</Card>
					</Col>
				))}
			</Row>

			{/* Modal Add/Edit */}
			<Modal
				title={currentExercise ? 'Sửa bài tập' : 'Thêm bài tập mới'}
				visible={isModalVisible}
				onOk={handleSave}
				onCancel={() => setIsModalVisible(false)}
				width={600}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='name' label='Tên bài tập' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='muscle' label='Nhóm cơ' rules={[{ required: true }]}>
								<Select>
									{muscleGroups.map((m) => (
										<Option key={m} value={m}>
											{m}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='difficulty' label='Mức độ khó' rules={[{ required: true }]}>
								<Select>
									{difficultyLevels.map((d) => (
										<Option key={d} value={d}>
											{d}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name='calories' label='Calo đốt trung bình/giờ' rules={[{ required: true }]}>
						<Input type='number' suffix='kcal/h' />
					</Form.Item>
					<Form.Item name='shortDesc' label='Mô tả ngắn' rules={[{ required: true }]}>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item name='fullDesc' label='Hướng dẫn chi tiết' rules={[{ required: true }]}>
						<Input.TextArea rows={5} />
					</Form.Item>
				</Form>
			</Modal>

			{/* Modal Detail */}
			<Modal
				title='Chi tiết bài tập'
				visible={isDetailVisible}
				footer={[
					<Button key='close' type='primary' onClick={() => setIsDetailVisible(false)}>
						Đóng
					</Button>,
				]}
				onCancel={() => setIsDetailVisible(false)}
				width={600}
			>
				{currentExercise && (
					<>
						<Title level={2}>{currentExercise.name}</Title>
						<Space style={{ marginBottom: 16 }}>
							<Tag color={getDifficultyColor(currentExercise.difficulty)}>{currentExercise.difficulty}</Tag>
							<Tag color='cyan'>{currentExercise.muscle}</Tag>
							<Tag color='volcano'>
								<FireOutlined /> {currentExercise.calories} kcal/h
							</Tag>
						</Space>
						<Title level={4}>Mô tả</Title>
						<Paragraph>{currentExercise.shortDesc}</Paragraph>
						<Title level={4}>Hướng dẫn thực hiện</Title>
						<Paragraph style={{ whiteSpace: 'pre-wrap' }}>{currentExercise.fullDesc}</Paragraph>
					</>
				)}
			</Modal>
		</div>
	);
};

export default ThuVienBaiTap;
