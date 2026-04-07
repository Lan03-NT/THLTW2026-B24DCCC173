import React, { useState } from 'react';
import { Button, Table, Space, Popconfirm, message, Typography, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ThongKe from './ThongKe';
import FormDiemDen from './FormDiemDen';
import { danhSachDiemDen } from '../../duLieuGia';

const { Title, Text } = Typography;

const QuanTri = () => {
	const [data, setData] = useState(danhSachDiemDen);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState(null);

	const handleDelete = (id) => {
		setData(data.filter((item) => item.id !== id));
		message.success('Đã xóa địa điểm thành công');
	};

	const handleSave = (values) => {
		const tongMoi = (values.chiPhi?.anUong || 0) + (values.chiPhi?.luuTru || 0) + (values.chiPhi?.diChuyen || 0);

		if (editingItem) {
			const newData = data.map((item) =>
				item.id === editingItem.id ? { ...item, ...values, chiPhi: { ...values.chiPhi, tong: tongMoi } } : item,
			);
			setData(newData);
			message.success('Cập nhật thành công');
		} else {
			const newItem = {
				...values,
				id: Date.now().toString(),
				chiPhi: { ...values.chiPhi, tong: tongMoi },
				hinhAnh: 'https://via.placeholder.com/150',
			};
			setData([newItem, ...data]);
			message.success('Thêm mới thành công');
		}
		setIsModalOpen(false);
	};

	const columns = [
		{
			title: 'TÊN ĐỊA ĐIỂM',
			dataIndex: 'ten',
			key: 'ten',
			align: 'light',
			render: (text, record) => (
				<Space>
					<img src={record.hinhAnh} style={{ width: 40, height: 30, borderRadius: 4, objectFit: 'cover' }} alt='' />
					<Text strong>{text}</Text>
				</Space>
			),
		},
		{
			title: 'LOẠI HÌNH',
			dataIndex: 'loaiHinh',
			key: 'loaiHinh',
			align: 'center',
			render: (text) => {
				let color = text === 'biển' ? 'blue' : text === 'núi' ? 'green' : 'orange';
				return (
					<Tag color={color} style={{ borderRadius: 10, padding: '0 10px' }}>
						{text?.toUpperCase()}
					</Tag>
				);
			},
		},
		{
			title: 'TỔNG CHI PHÍ',
			dataIndex: ['chiPhi', 'tong'],
			key: 'tongChiPhi',
			align: 'center',
			render: (val) => (
				<Text strong style={{ color: '#cf1322' }}>
					{val?.toLocaleString()} đ
				</Text>
			),
			sorter: (a, b) => (a.chiPhi?.tong || 0) - (b.chiPhi?.tong || 0),
		},
		{
			title: 'THỜI GIAN',
			dataIndex: 'thoiGianThamQuan',
			key: 'time',
			align: 'center',
			render: (text) => <Text type='secondary'>{text}</Text>,
		},
		{
			title: 'THAO TÁC',
			key: 'action',
			align: 'center',
			render: (_, record) => (
				<Space size='small'>
					<Button
						type='text'
						icon={<EditOutlined style={{ color: '#1890ff' }} />}
						onClick={() => {
							setEditingItem(record);
							setIsModalOpen(true);
						}}
					/>
					<Popconfirm title='Xóa địa điểm này?' onConfirm={() => handleDelete(record.id)} okText='Xóa' cancelText='Hủy'>
						<Button type='text' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ background: '#fff', borderRadius: 12, padding: '16px' }}>
			<ThongKe />

			<div
				style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, padding: '0 8px', marginTop: 20 }}
			>
				<Title level={4} style={{ margin: 0 }}>
					Quản lý danh sách điểm đến
				</Title>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					style={{ borderRadius: 8, height: 40, background: '#1890ff', boxShadow: '0 2px 4px rgba(24,144,255,0.3)' }}
					onClick={() => {
						setEditingItem(null);
						setIsModalOpen(true);
					}}
				>
					Thêm địa điểm mới
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={data}
				rowKey='id'
				pagination={{ pageSize: 5 }}
				style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}
			/>

			<FormDiemDen
				visible={isModalOpen}
				editingData={editingItem}
				onCancel={() => setIsModalOpen(false)}
				onCreate={handleSave}
			/>
		</div>
	);
};

export default QuanTri;
