import React, { useState, useRef } from 'react';
import {
	Table,
	Button,
	Space,
	Modal,
	Form,
	Input,
	DatePicker,
	Switch,
	message,
	Popconfirm,
	Avatar,
	Tag,
	Tooltip,
} from 'antd';
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	EyeOutlined,
	UserOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const duLieuKhoiTao = [
	{
		id: 1,
		tenCLB: 'CLB Lập trình PTIT',
		anhDaiDien: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Code',
		ngayThanhLap: '2015-09-15',
		moTa: 'Nơi hội tụ các pro coder</i>',
		chuNhiem: 'Nguyễn Minh Anh',
		dangHoatDong: true,
	},
	{
		id: 2,
		tenCLB: 'CLB Âm nhạc',
		anhDaiDien: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Music',
		ngayThanhLap: '2018-03-20',
		moTa: 'Giao lưu âm nhạc, nghệ thuật',
		chuNhiem: 'Trần Thu Phương',
		dangHoatDong: false,
	},
];

const duLieuThanhVienMau = [
	{ id: 1, idCLB: 1, ten: 'Nguyễn Minh Anh', vaiTro: 'Chủ nhiệm' },
	{ id: 2, idCLB: 1, ten: 'Đào Gia Bình', vaiTro: 'Thành viên' },
	{ id: 3, idCLB: 2, ten: 'Trần Thu Phương', vaiTro: 'Chủ nhiệm' },
	{ id: 4, idCLB: 2, ten: 'Phạm Tiến Đạt', vaiTro: 'Thành viên' },
];

