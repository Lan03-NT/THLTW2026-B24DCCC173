import React, { useState } from 'react';
import {
	Table,
	Button,
	Space,
	Modal,
	Form,
	Input,
	Select,
	Tag,
	Popconfirm,
	message,
	Alert,
	Drawer,
	Timeline,
	Tooltip,
	Dropdown,
	Menu,
} from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	EyeOutlined,
	HistoryOutlined,
	PlusOutlined,
	CheckOutlined,
	CloseOutlined,
	DownOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const danhSachCLB = [
	{ id: 1, ten: 'CLB Lập trình PTIT' },
	{ id: 2, ten: 'CLB Âm nhạc' },
	{ id: 3, ten: 'CLB Tiếng Anh' },
];

const duLieuDonKhoiTao = [
	{
		id: '101',
		hoTen: 'Nguyễn Văn Hoàng',
		email: 'hoang.nguyen@gmail.com',
		sdt: '0987654321',
		gioiTinh: 'Nam',
		diaChi: 'Hà Nội',
		soTruong: 'Lập trình Frontend',
		idCLB: 1,
		lyDo: 'Muốn nâng cao kỹ năng React',
		trangThai: 'Chờ duyệt',
		ghiChu: '',
	},
	{
		id: '102',
		hoTen: 'Lê Mai Phương',
		email: 'phuong.le@gmail.com',
		sdt: '0123456789',
		gioiTinh: 'Nữ',
		diaChi: 'Hải Phòng',
		soTruong: 'Hát, Guitar',
		idCLB: 2,
		lyDo: 'Đam mê biểu diễn',
		trangThai: 'Đã duyệt',
		ghiChu: '',
	},
	{
		id: '103',
		hoTen: 'Trần Minh Tuấn',
		email: 'tuan.tran@gmail.com',
		sdt: '0333444555',
		gioiTinh: 'Nam',
		diaChi: 'Đà Nẵng',
		soTruong: 'Giao tiếp tự tin',
		idCLB: 3,
		lyDo: 'Cải thiện tiếng Anh',
		trangThai: 'Từ chối',
		ghiChu: 'Không vượt qua vòng phỏng vấn',
	},
];

