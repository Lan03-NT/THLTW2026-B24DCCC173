import React, { useState } from 'react';
import { Table, Button, Input, Space, Typography, Modal, Form, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const QuanLyThe = () => {
	const [danhSachThe, setDanhSachThe] = useState([
		{ id: '1', ten: 'Skincare', soBai: 45 },
		{ id: '2', ten: 'Makeup', soBai: 22 },
		{ id: '3', ten: 'Trị mụn', soBai: 14 },
	]);

	const COT = [
		{ title: 'Tên thẻ tag', dataIndex: 'ten', key: 'ten', fontWeight: 600 },
		{ title: 'Số bài viết sử dụng', dataIndex: 'soBai', key: 'soBai' },
		{
			title: 'Hành động',
			render: (record: any) => (
				<Space>
					<Button type='link' icon={<EditOutlined />}>
						Sửa
					</Button>
					<Popconfirm title='Xóa thẻ này sẽ gỡ khỏi toàn bộ bài viết liên quan. Tiếp tục?'>
						<Button type='link' danger icon={<DeleteOutlined />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 40, background: '#fff', borderRadius: 16 }}>
			<Title level={2} style={{ fontFamily: "'Playfair Display', serif", marginBottom: 30 }}>
				Quản lý thẻ danh mục
			</Title>

			<Space style={{ marginBottom: 25 }}>
				<Input placeholder='Tên thẻ mới...' style={{ width: 300, height: 45 }} />
				<Button type='primary' icon={<PlusOutlined />} style={{ height: 45, background: '#c41d7f', borderRadius: 8 }}>
					Thêm thẻ mới
				</Button>
			</Space>

			<Table dataSource={danhSachThe} columns={COT} rowKey='id' />
		</div>
	);
};

export default QuanLyThe;
