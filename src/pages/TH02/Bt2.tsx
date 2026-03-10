import React, { useState } from 'react';
import {
	Layout,
	Tabs,
	Table,
	Button,
	Modal,
	Form,
	Input,
	Select,
	InputNumber,
	Tag,
	Space,
	notification,
	Card,
} from 'antd';

import {
	BookOutlined,
	AppstoreOutlined,
	QuestionCircleOutlined,
	FileTextOutlined,
	DeleteOutlined,
	PlusOutlined,
} from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;

// --- Types ---
type Khoi = {
	id: string;
	name: string;
};

type MonHoc = {
	id: string;
	name: string;
	credit: number;
};

type CauHoi = {
	id: string;
	subject: string;
	content: string;
	level: string;
	khoi: string;
};

export default function QuestionBank() {
	// --- States ---
	const [khoiList, setKhoiList] = useState<Khoi[]>([]);
	const [monList, setMonList] = useState<MonHoc[]>([]);
	const [questionList, setQuestionList] = useState<CauHoi[]>([]);
	const [examQuestions, setExamQuestions] = useState<CauHoi[]>([]);

	const [searchSubject, setSearchSubject] = useState<string>();
	const [filterLevel, setFilterLevel] = useState<string>();
	const [filterKhoi, setFilterKhoi] = useState<string>();

	const [khoiModal, setKhoiModal] = useState(false);
	const [monModal, setMonModal] = useState(false);
	const [questionModal, setQuestionModal] = useState(false);
	const [examModal, setExamModal] = useState(false);

	// Mỗi modal nên có instance form riêng để tránh xung đột dữ liệu
	const [formKhoi] = Form.useForm();
	const [formMon] = Form.useForm();
	const [formQuestion] = Form.useForm();
	const [formExam] = Form.useForm();

	// --- Helpers ---
	const difficultyColor = (level: string) => {
		switch (level) {
			case 'Dễ':
				return 'green';
			case 'Trung bình':
				return 'blue';
			case 'Khó':
				return 'orange';
			case 'Rất khó':
				return 'red';
			default:
				return 'default';
		}
	};

	const filteredQuestions = questionList.filter((q) => {
		return (
			(!searchSubject || q.subject === searchSubject) &&
			(!filterLevel || q.level === filterLevel) &&
			(!filterKhoi || q.khoi === filterKhoi)
		);
	});

	const generateExam = (values: any) => {
		const filtered = questionList.filter(
			(q) => q.subject === values.subject && q.khoi === values.khoi && q.level === values.level,
		);

		if (filtered.length < values.amount) {
			notification.error({ message: 'Không đủ câu hỏi trong ngân hàng!' });
			return;
		}

		const shuffled = [...filtered].sort(() => 0.5 - Math.random());
		setExamQuestions(shuffled.slice(0, values.amount));
		notification.success({ message: 'Đã tạo đề thi thành công' });
		setExamModal(false);
		formExam.resetFields();
	};

	return (
		<Layout style={{ minHeight: '100vh', padding: '24px', background: '#f0f2f5' }}>
			<Content>
				<Card bordered={false} className='main-card'>
					<Tabs defaultActiveKey='1' animated={false}>
						{/* TAB 1: KHỐI KIẾN THỨC */}
						<Tabs.TabPane
							tab={
								<span>
									<AppstoreOutlined /> Khối kiến thức
								</span>
							}
							key='1'
						>
							<Button type='primary' icon={<PlusOutlined />} onClick={() => setKhoiModal(true)}>
								Thêm khối
							</Button>
							<Table
								style={{ marginTop: 20 }}
								dataSource={khoiList}
								rowKey='id'
								columns={[
									{ title: 'Mã khối', dataIndex: 'id', key: 'id' },
									{ title: 'Tên khối', dataIndex: 'name', key: 'name' },
									{
										title: 'Thao tác',
										key: 'action',
										render: (_, record) => (
											<Button
												danger
												type='text'
												icon={<DeleteOutlined />}
												onClick={() => setKhoiList(khoiList.filter((k) => k.id !== record.id))}
											/>
										),
									},
								]}
							/>
						</Tabs.TabPane>

						{/* TAB 2: MÔN HỌC */}
						<Tabs.TabPane
							tab={
								<span>
									<BookOutlined /> Môn học
								</span>
							}
							key='2'
						>
							<Button type='primary' icon={<PlusOutlined />} onClick={() => setMonModal(true)}>
								Thêm môn học
							</Button>
							<Table
								style={{ marginTop: 20 }}
								dataSource={monList}
								rowKey='id'
								columns={[
									{ title: 'Mã môn', dataIndex: 'id', key: 'id' },
									{ title: 'Tên môn', dataIndex: 'name', key: 'name' },
									{ title: 'Số tín chỉ', dataIndex: 'credit', key: 'credit' },
									{
										title: 'Thao tác',
										key: 'action',
										render: (_, record) => (
											<Button
												danger
												type='text'
												icon={<DeleteOutlined />}
												onClick={() => setMonList(monList.filter((m) => m.id !== record.id))}
											/>
										),
									},
								]}
							/>
						</Tabs.TabPane>

						{/* TAB 3: CÂU HỎI */}
						<Tabs.TabPane
							tab={
								<span>
									<QuestionCircleOutlined /> Ngân hàng câu hỏi
								</span>
							}
							key='3'
						>
							<Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
								<Select placeholder='Lọc Môn học' allowClear style={{ width: 160 }} onChange={setSearchSubject}>
									{monList.map((m) => (
										<Option key={m.id} value={m.id}>
											{m.name}
										</Option>
									))}
								</Select>
								<Select placeholder='Lọc Độ khó' allowClear style={{ width: 140 }} onChange={setFilterLevel}>
									<Option value='Dễ'>Dễ</Option>
									<Option value='Trung bình'>Trung bình</Option>
									<Option value='Khó'>Khó</Option>
									<Option value='Rất khó'>Rất khó</Option>
								</Select>
								<Select placeholder='Lọc Khối' allowClear style={{ width: 160 }} onChange={setFilterKhoi}>
									{khoiList.map((k) => (
										<Option key={k.id} value={k.id}>
											{k.name}
										</Option>
									))}
								</Select>
								<Button type='primary' icon={<PlusOutlined />} onClick={() => setQuestionModal(true)}>
									Thêm câu hỏi
								</Button>
							</Space>

							<Table
								dataSource={filteredQuestions}
								rowKey='id'
								columns={[
									{ title: 'Mã', dataIndex: 'id', key: 'id' },
									{ title: 'Nội dung', dataIndex: 'content', key: 'content', ellipsis: true },
									{
										title: 'Độ khó',
										key: 'level',
										render: (_, r) => <Tag color={difficultyColor(r.level)}>{r.level}</Tag>,
									},
									{
										title: 'Xóa',
										key: 'delete',
										render: (_, r) => (
											<Button
												danger
												type='text'
												icon={<DeleteOutlined />}
												onClick={() => setQuestionList(questionList.filter((q) => q.id !== r.id))}
											/>
										),
									},
								]}
							/>
						</Tabs.TabPane>

						{/* TAB 4: ĐỀ THI */}
						<Tabs.TabPane
							tab={
								<span>
									<FileTextOutlined /> Tạo đề thi
								</span>
							}
							key='4'
						>
							<Button type='primary' icon={<PlusOutlined />} onClick={() => setExamModal(true)}>
								Cấu hình tạo đề
							</Button>
							<Table
								style={{ marginTop: 20 }}
								dataSource={examQuestions}
								rowKey='id'
								columns={[
									{ title: 'STT', render: (_1, _2, index) => index + 1, width: 60 },
									{ title: 'Mã câu hỏi', dataIndex: 'id' },
									{ title: 'Nội dung', dataIndex: 'content' },
									{ title: 'Độ khó', dataIndex: 'level', render: (l) => <Tag color={difficultyColor(l)}>{l}</Tag> },
								]}
							/>
						</Tabs.TabPane>
					</Tabs>
				</Card>

				{/* --- MODALS (CHUẨN v4 DÙNG visible) --- */}

				<Modal
					visible={khoiModal}
					title='Thêm khối kiến thức'
					onCancel={() => {
						setKhoiModal(false);
						formKhoi.resetFields();
					}}
					onOk={() => {
						formKhoi.validateFields().then((v) => {
							setKhoiList([...khoiList, v]);
							notification.success({ message: 'Thêm khối thành công' });
							formKhoi.resetFields();
							setKhoiModal(false);
						});
					}}
					destroyOnClose
				>
					<Form form={formKhoi} layout='vertical'>
						<Form.Item name='id' label='Mã khối' rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}>
							<Input placeholder='Ví dụ: K01' />
						</Form.Item>
						<Form.Item name='name' label='Tên khối' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
							<Input placeholder='Ví dụ: Kiến thức cơ sở' />
						</Form.Item>
					</Form>
				</Modal>

				<Modal
					visible={monModal}
					title='Thêm môn học'
					onCancel={() => {
						setMonModal(false);
						formMon.resetFields();
					}}
					onOk={() => {
						formMon.validateFields().then((v) => {
							setMonList([...monList, v]);
							notification.success({ message: 'Thêm môn thành công' });
							formMon.resetFields();
							setMonModal(false);
						});
					}}
					destroyOnClose
				>
					<Form form={formMon} layout='vertical'>
						<Form.Item name='id' label='Mã môn' rules={[{ required: true }]}>
							<Input placeholder='Ví dụ: IT101' />
						</Form.Item>
						<Form.Item name='name' label='Tên môn' rules={[{ required: true }]}>
							<Input placeholder='Ví dụ: Lập trình React' />
						</Form.Item>
						<Form.Item name='credit' label='Số tín chỉ' rules={[{ required: true }]}>
							<InputNumber style={{ width: '100%' }} min={1} />
						</Form.Item>
					</Form>
				</Modal>

				<Modal
					visible={questionModal}
					title='Thêm câu hỏi mới'
					onCancel={() => {
						setQuestionModal(false);
						formQuestion.resetFields();
					}}
					onOk={() => {
						formQuestion.validateFields().then((v) => {
							setQuestionList([...questionList, v]);
							notification.success({ message: 'Lưu câu hỏi thành công' });
							formQuestion.resetFields();
							setQuestionModal(false);
						});
					}}
					destroyOnClose
				>
					<Form form={formQuestion} layout='vertical'>
						<Form.Item name='id' label='Mã câu hỏi' rules={[{ required: true }]}>
							<Input />
						</Form.Item>
						<Form.Item name='subject' label='Môn học' rules={[{ required: true }]}>
							<Select placeholder='Chọn môn'>
								{monList.map((m) => (
									<Option key={m.id} value={m.id}>
										{m.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='khoi' label='Khối kiến thức' rules={[{ required: true }]}>
							<Select placeholder='Chọn khối'>
								{khoiList.map((k) => (
									<Option key={k.id} value={k.id}>
										{k.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='content' label='Nội dung câu hỏi' rules={[{ required: true }]}>
							<Input.TextArea rows={3} />
						</Form.Item>
						<Form.Item name='level' label='Độ khó' rules={[{ required: true }]}>
							<Select>
								<Option value='Dễ'>Dễ</Option>
								<Option value='Trung bình'>Trung bình</Option>
								<Option value='Khó'>Khó</Option>
								<Option value='Rất khó'>Rất khó</Option>
							</Select>
						</Form.Item>
					</Form>
				</Modal>

				<Modal
					visible={examModal}
					title='Cấu hình đề thi tự động'
					onCancel={() => {
						setExamModal(false);
						formExam.resetFields();
					}}
					onOk={() => {
						formExam.validateFields().then(generateExam);
					}}
					destroyOnClose
				>
					<Form form={formExam} layout='vertical'>
						<Form.Item name='subject' label='Môn học' rules={[{ required: true }]}>
							<Select>
								{monList.map((m) => (
									<Option key={m.id} value={m.id}>
										{m.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='khoi' label='Khối kiến thức' rules={[{ required: true }]}>
							<Select>
								{khoiList.map((k) => (
									<Option key={k.id} value={k.id}>
										{k.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='level' label='Độ khó' rules={[{ required: true }]}>
							<Select>
								<Option value='Dễ'>Dễ</Option>
								<Option value='Trung bình'>Trung bình</Option>
								<Option value='Khó'>Khó</Option>
								<Option value='Rất khó'>Rất khó</Option>
							</Select>
						</Form.Item>
						<Form.Item name='amount' label='Số lượng câu' rules={[{ required: true }]}>
							<InputNumber style={{ width: '100%' }} min={1} />
						</Form.Item>
					</Form>
				</Modal>
			</Content>
		</Layout>
	);
}
