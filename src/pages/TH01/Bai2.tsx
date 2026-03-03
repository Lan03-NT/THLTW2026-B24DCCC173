import { useEffect, useMemo, useState } from 'react';
import {
	Input,
	Button,
	List,
	Modal,
	DatePicker,
	Select,
	Typography,
	Space,
	Progress,
	message,
	Card,
	Empty,
	Row,
	Col,
	Statistic,
	Tag,
	InputNumber,
	Popconfirm,
	Form,
} from 'antd';
import {
	BookOutlined,
	ClockCircleOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	ReadOutlined,
} from '@ant-design/icons';
import moment, { Moment } from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

const MON_MAC_DINH = [
	{ id: 1, ten: 'Toán' },
	{ id: 2, ten: 'Văn' },
	{ id: 3, ten: 'Anh' },
	{ id: 4, ten: 'Khoa học' },
	{ id: 5, ten: 'Công nghệ' },
];

type MonHoc = {
	id: number;
	ten: string;
};

type BuoiHoc = {
	id: number;
	monId: number;
	ngay: string;
	thoiLuong: number;
	noiDung?: string;
	ghiChu?: string;
};

type MucTieu = {
	monId: number;
	gio: number;
};

type FormValues = {
	id?: number;
	monId: number;
	ngay: Moment;
	thoiLuong: number;
	noiDung: string;
	ghiChu?: string;
};

