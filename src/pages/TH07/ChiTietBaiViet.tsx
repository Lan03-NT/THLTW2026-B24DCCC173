import React, { useState, useEffect } from 'react';
import { Layout, Typography, Tag, Space, Divider, Row, Col, Card, Button } from 'antd';
import { ArrowLeftOutlined, EyeOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'umi';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const ChiTietReview = () => {
	const dieuHuong = useHistory();
	const { maBaiViet } = useParams() as any;
	const [luotXem, setLuotXem] = useState(1250);

	useEffect(() => {
		const tangView = setTimeout(() => {
			setLuotXem((v) => v + 1);
		}, 1500);
		return () => clearTimeout(tangView);
	}, [maBaiViet]);

	return (
		<Layout style={{ background: '#ffffff', minHeight: '100vh' }}>
			<Content style={{ padding: '60px 18%' }}>
				<Button
					icon={<ArrowLeftOutlined />}
					type='text'
					onClick={() => dieuHuong.push('/th07/index')}
					style={{ marginBottom: 30 }}
				>
					Quay lại danh sách
				</Button>

				<div style={{ textAlign: 'center', marginBottom: 50 }}>
					<Space style={{ marginBottom: 20 }}>
						<Tag color='#c41d7f' style={{ borderRadius: 4 }}>
							SKINCARE
						</Tag>
						<Tag color='#c41d7f' style={{ borderRadius: 4 }}>
							LÀM SÁNG DA
						</Tag>
					</Space>
					<Title style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, lineHeight: 1.3 }}>
						Review Serum Vitamin C Melano CC: Hiệu quả thực tế sau 14 ngày
					</Title>
					<Space size='large' style={{ color: '#8c8c8c', marginTop: 20 }}>
						<Space>
							<UserOutlined /> Minh Anh
						</Space>
						<Space>
							<CalendarOutlined /> 21/04/2026
						</Space>
						<Space>
							<EyeOutlined /> {luotXem} lượt xem
						</Space>
					</Space>
				</div>

				<img
					src='https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200'
					style={{ width: '100%', borderRadius: 16, marginBottom: 50, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
				/>

				<div style={{ fontSize: 18, lineHeight: 2, color: '#262626' }}>
					<Title level={3} style={{ fontFamily: "'Playfair Display', serif", color: '#c41d7f' }}>
						1. Bảng thành phần chi tiết
					</Title>
					<Paragraph>
						| Thành phần | Công dụng | | :--- | :--- | | L-Ascorbic Acid | Dạng Vitamin C tinh khiết giúp mờ thâm | |
						Vitamin E | Dưỡng ẩm và ngăn ngừa oxy hóa | | Chiết xuất thảo mộc | Kháng viêm, làm dịu da mụn |
					</Paragraph>

					<Title level={3} style={{ fontFamily: "'Playfair Display', serif", color: '#c41d7f', marginTop: 40 }}>
						2. Cảm nhận và Đánh giá
					</Title>
					<Paragraph>
						Sản phẩm có kết cấu dạng lỏng hơi dầu, khi thoa lên da sẽ có cảm giác châm chích nhẹ trong khoảng 1-2 phút
						đầu. Đây là phản ứng bình thường của Vitamin C nồng độ cao.
					</Paragraph>

					<div style={{ background: '#fff0f6', padding: 40, borderRadius: 16, marginTop: 40 }}>
						<Title level={4}>Ưu điểm nổi bật</Title>
						<ul>
							<li>Thiết kế vòi nhỏ giọt giúp bảo quản Vitamin C không bị oxy hóa.</li>
							<li>Giá thành cực kỳ bình dân cho học sinh sinh viên.</li>
							<li>Hiệu quả mờ thâm mụn mới cực nhanh.</li>
						</ul>
					</div>
				</div>

				<Divider style={{ margin: '80px 0' }}>BÀI VIẾT LIÊN QUAN</Divider>
				<Row gutter={32}>
					{[1, 2, 3].map((i) => (
						<Col span={8} key={i}>
							<Card
								bordered={false}
								cover={<img src={`https://picsum.photos/seed/${i + 50}/400/250`} style={{ borderRadius: 12 }} />}
							>
								<Title level={5} style={{ fontFamily: "'Playfair Display', serif" }}>
									Quy trình chăm sóc da dầu mụn tối giản
								</Title>
							</Card>
						</Col>
					))}
				</Row>
			</Content>
		</Layout>
	);
};

export default ChiTietReview;
