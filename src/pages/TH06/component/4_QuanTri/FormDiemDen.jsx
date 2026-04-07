import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Rate, Row, Col, message } from 'antd';

const FormDiemDen = ({ visible, onCancel, onCreate, editingData }) => {
	const [form] = Form.useForm();

	// Reset hoặc đổ dữ liệu vào form khi mở Modal
	useEffect(() => {
		if (visible) {
			if (editingData) form.setFieldsValue(editingData);
			else form.resetFields();
		}
	}, [visible, editingData, form]);

	return (
		<Modal
			visible={visible}
			title={editingData ? 'Chỉnh sửa điểm đến' : 'Thêm điểm đến mới'}
			okText={editingData ? 'Cập nhật' : 'Thêm mới'}
			cancelText='Hủy'
			onCancel={onCancel}
			onOk={() => {
				form.validateFields().then((values) => {
					onCreate(values);
				});
			}}
			width={600}
		>
			<Form form={form} layout='vertical'>
				<Form.Item name='ten' label='Tên địa điểm' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
					<Input placeholder='Ví dụ: Đảo Nam Du...' />
				</Form.Item>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name='loaiHinh' label='Loại hình' rules={[{ required: true }]}>
							<Select>
								<Select.Option value='biển'>Biển</Select.Option>
								<Select.Option value='núi'>Núi</Select.Option>
								<Select.Option value='thành phố'>Thành phố</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='thoiGianThamQuan' label='Thời gian tham quan' rules={[{ required: true }]}>
							<Input placeholder='2 ngày 1 đêm' />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item name='moTa' label='Mô tả ngắn'>
					<Input.TextArea rows={2} />
				</Form.Item>

				<Row gutter={16}>
					<Col span={8}>
						<Form.Item name={['chiPhi', 'anUong']} label='Tiền ăn uống'>
							<InputNumber style={{ width: '100%' }} step={100000} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name={['chiPhi', 'luuTru']} label='Tiền lưu trú'>
							<InputNumber style={{ width: '100%' }} step={100000} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name={['chiPhi', 'diChuyen']} label='Tiền di chuyển'>
							<InputNumber style={{ width: '100%' }} step={100000} />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item name='danhGia' label='Đánh giá (Rating)'>
					<Rate allowHalf />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormDiemDen;
