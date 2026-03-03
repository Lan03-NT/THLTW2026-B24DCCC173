import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm } from 'antd';

const { Search } = Input;

const initialProducts = [
	{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
	{ id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
	{ id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
	{ id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
	{ id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

const ProductManager = () => {
	const [products, setProducts] = useState(initialProducts);
	const [visible, setVisible] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [form] = Form.useForm();

	const handleDelete = (id) => {
		setProducts(products.filter((item) => item.id !== id));
		message.success('Đã xóa sản phẩm');
	};

	const handleAdd = () => {
		form.validateFields().then((values) => {
			const newProduct = {
				id: Date.now(),
				...values,
			};

			setProducts([...products, newProduct]);
			message.success('Thêm sản phẩm thành công');
			form.resetFields();
			setVisible(false);
		});
	};

	const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

	const columns = [
		{
			title: 'STT',
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			render: (price) => price.toLocaleString('vi-VN') + ' đ',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
		},
		{
			title: 'Thao tác',
			align: 'center',
			render: (_, record) => (
				<Popconfirm
					title='Bạn có chắc muốn xóa sản phẩm này?'
					onConfirm={() => handleDelete(record.id)}
					okText='Xóa'
					cancelText='Hủy'
				>
					<Button danger type='primary'>
						Xóa
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<div style={{ padding: 24 }}>
			<h1
				style={{
					textAlign: 'center',
					fontSize: 32,
					marginBottom: 24,
				}}
			>
				QUẢN LÝ SẢN PHẨM
			</h1>

			{/* Tìm kiếm */}
			<Search
				placeholder='Tìm theo tên sản phẩm'
				style={{ width: 300, marginBottom: 16 }}
				allowClear
				onChange={(e) => setSearchText(e.target.value)}
			/>

			<br />

			{/* Thêm */}
			<Button type='primary' style={{ marginBottom: 16 }} onClick={() => setVisible(true)}>
				Thêm sản phẩm
			</Button>

			{/* Bảng */}
			<Table columns={columns} dataSource={filteredProducts} rowKey='id' pagination={false} />

			{/* Modal thêm */}
			<Modal
				title='Thêm sản phẩm mới'
				visible={visible}
				onOk={handleAdd}
				onCancel={() => setVisible(false)}
				okText='Thêm'
				cancelText='Hủy'
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						label='Tên sản phẩm'
						name='name'
						rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Giá'
						name='price'
						rules={[
							{ required: true, message: 'Vui lòng nhập giá' },
							{ type: 'number', min: 1, message: 'Giá phải là số dương' },
						]}
					>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item
						label='Số lượng'
						name='quantity'
						rules={[
							{ required: true, message: 'Vui lòng nhập số lượng' },
							{ type: 'number', min: 1, message: 'Số lượng phải là số nguyên dương' },
						]}
					>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ProductManager;
