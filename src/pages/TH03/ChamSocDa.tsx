import React, { useState, useEffect, useMemo } from 'react';
import {
	Layout,
	Menu,
	Card,
	Table,
	Button,
	Input,
	InputNumber,
	Select,
	Tag,
	Space,
	Popconfirm,
	message,
	Modal,
	Form,
	Row,
	Col,
	Statistic,
	Rate,
	Typography,
	Tabs,
} from 'antd';
import {
	UserOutlined,
	CalendarOutlined,
	StarOutlined,
	BarChartOutlined,
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	SwapOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// --- DỮ LIỆU MẶC ĐỊNH ---
const dichVuMacDinh = [
	{ id: 'dv1', tenDichVu: 'Cắt tóc nam', giaTien: 50000, thoiGianThucHien: 20 },
	{ id: 'dv2', tenDichVu: 'Cắt tóc nữ', giaTien: 80000, thoiGianThucHien: 30 },
	{ id: 'dv3', tenDichVu: 'Chăm sóc da mặt', giaTien: 150000, thoiGianThucHien: 60 },
	{ id: 'dv4', tenDichVu: 'Gội đầu', giaTien: 20000, thoiGianThucHien: 10 },
	{ id: 'dv5', tenDichVu: 'Chăm sóc da body', giaTien: 120000, thoiGianThucHien: 60 },
];

const nhanVienMacDinh = [
	{ id: 'nv1', tenNhanVien: 'Nguyễn Văn A', gioiHanKhach: 8, lichLamViec: '9h-17h thứ 2 đến thứ 6' },
	{ id: 'nv2', tenNhanVien: 'Trần Thị B', gioiHanKhach: 8, lichLamViec: '10h-18h thứ 7, CN' },
];

export default function UngDungDatLich() {
	// --- STATE QUẢN LÝ DỮ LIỆU (LƯU LOCALSTORAGE) ---
	const [vaiTro, setVaiTro] = useState<'khachHang' | 'quanLy'>('khachHang');

	const [danhSachNhanVien, setDanhSachNhanVien] = useState<any[]>(
		() => JSON.parse(localStorage.getItem('danhSachNhanVien') || 'null') || nhanVienMacDinh,
	);
	const [danhSachDichVu, setDanhSachDichVu] = useState<any[]>(
		() => JSON.parse(localStorage.getItem('danhSachDichVu') || 'null') || dichVuMacDinh,
	);
	const [danhSachLichHen, setDanhSachLichHen] = useState<any[]>(
		() => JSON.parse(localStorage.getItem('danhSachLichHen') || 'null') || [],
	);
	const [danhSachDanhGia, setDanhSachDanhGia] = useState<any[]>(
		() => JSON.parse(localStorage.getItem('danhSachDanhGia') || 'null') || [],
	);

	// Lưu vào localStorage mỗi khi dữ liệu thay đổi
	useEffect(() => {
		localStorage.setItem('danhSachNhanVien', JSON.stringify(danhSachNhanVien));
	}, [danhSachNhanVien]);
	useEffect(() => {
		localStorage.setItem('danhSachDichVu', JSON.stringify(danhSachDichVu));
	}, [danhSachDichVu]);
	useEffect(() => {
		localStorage.setItem('danhSachLichHen', JSON.stringify(danhSachLichHen));
	}, [danhSachLichHen]);
	useEffect(() => {
		localStorage.setItem('danhSachDanhGia', JSON.stringify(danhSachDanhGia));
	}, [danhSachDanhGia]);

	// --- HÀM KIỂM TRA LOGIC ---
	const kiemTraTrungLich = (ngayHen: string, gioHen: string, idNhanVien: string, thoiGianThucHien: number) => {
		const batDauMoi = new Date(`${ngayHen}T${gioHen}`).getTime();
		const ketThucMoi = batDauMoi + thoiGianThucHien * 60000;

		return danhSachLichHen.some((lich) => {
			if (lich.idNhanVien !== idNhanVien || lich.ngayHen !== ngayHen || lich.trangThai === 'Hủy') return false;
			const dichVu = danhSachDichVu.find((dv) => dv.id === lich.idDichVu);
			if (!dichVu) return false;

			const batDauCu = new Date(`${lich.ngayHen}T${lich.gioHen}`).getTime();
			const ketThucCu = batDauCu + dichVu.thoiGianThucHien * 60000;

			return batDauMoi < ketThucCu && ketThucMoi > batDauCu;
		});
	};

	const kiemTraGioiHanKhach = (ngayHen: string, idNhanVien: string) => {
		const nhanVien = danhSachNhanVien.find((nv) => nv.id === idNhanVien);
		if (!nhanVien) return true; // Lỗi không tìm thấy NV

		const soKhachDaDat = danhSachLichHen.filter(
			(lich) => lich.idNhanVien === idNhanVien && lich.ngayHen === ngayHen && lich.trangThai !== 'Hủy',
		).length;

		return soKhachDaDat >= nhanVien.gioiHanKhach;
	};

	// =========================================================================
	// GIAO DIỆN 1: KHÁCH HÀNG
	// =========================================================================
	const GiaoDienKhachHang = () => {
		const [formDatLich] = Form.useForm();
		const [formDanhGia] = Form.useForm();
		const [hienThiModalDanhGia, setHienThiModalDanhGia] = useState(false);
		const [lichHenDangDanhGia, setLichHenDangDanhGia] = useState<any>(null);

		const xuLyDatLich = () => {
			formDatLich.validateFields().then((duLieu) => {
				const dichVu = danhSachDichVu.find((dv) => dv.id === duLieu.idDichVu);

				// 1. Kiểm tra giới hạn khách 8 người / ngày
				if (kiemTraGioiHanKhach(duLieu.ngayHen, duLieu.idNhanVien)) {
					message.error('Nhân viên này đã kín lịch (đạt giới hạn khách) trong ngày bạn chọn!');
					return;
				}

				// 2. Kiểm tra trùng lịch giờ
				if (kiemTraTrungLich(duLieu.ngayHen, duLieu.gioHen, duLieu.idNhanVien, dichVu?.thoiGianThucHien || 0)) {
					message.error('Nhân viên đã có lịch bận vào thời gian này!');
					return;
				}

				const lichHenMoi = {
					id: 'lh' + Date.now(),
					trangThai: 'Chờ duyệt',
					...duLieu,
				};

				setDanhSachLichHen([lichHenMoi, ...danhSachLichHen]);
				message.success('Đặt lịch thành công! Vui lòng chờ xác nhận.');
				formDatLich.resetFields();
			});
		};

		const moModalDanhGia = (lichHen: any) => {
			setLichHenDangDanhGia(lichHen);
			setHienThiModalDanhGia(true);
		};

		const xuLyDanhGia = () => {
			formDanhGia.validateFields().then((duLieu) => {
				const danhGiaMoi = {
					id: 'dg' + Date.now(),
					idLichHen: lichHenDangDanhGia.id,
					idNhanVien: lichHenDangDanhGia.idNhanVien,
					soSao: duLieu.soSao,
					noiDung: duLieu.noiDung,
					phanHoi: '',
				};
				setDanhSachDanhGia([danhGiaMoi, ...danhSachDanhGia]);
				message.success('Cảm ơn bạn đã gửi đánh giá!');
				setHienThiModalDanhGia(false);
				formDanhGia.resetFields();
			});
		};

		const layTheTrangThai = (trangThai: string) => {
			switch (trangThai) {
				case 'Hoàn thành':
					return <Tag color='success'>{trangThai}</Tag>;
				case 'Xác nhận':
					return <Tag color='processing'>{trangThai}</Tag>;
				case 'Hủy':
					return <Tag color='error'>{trangThai}</Tag>;
				default:
					return <Tag color='warning'>{trangThai}</Tag>;
			}
		};

		return (
			<div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
				<Row gutter={24}>
					<Col span={8}>
						<Card title='Đặt Lịch Hẹn Mới' bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
							<Form form={formDatLich} layout='vertical'>
								<Form.Item
									name='tenKhachHang'
									label='Tên của bạn'
									rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
								>
									<Input placeholder='Nhập tên khách hàng' />
								</Form.Item>
								<Form.Item
									name='idDichVu'
									label='Chọn Dịch vụ'
									rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
								>
									<Select placeholder='-- Chọn dịch vụ --'>
										{danhSachDichVu.map((dv) => (
											<Option key={dv.id} value={dv.id}>
												{dv.tenDichVu} - {dv.giaTien.toLocaleString()}đ ({dv.thoiGianThucHien}p)
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									name='idNhanVien'
									label='Chọn Nhân viên'
									rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
								>
									<Select placeholder='-- Chọn nhân viên --'>
										{danhSachNhanVien.map((nv) => (
											<Option key={nv.id} value={nv.id}>
												{nv.tenNhanVien}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Row gutter={16}>
									<Col span={12}>
										<Form.Item name='ngayHen' label='Ngày' rules={[{ required: true, message: 'Chọn ngày' }]}>
											<Input type='date' />
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item name='gioHen' label='Giờ' rules={[{ required: true, message: 'Chọn giờ' }]}>
											<Input type='time' />
										</Form.Item>
									</Col>
								</Row>
								<Button type='primary' block onClick={xuLyDatLich} size='large'>
									Xác Nhận Đặt Lịch
								</Button>
							</Form>
						</Card>
					</Col>
					<Col span={16}>
						<Card title='Lịch Sử Đặt Hẹn Gần Đây' bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
							<Table dataSource={danhSachLichHen} rowKey='id' pagination={{ pageSize: 5 }}>
								<Table.Column
									title='Thời gian'
									render={(_, r: any) => (
										<b>
											{r.ngayHen} {r.gioHen}
										</b>
									)}
								/>
								<Table.Column title='Tên khách' dataIndex='tenKhachHang' />
								<Table.Column
									title='Dịch vụ'
									render={(_, r: any) => danhSachDichVu.find((dv) => dv.id === r.idDichVu)?.tenDichVu}
								/>
								<Table.Column
									title='Nhân viên'
									render={(_, r: any) => danhSachNhanVien.find((nv) => nv.id === r.idNhanVien)?.tenNhanVien}
								/>
								<Table.Column title='Trạng thái' render={(_, r: any) => layTheTrangThai(r.trangThai)} />
								<Table.Column
									title='Hành động'
									render={(_, r: any) => {
										const daDanhGia = danhSachDanhGia.find((dg) => dg.idLichHen === r.id);
										if (r.trangThai === 'Hoàn thành' && !daDanhGia) {
											return (
												<Button type='dashed' size='small' onClick={() => moModalDanhGia(r)}>
													Đánh giá
												</Button>
											);
										}
										if (daDanhGia) return <span style={{ color: 'green' }}>Đã đánh giá</span>;
										return null;
									}}
								/>
							</Table>
						</Card>
					</Col>
				</Row>

				<Modal
					title='Đánh Giá Dịch Vụ'
					open={hienThiModalDanhGia}
					onOk={xuLyDanhGia}
					onCancel={() => setHienThiModalDanhGia(false)}
					okText='Gửi Đánh Giá'
					cancelText='Hủy'
				>
					<Form form={formDanhGia} layout='vertical'>
						<Form.Item
							name='soSao'
							label='Mức độ hài lòng'
							rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}
						>
							<Rate />
						</Form.Item>
						<Form.Item
							name='noiDung'
							label='Nhận xét của bạn'
							rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}
						>
							<Input.TextArea rows={4} placeholder='Nhập cảm nhận của bạn về dịch vụ...' />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	};

	// =========================================================================
	// GIAO DIỆN 2: NGƯỜI QUẢN LÝ
	// =========================================================================
	const GiaoDienQuanLy = () => {
		const [tabHienTai, setTabHienTai] = useState('nhanVien');

		// -- Xử lý tab Nhân Viên --
		const [formNhanVien] = Form.useForm();
		const [hienThiModalNhanVien, setHienThiModalNhanVien] = useState(false);
		const [nhanVienDangSua, setNhanVienDangSua] = useState<any>(null);

		const luuNhanVien = () => {
			formNhanVien.validateFields().then((duLieu) => {
				if (nhanVienDangSua) {
					setDanhSachNhanVien(danhSachNhanVien.map((nv) => (nv.id === nhanVienDangSua.id ? { ...nv, ...duLieu } : nv)));
					message.success('Cập nhật nhân viên thành công');
				} else {
					setDanhSachNhanVien([...danhSachNhanVien, { id: 'nv' + Date.now(), ...duLieu }]);
					message.success('Thêm nhân viên thành công');
				}
				setHienThiModalNhanVien(false);
			});
		};

		const xoaNhanVien = (id: string) => {
			setDanhSachNhanVien(danhSachNhanVien.filter((nv) => nv.id !== id));
			message.success('Đã xóa nhân viên');
		};

		// -- Xử lý tab Dịch Vụ --
		const [formDichVu] = Form.useForm();
		const [hienThiModalDichVu, setHienThiModalDichVu] = useState(false);
		const [dichVuDangSua, setDichVuDangSua] = useState<any>(null);

		const luuDichVu = () => {
			formDichVu.validateFields().then((duLieu) => {
				if (dichVuDangSua) {
					setDanhSachDichVu(danhSachDichVu.map((dv) => (dv.id === dichVuDangSua.id ? { ...dv, ...duLieu } : dv)));
					message.success('Cập nhật dịch vụ thành công');
				} else {
					setDanhSachDichVu([...danhSachDichVu, { id: 'dv' + Date.now(), ...duLieu }]);
					message.success('Thêm dịch vụ thành công');
				}
				setHienThiModalDichVu(false);
			});
		};

		const xoaDichVu = (id: string) => {
			setDanhSachDichVu(danhSachDichVu.filter((dv) => dv.id !== id));
			message.success('Đã xóa dịch vụ');
		};

		// -- Cập nhật trạng thái lịch hẹn --
		const capNhatTrangThaiLich = (idLich: string, trangThaiMoi: string) => {
			setDanhSachLichHen(danhSachLichHen.map((lh) => (lh.id === idLich ? { ...lh, trangThai: trangThaiMoi } : lh)));
			message.success('Đã cập nhật trạng thái');
		};

		// -- Xử lý phản hồi đánh giá --
		const [idDangPhanHoi, setIdDangPhanHoi] = useState<string | null>(null);
		const [noiDungPhanHoi, setNoiDungPhanHoi] = useState('');

		const guiPhanHoi = (idDanhGia: string) => {
			setDanhSachDanhGia(danhSachDanhGia.map((dg) => (dg.id === idDanhGia ? { ...dg, phanHoi: noiDungPhanHoi } : dg)));
			setIdDangPhanHoi(null);
			setNoiDungPhanHoi('');
			message.success('Đã gửi phản hồi');
		};

		// -- Thống kê --
		const tongLichHen = danhSachLichHen.length;
		const doanhThuTheoDichVu = useMemo(() => {
			const dt: any = {};
			danhSachLichHen
				.filter((lh) => lh.trangThai === 'Hoàn thành')
				.forEach((lh) => {
					const dv = danhSachDichVu.find((d) => d.id === lh.idDichVu);
					if (dv) dt[dv.tenDichVu] = (dt[dv.tenDichVu] || 0) + dv.giaTien;
				});
			return Object.entries(dt).map(([ten, tien]) => ({ ten, tien }));
		}, [danhSachLichHen, danhSachDichVu]);

		const doanhThuTheoNhanVien = useMemo(() => {
			const dt: any = {};
			danhSachLichHen
				.filter((lh) => lh.trangThai === 'Hoàn thành')
				.forEach((lh) => {
					const nv = danhSachNhanVien.find((n) => n.id === lh.idNhanVien);
					const dv = danhSachDichVu.find((d) => d.id === lh.idDichVu);
					if (nv && dv) dt[nv.tenNhanVien] = (dt[nv.tenNhanVien] || 0) + dv.giaTien;
				});
			return Object.entries(dt).map(([ten, tien]) => ({ ten, tien }));
		}, [danhSachLichHen, danhSachNhanVien, danhSachDichVu]);

		return (
			<Layout style={{ height: 'calc(100vh - 64px)' }}>
				<Sider width={250} theme='light'>
					<Menu
						mode='inline'
						selectedKeys={[tabHienTai]}
						onClick={(e) => setTabHienTai(e.key)}
						style={{ height: '100%', borderRight: 0 }}
					>
						<Menu.Item key='nhanVien' icon={<UserOutlined />}>
							Quản lý Nhân sự
						</Menu.Item>
						<Menu.Item key='dichVu' icon={<BarChartOutlined />}>
							Quản lý Dịch vụ
						</Menu.Item>
						<Menu.Item key='lichHen' icon={<CalendarOutlined />}>
							Quản lý Lịch hẹn
						</Menu.Item>
						<Menu.Item key='danhGia' icon={<StarOutlined />}>
							Đánh giá Khách hàng
						</Menu.Item>
						<Menu.Item key='thongKe' icon={<BarChartOutlined />}>
							Báo cáo Thống kê
						</Menu.Item>
					</Menu>
				</Sider>
				<Content style={{ padding: '24px', overflowY: 'auto' }}>
					{tabHienTai === 'nhanVien' && (
						<Card
							title='Danh Sách Nhân Viên'
							extra={
								<Button
									type='primary'
									icon={<PlusOutlined />}
									onClick={() => {
										setNhanVienDangSua(null);
										formNhanVien.resetFields();
										setHienThiModalNhanVien(true);
									}}
								>
									Thêm NV
								</Button>
							}
						>
							<Table dataSource={danhSachNhanVien} rowKey='id' bordered>
								<Table.Column title='Tên NV' dataIndex='tenNhanVien' />
								<Table.Column title='Lịch làm việc' dataIndex='lichLamViec' />
								<Table.Column title='Giới hạn khách/ngày' dataIndex='gioiHanKhach' align='center' />
								<Table.Column
									title='Hành động'
									align='center'
									render={(_, r: any) => (
										<Space>
											<Button
												icon={<EditOutlined />}
												onClick={() => {
													setNhanVienDangSua(r);
													formNhanVien.setFieldsValue(r);
													setHienThiModalNhanVien(true);
												}}
											>
												Sửa
											</Button>
											<Popconfirm title='Xóa nhân viên này?' onConfirm={() => xoaNhanVien(r.id)} okText='Xóa'>
												<Button danger icon={<DeleteOutlined />} />
											</Popconfirm>
										</Space>
									)}
								/>
							</Table>
						</Card>
					)}

					{tabHienTai === 'dichVu' && (
						<Card
							title='Danh Sách Dịch Vụ'
							extra={
								<Button
									type='primary'
									icon={<PlusOutlined />}
									onClick={() => {
										setDichVuDangSua(null);
										formDichVu.resetFields();
										setHienThiModalDichVu(true);
									}}
								>
									Thêm DV
								</Button>
							}
						>
							<Table dataSource={danhSachDichVu} rowKey='id' bordered>
								<Table.Column title='Tên Dịch Vụ' dataIndex='tenDichVu' />
								<Table.Column title='Giá tiền (VND)' dataIndex='giaTien' render={(v) => v.toLocaleString()} />
								<Table.Column title='Thời gian (Phút)' dataIndex='thoiGianThucHien' />
								<Table.Column
									title='Hành động'
									align='center'
									render={(_, r: any) => (
										<Space>
											<Button
												icon={<EditOutlined />}
												onClick={() => {
													setDichVuDangSua(r);
													formDichVu.setFieldsValue(r);
													setHienThiModalDichVu(true);
												}}
											>
												Sửa
											</Button>
											<Popconfirm title='Xóa dịch vụ này?' onConfirm={() => xoaDichVu(r.id)} okText='Xóa'>
												<Button danger icon={<DeleteOutlined />} />
											</Popconfirm>
										</Space>
									)}
								/>
							</Table>
						</Card>
					)}

					{tabHienTai === 'lichHen' && (
						<Card title='Quản Lý Lịch Hẹn'>
							<Table dataSource={danhSachLichHen} rowKey='id' bordered>
								<Table.Column
									title='Thời gian'
									render={(_, r: any) => (
										<b>
											{r.ngayHen} {r.gioHen}
										</b>
									)}
								/>
								<Table.Column title='Khách hàng' dataIndex='tenKhachHang' />
								<Table.Column
									title='Nhân viên'
									render={(_, r: any) => danhSachNhanVien.find((nv) => nv.id === r.idNhanVien)?.tenNhanVien}
								/>
								<Table.Column
									title='Dịch vụ'
									render={(_, r: any) => danhSachDichVu.find((dv) => dv.id === r.idDichVu)?.tenDichVu}
								/>
								<Table.Column
									title='Cập nhật Trạng thái'
									render={(_, r: any) => (
										<Select
											value={r.trangThai}
											style={{ width: 140 }}
											onChange={(val) => capNhatTrangThaiLich(r.id, val)}
										>
											<Option value='Chờ duyệt'>Chờ duyệt</Option>
											<Option value='Xác nhận'>Xác nhận</Option>
											<Option value='Hoàn thành'>Hoàn thành</Option>
											<Option value='Hủy'>Hủy</Option>
										</Select>
									)}
								/>
							</Table>
						</Card>
					)}

					{tabHienTai === 'danhGia' && (
						<Card title='Đánh Giá Của Khách Hàng'>
							<Table dataSource={danhSachDanhGia} rowKey='id' bordered>
								<Table.Column title='Mã Lịch' dataIndex='idLichHen' />
								<Table.Column
									title='Nhân viên bị ĐG'
									render={(_, r: any) => danhSachNhanVien.find((nv) => nv.id === r.idNhanVien)?.tenNhanVien}
								/>
								<Table.Column
									title='Nội dung đánh giá'
									render={(_, r: any) => (
										<div>
											<Rate disabled value={r.soSao} style={{ fontSize: 14 }} />
											<p style={{ margin: '5px 0' }}>{r.noiDung}</p>
										</div>
									)}
								/>
								<Table.Column
									title='Phản hồi từ Spa'
									render={(_, r: any) =>
										r.phanHoi ? (
											<div style={{ backgroundColor: '#f0f2f5', padding: '8px', borderRadius: '4px' }}>
												<b>Bạn:</b> {r.phanHoi}
											</div>
										) : idDangPhanHoi === r.id ? (
											<Space.Compact style={{ width: '100%' }}>
												<Input
													value={noiDungPhanHoi}
													onChange={(e) => setNoiDungPhanHoi(e.target.value)}
													placeholder='Nhập phản hồi...'
												/>
												<Button type='primary' onClick={() => guiPhanHoi(r.id)}>
													Gửi
												</Button>
												<Button onClick={() => setIdDangPhanHoi(null)}>Hủy</Button>
											</Space.Compact>
										) : (
											<Button type='link' onClick={() => setIdDangPhanHoi(r.id)}>
												Viết phản hồi
											</Button>
										)
									}
								/>
							</Table>
						</Card>
					)}

					{tabHienTai === 'thongKe' && (
						<Space direction='vertical' size='large' style={{ width: '100%' }}>
							<Row gutter={16}>
								<Col span={8}>
									<Card>
										<Statistic title='Tổng Lịch Hẹn Đã Đặt' value={tongLichHen} prefix={<CalendarOutlined />} />
									</Card>
								</Col>
							</Row>
							<Row gutter={16}>
								<Col span={12}>
									<Card title='Doanh Thu Theo Dịch Vụ (Đã hoàn thành)'>
										<Table dataSource={doanhThuTheoDichVu} rowKey='ten' pagination={false} size='small' bordered>
											<Table.Column title='Dịch Vụ' dataIndex='ten' />
											<Table.Column
												title='Doanh Thu'
												dataIndex='tien'
												render={(v: any) => <b style={{ color: 'red' }}>{v.toLocaleString()} đ</b>}
											/>
										</Table>
									</Card>
								</Col>
								<Col span={12}>
									<Card title='Doanh Thu Theo Nhân Viên (Đã hoàn thành)'>
										<Table dataSource={doanhThuTheoNhanVien} rowKey='ten' pagination={false} size='small' bordered>
											<Table.Column title='Nhân Viên' dataIndex='ten' />
											<Table.Column
												title='Doanh Thu'
												dataIndex='tien'
												render={(v: any) => <b style={{ color: 'blue' }}>{v.toLocaleString()} đ</b>}
											/>
										</Table>
									</Card>
								</Col>
							</Row>
						</Space>
					)}

					{/* Các Modal Quản Lý */}
					<Modal
						title={nhanVienDangSua ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên Mới'}
						open={hienThiModalNhanVien}
						onOk={luuNhanVien}
						onCancel={() => setHienThiModalNhanVien(false)}
					>
						<Form form={formNhanVien} layout='vertical' initialValues={{ gioiHanKhach: 8 }}>
							<Form.Item name='tenNhanVien' label='Tên nhân viên' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name='lichLamViec' label='Lịch làm việc (VD: 9h-17h thứ 6)' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name='gioiHanKhach' label='Giới hạn khách / ngày' rules={[{ required: true }]}>
								<InputNumber min={1} style={{ width: '100%' }} />
							</Form.Item>
						</Form>
					</Modal>

					<Modal
						title={dichVuDangSua ? 'Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới'}
						open={hienThiModalDichVu}
						onOk={luuDichVu}
						onCancel={() => setHienThiModalDichVu(false)}
					>
						<Form form={formDichVu} layout='vertical'>
							<Form.Item name='tenDichVu' label='Tên Dịch Vụ' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name='giaTien' label='Giá Tiền (VNĐ)' rules={[{ required: true }]}>
								<InputNumber min={0} step={10000} style={{ width: '100%' }} />
							</Form.Item>
							<Form.Item name='thoiGianThucHien' label='Thời gian thực hiện (Phút)' rules={[{ required: true }]}>
								<InputNumber min={5} step={5} style={{ width: '100%' }} />
							</Form.Item>
						</Form>
					</Modal>
				</Content>
			</Layout>
		);
	};

	return (
		<Layout style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
			<Header
				style={{
					background: '#f8fbfc',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0 15px',
				}}
			>
				<Title level={3} style={{ color: '#111111', margin: 10 }}>
					Hệ Thống Đặt Lịch Hẹn
				</Title>
				<Button
					type='primary'
					icon={<SwapOutlined />}
					onClick={() => setVaiTro(vaiTro === 'khachHang' ? 'quanLy' : 'khachHang')}
				>
					{vaiTro === 'khachHang' ? 'Chuyển sang Giao diện Quản Lý' : 'Chuyển sang Giao diện Khách Hàng'}
				</Button>
			</Header>

			{vaiTro === 'khachHang' ? <GiaoDienKhachHang /> : <GiaoDienQuanLy />}
		</Layout>
	);
}
