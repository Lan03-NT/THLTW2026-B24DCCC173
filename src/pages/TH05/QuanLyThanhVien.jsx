import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Select, Tag, message, Alert, Tooltip, Input } from 'antd';
import { SwapOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const QuanLyThanhVien = () => {
	const danhSachCLB = [
		{ id: 1, ten: 'CLB Lập trình PTIT' },
		{ id: 2, ten: 'CLB Âm nhạc' },
		{ id: 3, ten: 'CLB Tiếng Anh' },
	];

	const duLieuGoc = [
		{
			id: 'M01',
			hoTen: 'Lê Mai Phương',
			email: 'phuong.le@gmail.com',
			sdt: '0123456789',
			gioiTinh: 'Nữ',
			idCLB: 2,
			ngayGiaNhap: '01/04/2025',
		},
		{
			id: 'M02',
			hoTen: 'Nguyễn Văn Hoàng',
			email: 'hoang.nguyen@gmail.com',
			sdt: '0987654321',
			gioiTinh: 'Nam',
			idCLB: 1,
			ngayGiaNhap: '05/04/2025',
		},
		{
			id: 'M03',
			hoTen: 'Đỗ Thùy Linh',
			email: 'linh.do@gmail.com',
			sdt: '0911222333',
			gioiTinh: 'Nữ',
			idCLB: 1,
			ngayGiaNhap: '06/04/2025',
		},
	];

	const [danhSachThanhVien, setDanhSachThanhVien] = useState(duLieuGoc);
	const [dongDuocChon, setDongDuocChon] = useState([]);
	const [clbLoc, setClbLoc] = useState(null);
	const [trangThaiModalChuyen, setTrangThaiModalChuyen] = useState(false);
	const [formChuyen] = Form.useForm();

	const xuLyChuyenCLB = (giaTri) => {
		const idClbMoi = giaTri.clbMoi;
		setDanhSachThanhVien(
			danhSachThanhVien.map((tv) => (dongDuocChon.includes(tv.id) ? { ...tv, idCLB: idClbMoi } : tv)),
		);
		message.success('Đã chuyển thành công ' + dongDuocChon.length + ' thành viên!');
		setDongDuocChon([]);
		setTrangThaiModalChuyen(false);
	};

	const danhSachHienThi = clbLoc ? danhSachThanhVien.filter((tv) => tv.idCLB === clbLoc) : danhSachThanhVien;

	const cotDuLieu = [
		{
			title: 'Thành viên',
			dataIndex: 'hoTen',
			key: 'hoTen',
			render: (text, banGhi) => (
				<Space>
					<UserOutlined style={{ color: '#bfbfbf' }} />
					<div>
						<div style={{ fontWeight: 'bold', color: '#262626' }}>{text}</div>
						<div style={{ fontSize: '12px', color: '#8c8c8c' }}>{banGhi.email}</div>
					</div>
				</Space>
			),
		},
		{
			title: 'Câu lạc bộ',
			dataIndex: 'idCLB',
			key: 'idCLB',
			align: 'center',
			render: (id) => (
				<Tag color='default' style={{ borderRadius: '12px', padding: '0 12px', border: '1px solid #d9d9d9' }}>
					{danhSachCLB.find((clb) => clb.id === id)?.ten}
				</Tag>
			),
		},
		{ title: 'Số điện thoại', dataIndex: 'sdt', key: 'sdt', align: 'center' },
		{ title: 'Giới tính', dataIndex: 'gioiTinh', key: 'gioiTinh', align: 'center' },
		{ title: 'Ngày gia nhập', dataIndex: 'ngayGiaNhap', key: 'ngayGiaNhap', align: 'center' },
		{
			title: 'Thao tác',
			key: 'thaoTac',
			align: 'center',
			render: (_, banGhi) => (
				<Tooltip title='Chuyển CLB'>
					<Button
						type='text'
						icon={<SwapOutlined />}
						style={{ color: '#1890ff' }}
						onClick={() => {
							setDongDuocChon([banGhi.id]);
							setTrangThaiModalChuyen(true);
						}}
					/>
				</Tooltip>
			),
		},
	];

	return (
		<div style={{ padding: '8px 0' }}>
			<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Space>
					<span style={{ color: '#595959' }}>Lọc đơn vị:</span>
					<Select allowClear placeholder='Chọn Câu lạc bộ' style={{ width: 220 }} onChange={(val) => setClbLoc(val)}>
						{danhSachCLB.map((clb) => (
							<Select.Option key={clb.id} value={clb.id}>
								{clb.ten}
							</Select.Option>
						))}
					</Select>
				</Space>

				<Button
					type='primary'
					icon={<SwapOutlined />}
					disabled={dongDuocChon.length === 0}
					onClick={() => setTrangThaiModalChuyen(true)}
					style={{ borderRadius: '4px' }}
				>
					Chuyển CLB {dongDuocChon.length > 0 ? `(${dongDuocChon.length})` : ''}
				</Button>
			</div>

			<Table
				rowSelection={{
					selectedRowKeys: dongDuocChon,
					onChange: (khoa) => setDongDuocChon(khoa),
				}}
				columns={cotDuLieu}
				dataSource={danhSachHienThi}
				rowKey='id'
				pagination={{ pageSize: 5 }}
				size='middle'
				bordered={false}
			/>

			<Modal
				title='Cập nhật Câu lạc bộ'
				visible={trangThaiModalChuyen}
				onCancel={() => setTrangThaiModalChuyen(false)}
				onOk={() => formChuyen.submit()}
				okText='Xác nhận'
				cancelText='Hủy'
				centered
				destroyOnClose
			>
				<div style={{ marginBottom: 20 }}>
					<Alert message={`Đang thay đổi CLB cho ${dongDuocChon.length} thành viên.`} type='info' showIcon />
				</div>
				<Form layout='vertical' form={formChuyen} onFinish={xuLyChuyenCLB}>
					<Form.Item
						name='clbMoi'
						label='Chọn Câu lạc bộ đích'
						rules={[{ required: true, message: 'Vui lòng chọn CLB!' }]}
					>
						<Select placeholder='Chọn từ danh sách'>
							{danhSachCLB.map((clb) => (
								<Select.Option key={clb.id} value={clb.id}>
									{clb.ten}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default QuanLyThanhVien;
