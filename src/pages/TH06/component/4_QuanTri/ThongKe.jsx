import React from 'react';
// Gộp tất cả antd vào 1 dòng duy nhất ở đây
import { Row, Col, Card, Statistic, Progress, Typography, Avatar, Tag } from 'antd';
import { LineChartOutlined, TrophyOutlined, AreaChartOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ThongKe = () => {
	return (
		<div style={{ marginBottom: 32 }}>
			<Row gutter={[20, 20]}>
				{/* Thẻ 1: Lịch trình */}
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Avatar
								size={54}
								icon={<LineChartOutlined />}
								style={{ backgroundColor: '#e6f7ff', color: '#1890ff', marginRight: 16 }}
							/>
							<Statistic title='Lịch trình đã tạo' value={128} valueStyle={{ fontWeight: 'bold' }} />
						</div>
						<div style={{ marginTop: 12 }}>
							<Tag color='green'>+12%</Tag> <Text type='secondary'>so với tháng trước</Text>
						</div>
					</Card>
				</Col>

				{/* Thẻ 2: Doanh thu */}
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
						<div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
							<Avatar
								size={54}
								icon={<AreaChartOutlined />}
								style={{ backgroundColor: '#f6ffed', color: '#52c41a', marginRight: 16 }}
							/>
							<Statistic title='Doanh thu dự kiến' value={45800000} suffix='đ' valueStyle={{ fontWeight: 'bold' }} />
						</div>
						<Progress percent={75} status='active' strokeColor='#52c41a' strokeWidth={6} />
					</Card>
				</Col>

				{/* Thẻ 3: Điểm đến Hot */}
				<Col xs={24} sm={8}>
					<Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Avatar
								size={54}
								icon={<TrophyOutlined />}
								style={{ backgroundColor: '#fff7e6', color: '#faad14', marginRight: 16 }}
							/>
							<Statistic
								title='Điểm đến Hot'
								value={'Hạo Long'}
								valueStyle={{ fontWeight: 'bold', color: '#faad14' }}
							/>
						</div>
						<div style={{ marginTop: 12 }}>
							<Text strong>Top 1</Text> <Text type='secondary'>lượt chọn tuần này</Text>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ThongKe;