const QuanLyDonDangKy = () => {
	const [danhSachDon, setDanhSachDon] = useState(duLieuDonKhoiTao);
	const [danhSachLichSu, setDanhSachLichSu] = useState([]);
	const [dongDuocChon, setDongDuocChon] = useState([]);
	const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

	const [trangThaiModalSua, setTrangThaiModalSua] = useState(false);
	const [donDangSua, setDonDangSua] = useState(null);
	const [cheDoXem, setCheDoXem] = useState(false);

	const [trangThaiModalTuChoi, setTrangThaiModalTuChoi] = useState(false);
	const [loaiTuChoi, setLoaiTuChoi] = useState('DON');
	const [donDangTuChoi, setDonDangTuChoi] = useState(null);

	const [trangThaiDrawerLichSu, setTrangThaiDrawerLichSu] = useState(false);

	const [formSua] = Form.useForm();
	const [formTuChoi] = Form.useForm();

	const ghiLichSu = (hanhDong, doiTuong, lyDo = '') => {
		const thoiGian = dayjs().format('HH:mm DD/MM/YYYY');
		const phanLyDo = lyDo ? ' với lý do: ' + lyDo : '';
		const noiDung = 'Admin đã ' + hanhDong + ' đơn của [' + doiTuong + '] vào lúc ' + thoiGian + phanLyDo;
		setDanhSachLichSu((prev) => [{ id: Date.now(), noiDung, thoiGian }, ...prev]);
	};

	const moModalSua = (banGhi = null, laXemChiTiet = false) => {
		setDonDangSua(banGhi);
		setCheDoXem(laXemChiTiet);
		if (banGhi) {
			formSua.setFieldsValue(banGhi);
		} else {
			formSua.resetFields();
			formSua.setFieldsValue({ trangThai: 'Chờ duyệt', gioiTinh: 'Nam' });
		}
		setTrangThaiModalSua(true);
	};

	const xuLyLuuSua = (giaTri) => {
		if (donDangSua) {
			setDanhSachDon(danhSachDon.map((don) => (don.id === donDangSua.id ? { ...don, ...giaTri } : don)));
			message.success('Cập nhật đơn thành công!');
		} else {
			setDanhSachDon([{ id: Date.now().toString(), ...giaTri }, ...danhSachDon]);
			message.success('Thêm đơn mới thành công!');
		}
		setTrangThaiModalSua(false);
	};

	const xuLyXoa = (id) => {
		setDanhSachDon(danhSachDon.filter((don) => don.id !== id));
		message.success('Đã xóa đơn đăng ký!');
	};

	const xuLyDuyetDon = (id) => {
		const don = danhSachDon.find((d) => d.id === id);
		setDanhSachDon(danhSachDon.map((d) => (d.id === id ? { ...d, trangThai: 'Đã duyệt', ghiChu: '' } : d)));
		ghiLichSu('duyệt', don.hoTen);
		message.success('Đã duyệt đơn của ' + don.hoTen);
	};

	const moModalTuChoi = (id) => {
		setLoaiTuChoi('DON');
		setDonDangTuChoi(id);
		formTuChoi.resetFields();
		setTrangThaiModalTuChoi(true);
	};

	const xuLyTuChoiThucSu = (giaTri) => {
		const lyDo = giaTri.lyDoTuChoi;
		if (loaiTuChoi === 'DON') {
			const don = danhSachDon.find((d) => d.id === donDangTuChoi);
			setDanhSachDon(
				danhSachDon.map((d) => (d.id === donDangTuChoi ? { ...d, trangThai: 'Từ chối', ghiChu: lyDo } : d)),
			);
			ghiLichSu('từ chối', don.hoTen, lyDo);
			message.success('Đã từ chối đơn!');
		} else {
			const donDuocChonThucTe = danhSachDon.filter((d) => dongDuocChon.includes(d.id));
			const tenNhungNguoiBiTuChoi = donDuocChonThucTe.map((d) => d.hoTen).join(', ');

			setDanhSachDon(
				danhSachDon.map((d) => (dongDuocChon.includes(d.id) ? { ...d, trangThai: 'Từ chối', ghiChu: lyDo } : d)),
			);
			ghiLichSu('từ chối', tenNhungNguoiBiTuChoi, lyDo);
			message.success('Đã từ chối ' + dongDuocChon.length + ' đơn!');
			setDongDuocChon([]);
		}
		setTrangThaiModalTuChoi(false);
	};

	const xuLyDuyetNhiem = () => {
		const donDuocChonThucTe = danhSachDon.filter((d) => dongDuocChon.includes(d.id));
		const tenNhungNguoiDuocDuyet = donDuocChonThucTe.map((d) => d.hoTen).join(', ');

		setDanhSachDon(
			danhSachDon.map((d) => (dongDuocChon.includes(d.id) ? { ...d, trangThai: 'Đã duyệt', ghiChu: '' } : d)),
		);
		ghiLichSu('duyệt', tenNhungNguoiDuocDuyet);
		message.success('Đã duyệt ' + dongDuocChon.length + ' đơn!');
		setDongDuocChon([]);
	};

	const moModalTuChoiNhiem = () => {
		setLoaiTuChoi('NHIEU');
		formTuChoi.resetFields();
		setTrangThaiModalTuChoi(true);
	};

	const mauSacTrangThai = {
		'Chờ duyệt': 'blue',
		'Đã duyệt': 'green',
		'Từ chối': 'red',
	};

	const danhSachHienThi = danhSachDon.filter(
		(don) =>
			don.hoTen.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()) ||
			don.email.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()),
	);

	const cotDuLieu = [
		{
			title: 'Họ tên & Email',
			dataIndex: 'hoTen',
			key: 'hoTen',
			width: 220,
			render: (text, banGhi) => (
				<div>
					<strong style={{ color: '#262626' }}>{text}</strong>
					<br />
					<span style={{ color: '#8c8c8c', fontSize: '13px' }}>{banGhi.email}</span>
				</div>
			),
		},
		{
			title: 'Câu lạc bộ',
			dataIndex: 'idCLB',
			key: 'idCLB',
			width: 180,
			render: (id) => (
				<span style={{ color: '#595959' }}>{danhSachCLB.find((clb) => clb.id === id)?.ten || 'Không xác định'}</span>
			),
		},
		{ title: 'SĐT', dataIndex: 'sdt', key: 'sdt', width: 120, align: 'center' },
		{ title: 'Giới tính', dataIndex: 'gioiTinh', key: 'gioiTinh', width: 90, align: 'center' },
		{ title: 'Địa chỉ', dataIndex: 'diaChi', key: 'diaChi', width: 150, ellipsis: true },
		{ title: 'Sở trường', dataIndex: 'soTruong', key: 'soTruong', width: 180, ellipsis: true },
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 140,
			align: 'center',
			render: (trangThai, banGhi) => {
				const laChoDuyet = trangThai === 'Chờ duyệt';
				const tagView = (
					<Tag color={mauSacTrangThai[trangThai]} style={{ cursor: laChoDuyet ? 'pointer' : 'default' }}>
						{trangThai.toUpperCase()} {laChoDuyet && <DownOutlined style={{ fontSize: '10px', marginLeft: 4 }} />}
					</Tag>
				);

				if (laChoDuyet) {
					const menu = (
						<Menu>
							<Menu.Item key='approve' onClick={() => xuLyDuyetDon(banGhi.id)}>
								<span style={{ color: '#52c41a' }}>
									<CheckOutlined /> Duyệt đơn này
								</span>
							</Menu.Item>
							<Menu.Item key='reject' onClick={() => moModalTuChoi(banGhi.id)}>
								<span style={{ color: '#f5222d' }}>
									<CloseOutlined /> Từ chối đơn
								</span>
							</Menu.Item>
						</Menu>
					);
					return (
						<Dropdown overlay={menu} trigger={['click']}>
							{tagView}
						</Dropdown>
					);
				}
				return tagView;
			},
		},
		{
			title: 'Thao tác',
			key: 'thaoTac',
			width: 140,
			align: 'center',
			render: (_, banGhi) => (
				<Space size='middle'>
					<Tooltip title='Xem chi tiết'>
						<Button
							type='text'
							style={{ color: '#1890ff', padding: 0 }}
							icon={<EyeOutlined />}
							onClick={() => moModalSua(banGhi, true)}
						/>
					</Tooltip>
					<Tooltip title='Chỉnh sửa'>
						<Button
							type='text'
							style={{ color: '#faad14', padding: 0 }}
							icon={<EditOutlined />}
							onClick={() => moModalSua(banGhi, false)}
						/>
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm title='Xóa đơn đăng ký này?' onConfirm={() => xuLyXoa(banGhi.id)} okText='Xóa' cancelText='Hủy'>
							<Button type='text' danger style={{ padding: 0 }} icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: '8px 0' }}>
			<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Input.Search
					placeholder='Tìm kiếm theo tên hoặc email...'
					allowClear
					onChange={(e) => setTuKhoaTimKiem(e.target.value)}
					style={{ width: 320 }}
				/>
				<Space>
					<Button type='default' icon={<HistoryOutlined />} onClick={() => setTrangThaiDrawerLichSu(true)}>
						Lịch sử thao tác
					</Button>
					<Button type='primary' icon={<PlusOutlined />} onClick={() => moModalSua(null, false)}>
						Thêm đơn đăng ký
					</Button>
				</Space>
			</div>

			{dongDuocChon.length > 0 && (
				<Alert
					message={
						<Space>
							<span>
								Đã chọn <strong>{dongDuocChon.length}</strong> đơn đăng ký.
							</span>
							<Button
								type='primary'
								size='small'
								style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', marginLeft: 16 }}
								onClick={xuLyDuyetNhiem}
							>
								Duyệt {dongDuocChon.length} đơn
							</Button>
							<Button type='primary' danger size='small' onClick={moModalTuChoiNhiem}>
								Từ chối {dongDuocChon.length} đơn
							</Button>
							<Button type='link' size='small' onClick={() => setDongDuocChon([])}>
								Bỏ chọn
							</Button>
						</Space>
					}
					type='info'
					showIcon
					style={{ marginBottom: 16 }}
				/>
			)}

			<Table
				rowSelection={{
					selectedRowKeys: dongDuocChon,
					onChange: (khoa) => setDongDuocChon(khoa),
				}}
				columns={cotDuLieu}
				dataSource={danhSachHienThi}
				rowKey='id'
				pagination={{ pageSize: 5, showSizeChanger: false }}
				size='middle'
				scroll={{ x: 1100 }}
			/>

			<Modal
				title={cheDoXem ? 'Chi tiết Đơn đăng ký' : donDangSua ? 'Chỉnh sửa Đơn đăng ký' : 'Thêm Đơn đăng ký mới'}
				visible={trangThaiModalSua}
				onCancel={() => setTrangThaiModalSua(false)}
				onOk={() => {
					if (cheDoXem) {
						setTrangThaiModalSua(false);
					} else {
						formSua.submit();
					}
				}}
				okText={cheDoXem ? 'Đóng' : 'Lưu thông tin'}
				cancelText='Hủy'
				cancelButtonProps={{ style: { display: cheDoXem ? 'none' : 'inline-block' } }}
				centered
				destroyOnClose
				width={700}
			>
				<Form layout='vertical' form={formSua} onFinish={xuLyLuuSua} disabled={cheDoXem}>
					<div style={{ display: 'flex', gap: '16px' }}>
						<Form.Item name='hoTen' label='Họ và tên' rules={[{ required: true }]} style={{ flex: 1 }}>
							<Input />
						</Form.Item>
						<Form.Item name='gioiTinh' label='Giới tính' style={{ width: '120px' }}>
							<Select>
								<Select.Option value='Nam'>Nam</Select.Option>
								<Select.Option value='Nữ'>Nữ</Select.Option>
								<Select.Option value='Khác'>Khác</Select.Option>
							</Select>
						</Form.Item>
					</div>
					<div style={{ display: 'flex', gap: '16px' }}>
						<Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]} style={{ flex: 1 }}>
							<Input />
						</Form.Item>
						<Form.Item name='sdt' label='Số điện thoại' rules={[{ required: true }]} style={{ flex: 1 }}>
							<Input />
						</Form.Item>
					</div>
					<div style={{ display: 'flex', gap: '16px' }}>
						<Form.Item name='idCLB' label='Câu lạc bộ' rules={[{ required: true }]} style={{ flex: 1 }}>
							<Select>
								{danhSachCLB.map((clb) => (
									<Select.Option key={clb.id} value={clb.id}>
										{clb.ten}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='diaChi' label='Địa chỉ' style={{ flex: 1 }}>
							<Input />
						</Form.Item>
					</div>
					<Form.Item name='soTruong' label='Sở trường / Kỹ năng'>
						<Input />
					</Form.Item>
					<Form.Item name='lyDo' label='Lý do đăng ký'>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item name='trangThai' label='Trạng thái'>
						<Select disabled={cheDoXem}>
							<Select.Option value='Chờ duyệt'>Chờ duyệt</Select.Option>
							<Select.Option value='Đã duyệt'>Đã duyệt</Select.Option>
							<Select.Option value='Từ chối'>Từ chối</Select.Option>
						</Select>
					</Form.Item>
					{formSua.getFieldValue('trangThai') === 'Từ chối' && (
						<Form.Item name='ghiChu' label='Lý do từ chối'>
							<Input.TextArea rows={2} disabled style={{ color: '#cf1322', backgroundColor: '#fff1f0' }} />
						</Form.Item>
					)}
				</Form>
			</Modal>

			<Modal
				title='Xác nhận từ chối đơn'
				visible={trangThaiModalTuChoi}
				onCancel={() => setTrangThaiModalTuChoi(false)}
				onOk={() => formTuChoi.submit()}
				okText='Xác nhận từ chối'
				okButtonProps={{ danger: true }}
				cancelText='Hủy'
				centered
				destroyOnClose
			>
				<Alert
					message={`Đang từ chối ${loaiTuChoi === 'DON' ? '1' : dongDuocChon.length} đơn đăng ký.`}
					type='warning'
					showIcon
					style={{ marginBottom: 16 }}
				/>
				<Form layout='vertical' form={formTuChoi} onFinish={xuLyTuChoiThucSu}>
					<Form.Item
						name='lyDoTuChoi'
						label='Lý do từ chối (Bắt buộc)'
						rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối!' }]}
					>
						<Input.TextArea rows={4} placeholder='Nhập lý do để ứng viên biết...' />
					</Form.Item>
				</Form>
			</Modal>

			<Drawer
				title='Lịch sử thao tác duyệt đơn'
				placement='right'
				onClose={() => setTrangThaiDrawerLichSu(false)}
				visible={trangThaiDrawerLichSu}
				width={450}
			>
				{danhSachLichSu.length === 0 && (
					<p style={{ color: '#999', textAlign: 'center', marginTop: '50%' }}>Chưa có lịch sử thao tác nào.</p>
				)}
				{danhSachLichSu.length > 0 && (
					<Timeline>
						{danhSachLichSu.map((ls) => (
							<Timeline.Item key={ls.id} color={ls.noiDung.includes('duyệt') ? 'green' : 'red'}>
								<div style={{ marginBottom: 4, color: '#8c8c8c', fontSize: '12px' }}>{ls.thoiGian}</div>
								<div style={{ margin: 0, color: '#262626' }}>{ls.noiDung}</div>
							</Timeline.Item>
						))}
					</Timeline>
				)}
			</Drawer>
		</div>
	);
};

export default QuanLyDonDangKy;