const QuanLyCauLacBo = () => {
	const [danhSachCLB, setDanhSachCLB] = useState(duLieuKhoiTao);
	const [trangThaiModal, setTrangThaiModal] = useState(false);
	const [trangThaiModalThanhVien, setTrangThaiModalThanhVien] = useState(false);
	const [clbDangSua, setClbDangSua] = useState(null);
	const [clbDangXem, setClbDangXem] = useState(null);
	const [form] = Form.useForm();
	const inputTimKiem = useRef(null);

	const moModalSua = (banGhi = null) => {
		setClbDangSua(banGhi);
		if (banGhi) {
			form.setFieldsValue({
				...banGhi,
				ngayThanhLap: dayjs(banGhi.ngayThanhLap),
			});
		} else {
			form.resetFields();
			form.setFieldsValue({ dangHoatDong: true });
		}
		setTrangThaiModal(true);
	};

	const moModalThanhVien = (banGhi) => {
		setClbDangXem(banGhi);
		setTrangThaiModalThanhVien(true);
	};

	const xuLyLuu = (giaTri) => {
		const duLieuDaXuly = {
			...giaTri,
			ngayThanhLap: giaTri.ngayThanhLap.format('YYYY-MM-DD'),
		};

		if (clbDangSua) {
			setDanhSachCLB(danhSachCLB.map((clb) => (clb.id === clbDangSua.id ? { ...clb, ...duLieuDaXuly } : clb)));
			message.success('Cập nhật Câu lạc bộ thành công!');
		} else {
			setDanhSachCLB([...danhSachCLB, { id: Date.now(), ...duLieuDaXuly }]);
			message.success('Thêm Câu lạc bộ thành công!');
		}
		setTrangThaiModal(false);
	};

	const xuLyXoa = (id) => {
		setDanhSachCLB(danhSachCLB.filter((clb) => clb.id !== id));
		message.success('Đã xóa Câu lạc bộ!');
	};

	const layPropsTimKiemCot = (dataIndex, tenCot) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={inputTimKiem}
					placeholder={`Tìm ${tenCot}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => confirm()}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button type='primary' onClick={() => confirm()} icon={<SearchOutlined />} size='small' style={{ width: 90 }}>
						Tìm kiếm
					</Button>
					<Button onClick={() => clearFilters()} size='small' style={{ width: 90 }}>
						Làm mới
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => inputTimKiem.current?.select(), 100);
			}
		},
	});

	const cotDuLieu = [
		{
			title: 'Ảnh',
			dataIndex: 'anhDaiDien',
			key: 'anhDaiDien',
			render: (duongDan) => (
				<Avatar
					src={duongDan}
					shape='circle'
					size='large'
					style={{ border: '1px solid #f0f0f0' }}
					icon={<UserOutlined />}
				/>
			),
		},
		{
			title: 'Tên Câu lạc bộ',
			dataIndex: 'tenCLB',
			key: 'tenCLB',
			sorter: (a, b) => a.tenCLB.localeCompare(b.tenCLB),
			...layPropsTimKiemCot('tenCLB', 'Tên CLB'),
			render: (text) => <strong style={{ color: '#262626' }}>{text}</strong>,
		},
		{
			title: 'Ngày thành lập',
			dataIndex: 'ngayThanhLap',
			key: 'ngayThanhLap',
			sorter: (a, b) => new Date(a.ngayThanhLap) - new Date(b.ngayThanhLap),
		},
		{
			title: 'Mô tả',
			dataIndex: 'moTa',
			key: 'moTa',
			render: (htmlText) => (
				<Tooltip title={<div dangerouslySetInnerHTML={{ __html: htmlText }} />}>
					<div
						dangerouslySetInnerHTML={{ __html: htmlText }}
						style={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
					/>
				</Tooltip>
			),
		},
		{
			title: 'Chủ nhiệm',
			dataIndex: 'chuNhiem',
			key: 'chuNhiem',
			...layPropsTimKiemCot('chuNhiem', 'Chủ nhiệm'),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'dangHoatDong',
			key: 'dangHoatDong',
			filters: [
				{ text: 'Đang hoạt động', value: true },
				{ text: 'Tạm dừng', value: false },
			],
			onFilter: (value, record) => record.dangHoatDong === value,
			render: (dangHoatDong) => (
				<Tag color={dangHoatDong ? 'success' : 'error'} style={{ borderRadius: '4px' }}>
					{dangHoatDong ? 'Đang hoạt động' : 'Tạm dừng'}
				</Tag>
			),
		},
		{
			title: 'Thao tác',
			key: 'thaoTac',
			render: (_, banGhi) => (
				<Space size='small'>
					<Button
						type='text'
						style={{ color: '#1890ff' }}
						icon={<EyeOutlined />}
						onClick={() => moModalThanhVien(banGhi)}
					/>
					<Button type='text' style={{ color: '#faad14' }} icon={<EditOutlined />} onClick={() => moModalSua(banGhi)} />
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa CLB này?'
						onConfirm={() => xuLyXoa(banGhi.id)}
						okText='Xóa'
						cancelText='Hủy'
					>
						<Button type='text' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const cotThanhVien = [
		{ title: 'Họ tên', dataIndex: 'ten', key: 'ten' },
		{
			title: 'Vai trò',
			dataIndex: 'vaiTro',
			key: 'vaiTro',
			render: (vaiTro) => <Tag color={vaiTro === 'Chủ nhiệm' ? 'volcano' : 'blue'}>{vaiTro}</Tag>,
		},
	];

	return (
		<div style={{ padding: '8px 0' }}>
			<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => moModalSua()} style={{ borderRadius: '6px' }}>
					Thêm Câu lạc bộ
				</Button>
			</div>

			<Table
				columns={cotDuLieu}
				dataSource={danhSachCLB}
				rowKey='id'
				pagination={{ pageSize: 5, showSizeChanger: false }}
				size='middle'
			/>

			<Modal
				title={clbDangSua ? 'Chỉnh sửa Câu lạc bộ' : 'Thêm mới Câu lạc bộ'}
				visible={trangThaiModal}
				onCancel={() => setTrangThaiModal(false)}
				onOk={() => form.submit()}
				okText='Lưu'
				cancelText='Hủy'
				centered
				destroyOnClose
			>
				<Form layout='vertical' form={form} onFinish={xuLyLuu}>
					<Form.Item name='anhDaiDien' label='Link ảnh đại diện'>
						<Input placeholder='Nhập đường dẫn URL ảnh' />
					</Form.Item>
					<Form.Item
						name='tenCLB'
						label='Tên Câu lạc bộ'
						rules={[{ required: true, message: 'Vui lòng nhập tên CLB!' }]}
					>
						<Input placeholder='Nhập tên CLB' />
					</Form.Item>
					<Form.Item
						name='chuNhiem'
						label='Tên Chủ nhiệm'
						rules={[{ required: true, message: 'Vui lòng nhập tên Chủ nhiệm!' }]}
					>
						<Input placeholder='Nhập tên chủ nhiệm' />
					</Form.Item>
					<Form.Item
						name='ngayThanhLap'
						label='Ngày thành lập'
						rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
					>
						<DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
					</Form.Item>
					<Form.Item name='moTa' label='Mô tả (HTML)'>
						<Input.TextArea rows={4} placeholder='Nhập mô tả (Hỗ trợ thẻ HTML như <b>, <i>...)' />
					</Form.Item>
					<Form.Item name='dangHoatDong' label='Hoạt động' valuePropName='checked'>
						<Switch checkedChildren='Có' unCheckedChildren='Không' />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title={`Danh sách thành viên - ${clbDangXem?.tenCLB}`}
				visible={trangThaiModalThanhVien}
				onCancel={() => setTrangThaiModalThanhVien(false)}
				footer={[
					<Button key='dong' onClick={() => setTrangThaiModalThanhVien(false)}>
						Đóng
					</Button>,
				]}
				centered
			>
				<Table
					columns={cotThanhVien}
					dataSource={duLieuThanhVienMau.filter((tv) => tv.idCLB === clbDangXem?.id)}
					rowKey='id'
					pagination={false}
					size='small'
				/>
			</Modal>
		</div>
	);
};

export default QuanLyCauLacBo;
