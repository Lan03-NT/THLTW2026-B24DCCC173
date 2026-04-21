import React from 'react';
import { Row, Col, Typography, Button, Space, Tag } from 'antd';
import { InstagramOutlined, FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default () => {
	return (
		<div style={{ padding: '80px 10%' }}>
			<Row gutter={50} align='middle'>
				<Col lg={10}>
					<img
						src='https://images.unsplash.com/photo-1522337360788-8b13df772ce1?w=800'
						style={{ width: '100%', borderRadius: 16 }}
					/>
				</Col>

				<Col lg={14}>
					<Title>Minh Anh</Title>
					<Paragraph>Beauty Blogger chia se kien thuc skincare va makeup.</Paragraph>

					<Space wrap>
						{['Skincare', 'Makeup', 'Tri mun'].map((i) => (
							<Tag color='pink' key={i}>
								{i}
							</Tag>
						))}
					</Space>

					<div style={{ marginTop: 30 }}>
						<Button type='primary' style={{ background: '#c41d7f' }}>
							Xem Blog
						</Button>
					</div>

					<Space style={{ marginTop: 20 }}>
						<Button shape='circle' icon={<InstagramOutlined />} />
						<Button shape='circle' icon={<FacebookOutlined />} />
						<Button shape='circle' icon={<YoutubeOutlined />} />
					</Space>
				</Col>
			</Row>
		</div>
	);
};
