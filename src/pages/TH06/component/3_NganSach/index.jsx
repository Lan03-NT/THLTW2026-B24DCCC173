import React, { useState } from 'react';
import {
	Row,
	Col,
	Card,
	Statistic,
	Alert,
	Progress,
	InputNumber,
	Typography,
	Space,
	Divider,
	Avatar,
	List,
} from 'antd';
import {
	WalletOutlined,
	FireOutlined,
	HomeOutlined,
	CarOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	BulbOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const NganSach = ({ lichTrinh }) => {
	const [nganSachChoPhep, setNganSachChoPhep] = useState(15000000);

	if (!lichTrinh || lichTrinh.length === 0) {
		return (
			<div style={{ padding: '100px 0', textAlign: 'center', background: '#fff', borderRadius: 8 }}>
				<WalletOutlined style={{ fontSize: 60, color: '#d9d9d9', marginBottom: 16 }} />
				<Title level={4} style={{ color: '#8c8c8c' }}>
					Chưa có dữ liệu ngân sách
				</Title>
				<Text type='secondary'>Hãy qua tab "Lịch trình của tôi" để thêm các điểm đến nhé!</Text>
			</div>
		);
	}

	let tongAnUong = 0;
	let tongLuuTru = 0;
	let tongDiChuyen = 0;
	let tongChiPhi = 0;

	lichTrinh.forEach((item) => {
		tongAnUong += item.chiPhi.anUong;
		tongLuuTru += item.chiPhi.luuTru;
		tongDiChuyen += item.chiPhi.diChuyen;
		tongChiPhi += item.chiPhi.tong;
	});

	const vuotNganSach = tongChiPhi > nganSachChoPhep;
	const phanTramChiTieu = Math.round((tongChiPhi / nganSachChoPhep) * 100) || 0;

	const phanTramAnUong = Math.round((tongAnUong / tongChiPhi) * 100) || 0;
	const phanTramLuuTru = Math.round((tongLuuTru / tongChiPhi) * 100) || 0;
	const phanTramDiChuyen = Math.round((tongDiChuyen / tongChiPhi) * 100) || 0;

	const maxChiPhi = Math.max(tongAnUong, tongLuuTru, tongDiChuyen);
	let loiKhuyen = '';
	if (maxChiPhi === tongAnUong)
		loiKhuyen = 'Bạn đang chi khá nhiều cho Ăn uống. Có thể thử các quán ăn địa phương để tiết kiệm hơn!';
	else if (maxChiPhi === tongLuuTru)
		loiKhuyen = 'Chi phí Lưu trú đang chiếm phần lớn. Thử săn sale trên Agoda/Booking xem sao nhé!';
	else loiKhuyen = 'Việc di chuyển đang ngốn khá nhiều tiền. Đặt vé xe/máy bay sớm sẽ giúp tối ưu ngân sách đấy!';

	return (
		<div style={{ padding: '10px 0' }}>
			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false} className='shadow-sm' style={{ borderRadius: 10 }}>
						<Statistic
							title='Tổng ngân sách cần có'
							value={tongChiPhi}
							suffix='đ'
							valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
							prefix={<WalletOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false} className='shadow-sm' style={{ borderRadius: 10 }}>
						<Statistic
							title='Ăn uống'
							value={tongAnUong}
							suffix='đ'
							valueStyle={{ color: '#fa8c16' }}
							prefix={<FireOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false} className='shadow-sm' style={{ borderRadius: 10 }}>
						<Statistic
							title='Lưu trú'
							value={tongLuuTru}
							suffix='đ'
							valueStyle={{ color: '#722ed1' }}
							prefix={<HomeOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card bordered={false} className='shadow-sm' style={{ borderRadius: 10 }}>
						<Statistic
							title='Di chuyển'
							value={tongDiChuyen}
							suffix='đ'
							valueStyle={{ color: '#13c2c2' }}
							prefix={<CarOutlined />}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[24, 24]}>
				<Col xs={24} md={10}>
					<Card
						title='Quản trị rủi ro tài chính'
						bordered={false}
						className='shadow-sm'
						style={{ borderRadius: 10, height: '100%' }}
					>
						<div style={{ marginBottom: 20 }}>
							<Text type='secondary' style={{ display: 'block', marginBottom: 8 }}>
								Hạn mức tối đa bạn muốn chi tiêu:
							</Text>
							<InputNumber
								style={{ width: '100%', fontSize: 20, fontWeight: 'bold', color: '#333' }}
								size='large'
								min={0}
								step={500000}
								value={nganSachChoPhep}
								onChange={(val) => setNganSachChoPhep(val || 0)}
								formatter={(value) => `${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							/>
						</div>

						{vuotNganSach ? (
							<Alert
								message='Vượt Hạn Mức!'
								description={`Hành trình đang âm mất ${Math.abs(nganSachChoPhep - tongChiPhi).toLocaleString()} đ`}
								type='error'
								showIcon
							/>
						) : (
							<Alert
								message='Ngân sách An Toàn'
								description={`Còn dư ${(nganSachChoPhep - tongChiPhi).toLocaleString()} đ`}
								type='success'
								showIcon
							/>
						)}

						<div style={{ textAlign: 'center', marginTop: 40 }}>
							<Progress
								type='dashboard'
								percent={phanTramChiTieu}
								status={vuotNganSach ? 'exception' : 'normal'}
								strokeColor={vuotNganSach ? '#ff4d4f' : { '0%': '#108ee9', '100%': '#87d068' }}
								strokeWidth={10}
								format={(percent) => (
									<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<span style={{ color: vuotNganSach ? '#cf1322' : '#3f8600', fontSize: 32, fontWeight: 'bold' }}>
											{percent}%
										</span>
										<span style={{ fontSize: 12, color: '#8c8c8c' }}>Đã dùng</span>
									</div>
								)}
								size={200}
							/>
						</div>
					</Card>
				</Col>

				<Col xs={24} md={14}>
					<Card
						title='Phân tích luồng tiền'
						bordered={false}
						className='shadow-sm'
						style={{ borderRadius: 10, height: '100%' }}
					>
						<Alert
							message={<span style={{ fontWeight: 'bold' }}>Trợ lý du lịch AI</span>}
							description={loiKhuyen}
							type='info'
							showIcon
							icon={<BulbOutlined />}
							style={{ marginBottom: 30, background: '#e6f7ff', borderColor: '#91d5ff' }}
						/>

						<div style={{ marginBottom: 25 }}>
							<Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 5 }}>
								<Space>
									<Avatar
										size='small'
										style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}
										icon={<FireOutlined />}
									/>
									<Text strong>Ẩm thực & Ăn uống</Text>
								</Space>
								<Text strong style={{ fontSize: 16 }}>
									{tongAnUong.toLocaleString()} đ
								</Text>
							</Space>
							<Progress
								percent={phanTramAnUong}
								strokeColor={{ from: '#ffd591', to: '#fa8c16' }}
								strokeWidth={12}
								status='active'
							/>
						</div>

						<div style={{ marginBottom: 25 }}>
							<Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 5 }}>
								<Space>
									<Avatar
										size='small'
										style={{ backgroundColor: '#f3e7ff', color: '#722ed1' }}
										icon={<HomeOutlined />}
									/>
									<Text strong>Khách sạn & Lưu trú</Text>
								</Space>
								<Text strong style={{ fontSize: 16 }}>
									{tongLuuTru.toLocaleString()} đ
								</Text>
							</Space>
							<Progress
								percent={phanTramLuuTru}
								strokeColor={{ from: '#d3adf7', to: '#722ed1' }}
								strokeWidth={12}
								status='active'
							/>
						</div>

						<div style={{ marginBottom: 25 }}>
							<Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 5 }}>
								<Space>
									<Avatar
										size='small'
										style={{ backgroundColor: '#e6fffb', color: '#13c2c2' }}
										icon={<CarOutlined />}
									/>
									<Text strong>Vé máy bay & Đi lại</Text>
								</Space>
								<Text strong style={{ fontSize: 16 }}>
									{tongDiChuyen.toLocaleString()} đ
								</Text>
							</Space>
							<Progress
								percent={phanTramDiChuyen}
								strokeColor={{ from: '#87e8de', to: '#13c2c2' }}
								strokeWidth={12}
								status='active'
							/>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default NganSach;