export default function QuanLyHocTap() {
	const [danhSachMon, setDanhSachMon] = useState<MonHoc[]>([]);
	const [danhSachBuoiHoc, setDanhSachBuoiHoc] = useState<BuoiHoc[]>([]);
	const [mucTieuThang, setMucTieuThang] = useState<MucTieu[]>([]);
	const [mucTieuTongThang, setMucTieuTongThang] = useState<number | undefined>(undefined);
	const [tenMonMoi, setTenMonMoi] = useState('');
	const [moModal, setMoModal] = useState(false);
	const [dangSuaId, setDangSuaId] = useState<number | undefined>(undefined);
	const [form] = Form.useForm<FormValues>();

	useEffect(() => {
		const mon = JSON.parse(localStorage.getItem('mon_hoc') || 'null');
		const buoi = JSON.parse(localStorage.getItem('buoi_hoc') || '[]');
		const mucTieu = JSON.parse(localStorage.getItem('muc_tieu') || '[]');
		const mucTieuTongRaw = Number(localStorage.getItem('muc_tieu_tong_thang') || 0);

		setDanhSachMon(Array.isArray(mon) && mon.length > 0 ? mon : MON_MAC_DINH);
		setDanhSachBuoiHoc(Array.isArray(buoi) ? buoi : []);
		setMucTieuThang(Array.isArray(mucTieu) ? mucTieu : []);
		setMucTieuTongThang(mucTieuTongRaw > 0 ? mucTieuTongRaw : undefined);
	}, []);

	useEffect(() => {
		localStorage.setItem('mon_hoc', JSON.stringify(danhSachMon));
		localStorage.setItem('buoi_hoc', JSON.stringify(danhSachBuoiHoc));
		localStorage.setItem('muc_tieu', JSON.stringify(mucTieuThang));
		if (mucTieuTongThang && mucTieuTongThang > 0) {
			localStorage.setItem('muc_tieu_tong_thang', String(mucTieuTongThang));
		} else {
			localStorage.removeItem('muc_tieu_tong_thang');
		}
	}, [danhSachMon, danhSachBuoiHoc, mucTieuThang, mucTieuTongThang]);

	const tongGioThang = useMemo(
		() =>
			danhSachBuoiHoc
				.filter((s) => moment(s.ngay).isSame(moment(), 'month'))
				.reduce((tong, s) => tong + Number(s.thoiLuong), 0),
		[danhSachBuoiHoc],
	);

	const tongBuoiThang = useMemo(
		() => danhSachBuoiHoc.filter((s) => moment(s.ngay).isSame(moment(), 'month')).length,
		[danhSachBuoiHoc],
	);

	const phanTramTong = mucTieuTongThang ? Math.min(Math.round((tongGioThang / mucTieuTongThang) * 100), 100) : 0;

	const datMucTieuTong = mucTieuTongThang ? tongGioThang >= mucTieuTongThang : false;

	const themMon = () => {
		const tenMoi = tenMonMoi.trim();
		if (!tenMoi) {
			message.warning('Nhập tên môn!');
			return;
		}

		const daTonTai = danhSachMon.some((m) => m.ten.toLowerCase() === tenMoi.toLowerCase());
		if (daTonTai) {
			message.warning('Môn học đã tồn tại');
			return;
		}

		setDanhSachMon((prev) => [...prev, { id: Date.now(), ten: tenMoi }]);
		setTenMonMoi('');
		message.success('Đã thêm môn học');
	};

	const capNhatTenMon = (id: number, tenMoi: string) => {
		const ten = tenMoi.trim();
		if (!ten) return;
		setDanhSachMon((prev) => prev.map((m) => (m.id === id ? { ...m, ten } : m)));
	};

	const xoaMon = (id: number) => {
		setDanhSachMon((prev) => prev.filter((m) => m.id !== id));
		setDanhSachBuoiHoc((prev) => prev.filter((b) => b.monId !== id));
		setMucTieuThang((prev) => prev.filter((g) => g.monId !== id));
		message.success('Đã xóa môn học');
	};

	const tinhTongGioTheoMon = (id: number) =>
		danhSachBuoiHoc
			.filter((s) => s.monId === id && moment(s.ngay).isSame(moment(), 'month'))
			.reduce((tong, s) => tong + Number(s.thoiLuong), 0);

	const capNhatMucTieuMon = (monId: number, gio?: number | null) => {
		if (!gio || gio <= 0) {
			setMucTieuThang((prev) => prev.filter((g) => g.monId !== monId));
			return;
		}

		setMucTieuThang((prev) => [...prev.filter((g) => g.monId !== monId), { monId, gio }]);
	};

	const layBuoiTheoMon = (monId: number) =>
		[...danhSachBuoiHoc].filter((s) => s.monId === monId).sort((a, b) => moment(b.ngay).unix() - moment(a.ngay).unix());

	const xoaBuoiHoc = (id: number) => {
		setDanhSachBuoiHoc((prev) => prev.filter((s) => s.id !== id));
		message.success('Đã xóa buổi học');
	};

	const moFormThem = (monIdMacDinh?: number) => {
		if (!danhSachMon.length) {
			message.warning('Vui lòng thêm môn học trước khi tạo lịch học');
			return;
		}

		setDangSuaId(undefined);
		form.resetFields();
		form.setFieldsValue({
			ngay: moment(),
			thoiLuong: 1,
			monId: monIdMacDinh || danhSachMon[0].id,
		});
		setMoModal(true);
	};

	const moFormSua = (item: BuoiHoc) => {
		setDangSuaId(item.id);
		form.setFieldsValue({
			id: item.id,
			monId: item.monId,
			ngay: moment(item.ngay),
			thoiLuong: Number(item.thoiLuong),
			noiDung: item.noiDung,
			ghiChu: item.ghiChu,
		});
		setMoModal(true);
	};

	const luuBuoiHoc = async () => {
		try {
			const values = await form.validateFields();
			const payload: BuoiHoc = {
				id: dangSuaId || Date.now(),
				monId: values.monId,
				ngay: values.ngay.format('YYYY-MM-DD HH:mm'),
				thoiLuong: Number(values.thoiLuong),
				noiDung: values.noiDung,
				ghiChu: values.ghiChu,
			};

			if (dangSuaId) {
				setDanhSachBuoiHoc((prev) => prev.map((s) => (s.id === dangSuaId ? payload : s)));
				message.success('Đã cập nhật buổi học');
			} else {
				setDanhSachBuoiHoc((prev) => [...prev, payload]);
				message.success('Đã thêm buổi học');
			}

			setMoModal(false);
			setDangSuaId(undefined);
			form.resetFields();
		} catch (error) {
			// antd form handles validation messages
		}
	};

	return (
		<div style={{ padding: 16, background: '#f0f2f5', minHeight: '100vh', overflowX: 'hidden' }}>
			<Card bordered={false} style={{ maxWidth: 1000, margin: '0 auto', width: '100%', overflow: 'hidden' }}>
				<Space direction='vertical' size='large' style={{ width: '100%' }}>
					<div>
						<Title level={3} style={{ marginBottom: 4 }}>
							<ReadOutlined /> Quản Lý Tiến Độ Học Tập
						</Title>
						<Text type='secondary'></Text>
					</div>

					<Row gutter={16}>
						<Col xs={24} sm={8}>
							<Card>
								<Statistic title='Số môn học' value={danhSachMon.length} prefix={<BookOutlined />} />
							</Card>
						</Col>
						<Col xs={24} sm={8}>
							<Card>
								<Statistic title='Buổi học trong tháng' value={tongBuoiThang} prefix={<ClockCircleOutlined />} />
							</Card>
						</Col>
						<Col xs={24} sm={8}>
							<Card>
								<Statistic title={`Tổng giờ ${moment().format('MM/YYYY')}`} value={tongGioThang} suffix='giờ' />
							</Card>
						</Col>
					</Row>

					<Card title='Thêm môn học' size='small' bodyStyle={{ overflowX: 'auto' }}>
						<Input.Group compact style={{ display: 'flex' }}>
							<Input
								style={{ flex: 1 }}
								placeholder='Ví dụ: Toán, Văn, Anh, Khoa học, Công nghệ...'
								value={tenMonMoi}
								onChange={(e) => setTenMonMoi(e.target.value)}
								onPressEnter={themMon}
							/>
							<Button type='primary' icon={<PlusOutlined />} onClick={themMon} style={{ minWidth: 108 }}>
								Thêm môn
							</Button>
						</Input.Group>
					</Card>

					<Card title={`Mục tiêu tháng ${moment().format('MM/YYYY')}`} size='small'>
						<Space direction='vertical' size='middle' style={{ width: '100%' }}>
							<Card
								size='small'
								type='inner'
								title='Mục tiêu tổng thời lượng trong tháng'
								bodyStyle={{ overflowX: 'auto' }}
							>
								<Row gutter={[12, 12]} align='middle'>
									<Col xs={24} md={10}>
										<Space wrap>
											<Text type='secondary'>Mục tiêu tổng:</Text>
											<InputNumber
												min={1}
												value={mucTieuTongThang}
												onChange={(value) => setMucTieuTongThang(value || undefined)}
												placeholder='Giờ/tháng'
											/>
											<Text type='secondary'>giờ</Text>
										</Space>
									</Col>
									<Col xs={24} md={14} style={{ textAlign: 'right' }}>
										{mucTieuTongThang ? (
											<Tag color={datMucTieuTong ? 'success' : 'warning'}>
												{datMucTieuTong ? 'Đã đạt mục tiêu tổng' : 'Chưa đạt mục tiêu tổng'}
											</Tag>
										) : (
											<Tag>Chưa đặt mục tiêu tổng</Tag>
										)}
									</Col>
								</Row>
								{mucTieuTongThang ? (
									<Progress
										percent={phanTramTong}
										status={datMucTieuTong ? 'success' : 'active'}
										format={() => `${tongGioThang}/${mucTieuTongThang} giờ`}
									/>
								) : null}
							</Card>

							{danhSachMon.length === 0 ? (
								<Empty description='Chưa có môn học' />
							) : (
								danhSachMon.map((mon) => {
									const mucTieu = mucTieuThang.find((g) => g.monId === mon.id)?.gio || 0;
									const tongGio = tinhTongGioTheoMon(mon.id);
									const phanTram = mucTieu ? Math.min(Math.round((tongGio / mucTieu) * 100), 100) : 0;
									const daDat = mucTieu > 0 && tongGio >= mucTieu;

									return (
										<Card key={mon.id} size='small' bodyStyle={{ overflowX: 'auto' }}>
											<Row gutter={[12, 12]} align='middle'>
												<Col xs={24} md={8}>
													<Text
														strong
														editable={{
															icon: <EditOutlined />,
															onChange: (value) => capNhatTenMon(mon.id, value),
														}}
													>
														{mon.ten}
													</Text>
												</Col>
												<Col xs={24} md={10}>
													<Space wrap>
														<Text type='secondary'>Mục tiêu môn:</Text>
														<InputNumber
															min={1}
															value={mucTieu || undefined}
															onChange={(value) => capNhatMucTieuMon(mon.id, value)}
															placeholder='Giờ'
														/>
														<Text type='secondary'>giờ</Text>
													</Space>
												</Col>
												<Col xs={24} md={6}>
													<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
														<Space wrap size={6} style={{ justifyContent: 'flex-end' }}>
															{mucTieu > 0 ? (
																<Tag color={daDat ? 'success' : 'warning'}>{daDat ? 'Đã đạt' : 'Chưa đạt'}</Tag>
															) : (
																<Tag>Chưa đặt</Tag>
															)}
															<Popconfirm
																title='Xóa môn học này?'
																onConfirm={() => xoaMon(mon.id)}
																okText='Xóa'
																cancelText='Hủy'
															>
																<Button danger size='small' icon={<DeleteOutlined />}>
																	Xóa
																</Button>
															</Popconfirm>
															<Button
																size='small'
																type='primary'
																icon={<PlusOutlined />}
																onClick={() => moFormThem(mon.id)}
															>
																Thêm lịch
															</Button>
														</Space>
													</div>
												</Col>
											</Row>
											{mucTieu > 0 ? (
												<Progress
													percent={phanTram}
													status={daDat ? 'success' : 'active'}
													format={() => `${tongGio}/${mucTieu} giờ`}
												/>
											) : (
												<Text type='secondary'>Chưa đặt mục tiêu cho môn này.</Text>
											)}

											<div style={{ marginTop: 12, overflowX: 'auto' }}>
												<List
													size='small'
													header={<Text strong>Lịch học môn {mon.ten}</Text>}
													locale={{ emptyText: 'Chưa có lịch học cho môn này' }}
													dataSource={layBuoiTheoMon(mon.id)}
													renderItem={(item) => (
														<List.Item
															style={{ flexWrap: 'wrap', rowGap: 8 }}
															actions={[
																<Space key={`actions-mon-${item.id}`} size={8}>
																	<Button size='small' onClick={() => moFormSua(item)}>
																		Sửa
																	</Button>
																	<Popconfirm
																		title='Xóa lịch học này?'
																		onConfirm={() => xoaBuoiHoc(item.id)}
																		okText='Xóa'
																		cancelText='Hủy'
																	>
																		<Button size='small' danger>
																			Xóa
																		</Button>
																	</Popconfirm>
																</Space>,
															]}
														>
															<List.Item.Meta
																style={{ minWidth: 260 }}
																title={
																	<Space wrap>
																		<Tag color='blue'>{moment(item.ngay).format('DD/MM/YYYY HH:mm')}</Tag>
																		<Tag color='gold'>{item.thoiLuong} giờ</Tag>
																	</Space>
																}
																description={
																	<Space direction='vertical' size={2}>
																		<Text>Nội dung: {item.noiDung}</Text>
																		<Text type='secondary'>Ghi chú: {item.ghiChu || 'Không có'}</Text>
																	</Space>
																}
															/>
														</List.Item>
													)}
												/>
											</div>
										</Card>
									);
								})
							)}
						</Space>
					</Card>

					<Card
						title='Lịch sử buổi học'
						extra={
							<Button type='primary' icon={<PlusOutlined />} onClick={() => moFormThem()} style={{ minWidth: 150 }}>
								Ghi nhận buổi học
							</Button>
						}
						size='small'
						bodyStyle={{ overflowX: 'auto' }}
					>
						<List
							dataSource={[...danhSachBuoiHoc].sort((a, b) => moment(b.ngay).unix() - moment(a.ngay).unix())}
							locale={{ emptyText: 'Chưa có buổi học' }}
							renderItem={(item) => {
								const tenMon = danhSachMon.find((m) => m.id === item.monId)?.ten || 'Không xác định';

								return (
									<List.Item
										style={{ flexWrap: 'wrap', rowGap: 8 }}
										actions={[
											<Space key={`actions-${item.id}`} size={8}>
												<Button size='small' onClick={() => moFormSua(item)}>
													Sửa
												</Button>
												<Popconfirm
													title='Xóa buổi học này?'
													onConfirm={() => xoaBuoiHoc(item.id)}
													okText='Xóa'
													cancelText='Hủy'
												>
													<Button size='small' danger>
														Xóa
													</Button>
												</Popconfirm>
											</Space>,
										]}
									>
										<List.Item.Meta
											style={{ minWidth: 260 }}
											title={
												<Space wrap>
													<Text strong>{tenMon}</Text>
													<Tag color='blue'>{moment(item.ngay).format('DD/MM/YYYY HH:mm')}</Tag>
													<Tag color='gold'>{item.thoiLuong} giờ</Tag>
												</Space>
											}
											description={
												<Space direction='vertical' size={2}>
													<Text>{item.noiDung || 'Không có nội dung'}</Text>
													{item.ghiChu ? <Text type='secondary'>Ghi chú: {item.ghiChu}</Text> : null}
												</Space>
											}
										/>
									</List.Item>
								);
							}}
						/>
					</Card>
				</Space>
			</Card>

			<Modal
				title={dangSuaId ? 'Sửa buổi học' : 'Thêm buổi học'}
				visible={moModal}
				onOk={luuBuoiHoc}
				onCancel={() => {
					setMoModal(false);
					setDangSuaId(undefined);
					form.resetFields();
				}}
				okText='Lưu'
				cancelText='Hủy'
				destroyOnClose
			>
				<Form<FormValues> form={form} layout='vertical'>
					<Form.Item name='monId' label='Môn học' rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}>
						<Select placeholder='Chọn môn học'>
							{danhSachMon.map((m) => (
								<Option key={m.id} value={m.id}>
									{m.ten}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name='ngay'
						label='Thời gian học (ngày giờ)'
						rules={[{ required: true, message: 'Vui lòng chọn thời gian học' }]}
					>
						<DatePicker style={{ width: '100%' }} showTime format='DD/MM/YYYY HH:mm' />
					</Form.Item>

					<Form.Item
						name='thoiLuong'
						label='Thời lượng học (giờ)'
						rules={[{ required: true, message: 'Vui lòng nhập thời lượng học' }]}
					>
						<InputNumber style={{ width: '100%' }} min={0.5} step={0.5} />
					</Form.Item>

					<Form.Item
						name='noiDung'
						label='Nội dung đã học'
						rules={[{ required: true, message: 'Vui lòng nhập nội dung đã học' }]}
					>
						<Input placeholder='Ví dụ: Ôn ngữ pháp, giải đề, làm dự án...' />
					</Form.Item>

					<Form.Item name='ghiChu' label='Ghi chú'>
						<Input.TextArea rows={3} placeholder='Ghi chú thêm...' />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
