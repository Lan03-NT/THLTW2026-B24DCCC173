import React, { useState } from 'react';
import {
	Card,
	Tabs,
	Typography,
	Form,
	Input,
	Button,
	Table,
	message,
	Select,
	DatePicker,
	Row,
	Col,
	Space,
	Popconfirm,
	Tag,
} from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const TH04 = () => {
	// === 1. DATABASE TẠM THỜI (STATE) ===
	const [books, setBooks] = useState<any[]>([]); // Sổ văn bằng: { id, year, currentNumber }
	const [decisions, setDecisions] = useState<any[]>([]); // Quyết định: { id, bookId, soQD, ngayBanHanh, trichYeu, viewCount }
	const [fieldConfigs, setFieldConfigs] = useState<any[]>([]); // Cấu hình: { id, name, type }
	const [diplomas, setDiplomas] = useState<any[]>([]); // Văn bằng
	const [searchResult, setSearchResult] = useState<any[]>([]);

	// Forms
	const [formBook] = Form.useForm();
	const [formDecision] = Form.useForm();
	const [formConfig] = Form.useForm();
	const [formDiploma] = Form.useForm();
	const [formSearch] = Form.useForm();

	// === 2. LOGIC XỬ LÝ ===

	// 2.1. Quản lý Sổ văn bằng
	const handleAddBook = (values: any) => {
		if (books.find((b) => b.year === values.year)) return message.error('Năm này đã có sổ!');
		setBooks([...books, { id: Date.now(), year: values.year, currentNumber: 0 }]);
		message.success('Tạo sổ thành công!');
		formBook.resetFields();
	};

	// 2.2. Quyết định tốt nghiệp
	const handleAddDecision = (values: any) => {
		setDecisions([
			...decisions,
			{
				id: Date.now(),
				bookId: values.bookId,
				soQD: values.soQD,
				ngayBanHanh: values.ngayBanHanh ? values.ngayBanHanh.format('DD/MM/YYYY') : '',
				trichYeu: values.trichYeu,
				viewCount: 0, // Lượt tra cứu mặc định là 0
			},
		]);
		message.success('Thêm Quyết định thành công!');
		formDecision.resetFields();
	};

	// 2.3. Cấu hình biểu mẫu
	const handleAddConfig = (values: any) => {
		if (fieldConfigs.find((f) => f.name.toLowerCase() === values.name.toLowerCase())) {
			return message.error('Trường thông tin này đã tồn tại!');
		}
		setFieldConfigs([...fieldConfigs, { id: Date.now(), name: values.name, type: values.type }]);
		message.success('Thêm cấu hình thành công!');
		formConfig.resetFields();
	};

	const handleDeleteConfig = (id: number) => {
		setFieldConfigs(fieldConfigs.filter((f) => f.id !== id));
		message.success('Đã xóa trường thông tin!');
	};

	// 2.4. Thêm Văn Bằng (Xử lý trường động & tự tăng số)
	const handleAddDiploma = (values: any) => {
		// Tìm Quyết định và Sổ liên quan
		const decision = decisions.find((d) => d.id === values.decisionId);
		if (!decision) return message.error('Vui lòng chọn Quyết định!');

		const bookIndex = books.findIndex((b) => b.id === decision.bookId);
		if (bookIndex === -1) return message.error('Không tìm thấy sổ văn bằng của quyết định này!');

		// Tăng số vào sổ
		const updatedBooks = [...books];
		updatedBooks[bookIndex].currentNumber += 1;
		const newSoVaoSo = updatedBooks[bookIndex].currentNumber;
		setBooks(updatedBooks);

		// Tách dữ liệu mặc định và dữ liệu động
		const dynamicData: any = {};
		fieldConfigs.forEach((field) => {
			const fieldKey = `dynamic_${field.id}`;
			let val = values[fieldKey];
			if (field.type === 'Date' && val) val = val.format('DD/MM/YYYY');
			dynamicData[field.name] = val || '';
		});

		const newDiploma = {
			id: Date.now(),
			decisionId: values.decisionId,
			soVaoSo: newSoVaoSo,
			soHieu: values.soHieu,
			msv: values.msv,
			hoTen: values.hoTen,
			ngaySinh: values.ngaySinh ? values.ngaySinh.format('DD/MM/YYYY') : '',
			dynamicData, // Lưu các trường cấu hình động vào đây
		};

		setDiplomas([...diplomas, newDiploma]);
		message.success(`Thêm văn bằng thành công! Số vào sổ: ${newSoVaoSo}`);
		formDiploma.resetFields();
	};

	// 2.5. Tra cứu
	const handleSearch = (values: any) => {
		const filledFields = Object.keys(values).filter((key) => values[key] !== undefined && values[key] !== '');
		if (filledFields.length < 2) {
			return message.error('Vui lòng nhập ÍT NHẤT 2 thông tin để tra cứu!');
		}

		const results = diplomas.filter((dip) => {
			return filledFields.every((key) => String(dip[key]).toLowerCase().includes(String(values[key]).toLowerCase()));
		});

		setSearchResult(results);

		if (results.length > 0) {
			// Tăng viewCount cho Quyết định của các văn bằng tìm thấy
			const updatedDecisions = [...decisions];
			const decisionIdsToUpdate = [...new Set(results.map((r) => r.decisionId))]; // Lấy danh sách ID quyết định duy nhất

			decisionIdsToUpdate.forEach((dId) => {
				const dIndex = updatedDecisions.findIndex((d) => d.id === dId);
				if (dIndex !== -1) updatedDecisions[dIndex].viewCount += 1;
			});
			setDecisions(updatedDecisions);
			message.success(`Tìm thấy ${results.length} kết quả và đã ghi nhận lượt tra cứu!`);
		} else {
			message.warning('Không tìm thấy văn bằng nào khớp.');
		}
	};

	// === 3. GIAO DIỆN ===
	return (
		<Card bordered={false} style={{ minHeight: '85vh' }}>
			<Title level={3}>Hệ Thống Quản Lý Văn Bằng Tốt Nghiệp</Title>

			<Tabs defaultActiveKey='1' type='card'>
				{/* TAB 1: SỔ VĂN BẰNG */}
				<TabPane tab='1. Sổ văn bằng' key='1'>
					<Form form={formBook} layout='inline' onFinish={handleAddBook}>
						<Form.Item name='year' label='Năm tạo sổ' rules={[{ required: true }]}>
							<Input placeholder='VD: 2026' />
						</Form.Item>
						<Button type='primary' htmlType='submit'>
							Mở Sổ Mới
						</Button>
					</Form>
					<Table
						style={{ marginTop: 20 }}
						dataSource={books}
						rowKey='id'
						columns={[
							{ title: 'Năm học', dataIndex: 'year' },
							{
								title: 'Số lượng VB đã cấp (Số vào sổ hiện tại)',
								dataIndex: 'currentNumber',
								render: (val) => <Tag color='blue'>{val}</Tag>,
							},
						]}
					/>
				</TabPane>

				{/* TAB 2: QUYẾT ĐỊNH */}
				<TabPane tab='2. Quyết định TN' key='2'>
					<Form form={formDecision} layout='vertical' onFinish={handleAddDecision} style={{ maxWidth: 600 }}>
						<Form.Item name='bookId' label='Thuộc Sổ văn bằng năm' rules={[{ required: true }]}>
							<Select placeholder='Chọn sổ'>
								{books.map((b) => (
									<Option key={b.id} value={b.id}>
										{b.year}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='soQD' label='Số Quyết Định' rules={[{ required: true }]}>
							<Input />
						</Form.Item>
						<Form.Item name='ngayBanHanh' label='Ngày ban hành' rules={[{ required: true }]}>
							<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item name='trichYeu' label='Trích yếu'>
							<Input.TextArea rows={2} />
						</Form.Item>
						<Button type='primary' htmlType='submit'>
							Thêm Quyết Định
						</Button>
					</Form>
					<Table
						style={{ marginTop: 20 }}
						dataSource={decisions}
						rowKey='id'
						columns={[
							{ title: 'Số QĐ', dataIndex: 'soQD' },
							{ title: 'Ngày ban hành', dataIndex: 'ngayBanHanh' },
							{ title: 'Trích yếu', dataIndex: 'trichYeu' },
							{ title: 'Lượt tra cứu', dataIndex: 'viewCount', render: (val) => <Tag color='red'>{val} lượt</Tag> },
						]}
					/>
				</TabPane>

				{/* TAB 3: CẤU HÌNH TRƯỜNG ĐỘNG */}
				<TabPane tab='3. Cấu hình Biểu mẫu' key='3'>
					<Form form={formConfig} layout='inline' onFinish={handleAddConfig}>
						<Form.Item name='name' label='Tên trường (VD: Dân tộc)' rules={[{ required: true }]}>
							<Input />
						</Form.Item>
						<Form.Item name='type' label='Kiểu dữ liệu' rules={[{ required: true }]}>
							<Select style={{ width: 150 }}>
								<Option value='String'>Văn bản (String)</Option>
								<Option value='Number'>Số (Number)</Option>
								<Option value='Date'>Ngày tháng (Date)</Option>
							</Select>
						</Form.Item>
						<Button type='primary' htmlType='submit'>
							Thêm Cấu Hình
						</Button>
					</Form>
					<Table
						style={{ marginTop: 20 }}
						dataSource={fieldConfigs}
						rowKey='id'
						columns={[
							{ title: 'Tên trường', dataIndex: 'name' },
							{ title: 'Kiểu dữ liệu', dataIndex: 'type', render: (val) => <Tag color='green'>{val}</Tag> },
							{
								title: 'Thao tác',
								render: (_, record) => (
									<Popconfirm title='Xóa trường này?' onConfirm={() => handleDeleteConfig(record.id)}>
										<Button danger icon={<DeleteOutlined />} size='small' />
									</Popconfirm>
								),
							},
						]}
					/>
				</TabPane>

				{/* TAB 4: THÔNG TIN VĂN BẰNG */}
				<TabPane tab='4. Cấp Văn Bằng' key='4'>
					<Row gutter={24}>
						<Col span={10}>
							<Card title='Nhập thông tin' size='small'>
								<Form form={formDiploma} layout='vertical' onFinish={handleAddDiploma}>
									<Form.Item name='decisionId' label='Thuộc Quyết định' rules={[{ required: true }]}>
										<Select placeholder='Chọn Quyết định'>
											{decisions.map((d) => (
												<Option key={d.id} value={d.id}>
													{d.soQD}
												</Option>
											))}
										</Select>
									</Form.Item>
									<Form.Item name='soHieu' label='Số hiệu văn bằng' rules={[{ required: true }]}>
										<Input />
									</Form.Item>
									<Form.Item name='msv' label='Mã sinh viên' rules={[{ required: true }]}>
										<Input />
									</Form.Item>
									<Form.Item name='hoTen' label='Họ tên sinh viên' rules={[{ required: true }]}>
										<Input />
									</Form.Item>
									<Form.Item name='ngaySinh' label='Ngày sinh' rules={[{ required: true }]}>
										<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
									</Form.Item>

									{/* RENDER CÁC TRƯỜNG ĐỘNG */}
									{fieldConfigs.length > 0 && (
										<div>
											<hr />
											<p>
												<i>Các trường cấu hình thêm:</i>
											</p>
										</div>
									)}
									{fieldConfigs.map((field) => (
										<Form.Item
											key={field.id}
											name={`dynamic_${field.id}`}
											label={field.name}
											rules={[{ required: true }]}
										>
											{field.type === 'Date' ? (
												<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
											) : field.type === 'Number' ? (
												<Input type='number' />
											) : (
												<Input />
											)}
										</Form.Item>
									))}
									<Button type='primary' htmlType='submit' block>
										Cấp Văn Bằng
									</Button>
								</Form>
							</Card>
						</Col>
						<Col span={14}>
							<Card title='Danh sách đã cấp' size='small'>
								<Table
									scroll={{ x: 800 }}
									dataSource={diplomas}
									rowKey='id'
									columns={[
										{
											title: 'Số vào sổ',
											dataIndex: 'soVaoSo',
											key: 'soVaoSo',
											fixed: 'left',
											width: 100,
											render: (val) => <b>{val}</b>,
										},
										{ title: 'Số hiệu', dataIndex: 'soHieu', key: 'soHieu', width: 120 },
										{ title: 'Mã SV', dataIndex: 'msv', key: 'msv', width: 120 },
										{ title: 'Họ Tên', dataIndex: 'hoTen', key: 'hoTen', width: 150 },
										// Render cột động vào bảng
										...fieldConfigs.map((f) => ({
											title: f.name,
											key: f.id,
											render: (_: any, record: any) => record.dynamicData[f.name],
										})),
									]}
								/>
							</Card>
						</Col>
					</Row>
				</TabPane>

				{/* TAB 5: TRA CỨU */}
				<TabPane tab='5. Tra cứu' key='5'>
					<Card type='inner' title='Nhập thông tin tra cứu (Bắt buộc >= 2 trường)'>
						<Form form={formSearch} layout='vertical' onFinish={handleSearch}>
							<Row gutter={16}>
								<Col span={8}>
									<Form.Item name='soVaoSo' label='Số vào sổ'>
										<Input />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item name='soHieu' label='Số hiệu văn bằng'>
										<Input />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item name='msv' label='Mã sinh viên'>
										<Input />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name='hoTen' label='Họ tên'>
										<Input />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name='ngaySinh' label='Ngày sinh (DD/MM/YYYY)'>
										<Input placeholder='VD: 15/08/2000' />
									</Form.Item>
								</Col>
							</Row>
							<Space>
								<Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
									Tìm Kiếm
								</Button>
								<Button
									onClick={() => {
										formSearch.resetFields();
										setSearchResult([]);
									}}
								>
									Làm mới
								</Button>
							</Space>
						</Form>
					</Card>

					<Title level={5} style={{ marginTop: 20 }}>
						Kết quả (Các quyết định có VB này sẽ được cộng view)
					</Title>
					<Table
						scroll={{ x: 800 }}
						dataSource={searchResult}
						rowKey='id'
						columns={[
							{ title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo' },
							{ title: 'Số hiệu', dataIndex: 'soHieu', key: 'soHieu' },
							{ title: 'Mã SV', dataIndex: 'msv', key: 'msv' },
							{ title: 'Họ Tên', dataIndex: 'hoTen', key: 'hoTen' },
							{ title: 'Ngày sinh', dataIndex: 'ngaySinh', key: 'ngaySinh' },
							...fieldConfigs.map((f) => ({
								title: f.name,
								key: f.id,
								render: (_: any, record: any) => record.dynamicData[f.name],
							})),
						]}
					/>
				</TabPane>
			</Tabs>
		</Card>
	);
};

export default TH04;
