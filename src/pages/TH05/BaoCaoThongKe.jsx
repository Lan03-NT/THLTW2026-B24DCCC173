import React from 'react';
import { Row, Col, Card, Statistic, Progress, List, Typography, Space, Tag } from 'antd';
import {
	AppstoreOutlined,
	ClockCircleOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined,
	PieChartOutlined,
	FireOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const BaoCaoThongKe = () => {
	const tongQuan = {
		clb: 3,
		choDuyet: 12,
		daDuyet: 45,
		tuChoi: 8,
	};

	const duLieuThongKe = [
		{
			ten: 'CLB Lập trình PTIT',
			choDuyet: 5,
			daDuyet: 25,
			tuChoi: 2,
			tong: 32,
		},
		{
			ten: 'CLB Âm nhạc',
			choDuyet: 4,
			daDuyet: 15,
			tuChoi: 3,
			tong: 22,
		},
		{
			ten: 'CLB Tiếng Anh',
			choDuyet: 3,
			daDuyet: 5,
			tuChoi: 3,
			tong: 11,
		},
	];

	const KhungIcon = ({ icon, mau, mauNen }) => (
		<div
			style={{
				width: 48,
				height: 48,
				borderRadius: '50%',
				backgroundColor: mauNen,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: '22px',
				color: mau,
				marginBottom: 16,
			}}
		>
			{icon}
		</div>
	);

	return (
		<div style={{ padding: '8px 0' }}>
			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '12px', textAlign: 'center' }}>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<KhungIcon icon={<AppstoreOutlined />} mau='#722ed1' mauNen='#f9f0ff' />
							<Statistic title='Tổng Câu lạc bộ' value={tongQuan.clb} />
						</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '12px', textAlign: 'center' }}>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<KhungIcon icon={<ClockCircleOutlined />} mau='#1890ff' mauNen='#e6f7ff' />
							<Statistic title='Đơn chờ duyệt' value={tongQuan.choDuyet} valueStyle={{ color: '#1890ff' }} />
						</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '12px', textAlign: 'center' }}>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<KhungIcon icon={<CheckCircleOutlined />} mau='#52c41a' mauNen='#f6ffed' />
							<Statistic title='Đơn đã duyệt' value={tongQuan.daDuyet} valueStyle={{ color: '#52c41a' }} />
						</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '12px', textAlign: 'center' }}>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<KhungIcon icon={<CloseCircleOutlined />} mau='#f5222d' mauNen='#fff1f0' />
							<Statistic title='Đơn từ chối' value={tongQuan.tuChoi} valueStyle={{ color: '#f5222d' }} />
						</div>
					</Card>
				</Col>
			</Row>

			<Card
				title={
					<Space>
						<PieChartOutlined />
						<span>Phân tích dữ liệu chi tiết</span>
					</Space>
				}
				bordered={false}
				style={{ borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
			>
				<List
					itemLayout='vertical'
					dataSource={duLieuThongKe}
					renderItem={(item) => (
						<div
							style={{
								padding: '24px',
								border: '1px solid #f0f0f0',
								borderRadius: '12px',
								marginBottom: '16px',
								backgroundColor: '#fff',
							}}
						>
							<div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<Space>
									<FireOutlined style={{ color: '#fa8c16' }} />
									<Text strong style={{ fontSize: '16px' }}>
										{item.ten}
									</Text>
								</Space>
								<Tag color='blue' style={{ borderRadius: '10px' }}>
									{item.tong} đơn đăng ký
								</Tag>
							</div>

							<Row gutter={40}>
								<Col span={8}>
									<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
										<Text type='secondary'>Chờ duyệt</Text>
										<Text strong style={{ color: '#1890ff' }}>
											{item.choDuyet}
										</Text>
									</div>
									<Progress
										percent={Math.round((item.choDuyet / item.tong) * 100)}
										showInfo={false}
										strokeColor='#1890ff'
										strokeWidth={10}
									/>
								</Col>
								<Col span={8}>
									<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
										<Text type='secondary'>Đã duyệt</Text>
										<Text strong style={{ color: '#52c41a' }}>
											{item.daDuyet}
										</Text>
									</div>
									<Progress
										percent={Math.round((item.daDuyet / item.tong) * 100)}
										showInfo={false}
										strokeColor='#52c41a'
										strokeWidth={10}
									/>
								</Col>
								<Col span={8}>
									<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
										<Text type='secondary'>Từ chối</Text>
										<Text strong style={{ color: '#f5222d' }}>
											{item.tuChoi}
										</Text>
									</div>
									<Progress
										percent={Math.round((item.tuChoi / item.tong) * 100)}
										showInfo={false}
										strokeColor='#f5222d'
										strokeWidth={10}
									/>
								</Col>
							</Row>
						</div>
					)}
				/>
			</Card>
		</div>
	);
};

export default BaoCaoThongKe;
