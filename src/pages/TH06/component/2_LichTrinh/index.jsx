import React, { useState } from 'react';
import { Row, Col, Select, Button, Card, Statistic, Empty, message } from 'antd';
import { PlusOutlined, WalletOutlined, FlagOutlined } from '@ant-design/icons';
import TrucThoiGian from './TrucThoiGian';
import { danhSachDiemDen } from '../../duLieuGia';

const { Option } = Select;

// Nhận lichTrinh và setLichTrinh từ props thay vì tự tạo useState
const LichTrinh = ({ lichTrinh, setLichTrinh }) => {
	const [dangChon, setDangChon] = useState(null);

	const handleThem = () => {
		if (!dangChon) {
			message.warning('Bạn chưa chọn điểm đến nào từ danh sách!');
			return;
		}
		const diemMoi = danhSachDiemDen.find((d) => d.id === dangChon);

		setLichTrinh([...lichTrinh, { ...diemMoi, uniqueId: Date.now() }]);
		message.success(`Đã thêm ${diemMoi.ten} vào hành trình`);
	};

	const handleXoa = (index) => {
		const mangMoi = [...lichTrinh];
		mangMoi.splice(index, 1);
		setLichTrinh(mangMoi);
		message.info('Đã xóa điểm đến');
	};

	const handleSapXep = (index, huong) => {
		const mangMoi = [...lichTrinh];
		const indexDich = huong === 'up' ? index - 1 : index + 1;

		[mangMoi[index], mangMoi[indexDich]] = [mangMoi[indexDich], mangMoi[index]];
		setLichTrinh(mangMoi);
	};

	const tongTien = lichTrinh.reduce((sum, item) => sum + item.chiPhi.tong, 0);

	return (
		<div style={{ padding: '15px 0' }}>
			<Row gutter={[24, 24]}>
				<Col xs={24} md={9}>
					<div style={{ position: 'sticky', top: 10 }}>
						<Card title='Thiết lập kế hoạch' bordered={false} className='shadow-sm'>
							<div style={{ marginBottom: 20 }}>
								<p style={{ fontWeight: 500 }}>Chọn điểm dừng tiếp theo:</p>
								<Select
									showSearch
									size='large'
									style={{ width: '100%', marginBottom: 15 }}
									placeholder='Gõ để tìm điểm đến...'
									onChange={setDangChon}
									value={dangChon}
								>
									{danhSachDiemDen.map((item) => (
										<Option key={item.id} value={item.id}>
											{item.ten}
										</Option>
									))}
								</Select>
								<Button
									type='primary'
									size='large'
									block
									icon={<PlusOutlined />}
									onClick={handleThem}
									style={{ borderRadius: 6, height: 45, background: '#1890ff' }}
								>
									Thêm vào lịch trình
								</Button>
							</div>

							<Card style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 8 }}>
								<Row>
									<Col span={10}>
										<Statistic title='Điểm dừng' value={lichTrinh.length} prefix={<FlagOutlined />} />
									</Col>
									<Col span={14}>
										<Statistic
											title='Dự toán chi phí'
											value={tongTien}
											suffix='đ'
											valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
										/>
									</Col>
								</Row>
							</Card>
						</Card>
					</div>
				</Col>

				<Col xs={24} md={15}>
					<Card title='Hành trình chi tiết' bordered={false}>
						{lichTrinh.length > 0 ? (
							<TrucThoiGian lichTrinh={lichTrinh} onXoa={handleXoa} onSapXep={handleSapXep} />
						) : (
							<Empty description='Chưa có điểm đến nào. Hãy thêm từ cột bên trái!' />
						)}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default LichTrinh;
