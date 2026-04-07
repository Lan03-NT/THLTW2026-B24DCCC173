import React from 'react';
import { Card, Rate, Typography, Tag, Space } from 'antd';
import { EnvironmentOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const CardDiemDen = ({ diemDen }) => {
	return (
		<Card
			hoverable
			style={{ width: '100%', height: '100%' }}
			cover={<img alt={diemDen.ten} src={diemDen.hinhAnh} style={{ height: 200, objectFit: 'cover' }} />}
		>
			<Meta
				title={diemDen.ten}
				description={
					<Space direction='vertical' style={{ width: '100%' }}>
						<Text type='secondary' ellipsis={{ tooltip: diemDen.moTa }}>
							{diemDen.moTa}
						</Text>

						<Space wrap>
							<Tag color='blue'>{diemDen.loaiHinh}</Tag>
							<Text>
								<ClockCircleOutlined /> {diemDen.thoiGianThamQuan}
							</Text>
						</Space>

						<Space style={{ justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
							<Text strong style={{ color: '#cf1322' }}>
								<DollarOutlined /> {diemDen.chiPhi.tong.toLocaleString()} VNĐ
							</Text>
							<Rate disabled defaultValue={diemDen.danhGia} allowHalf style={{ fontSize: 14 }} />
						</Space>
					</Space>
				}
			/>
		</Card>
	);
};

export default CardDiemDen;
