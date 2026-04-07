import React from 'react';
import { Timeline, Button, Typography, Tag, Space, Tooltip } from 'antd';
import { DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, CarOutlined, EnvironmentFilled } from '@ant-design/icons';

const { Text } = Typography;

const TrucThoiGian = ({ lichTrinh, onXoa, onSapXep }) => {
	return (
		<Timeline mode='left'>
			{lichTrinh.map((item, index) => (
				<React.Fragment key={item.uniqueId || index}>
					{index > 0 && (
						<div style={{ marginLeft: 30, marginBottom: 20 }}>
							<Tag icon={<CarOutlined />} color='default' style={{ borderStyle: 'dashed', padding: '2px 10px' }}>
								Di chuyển khoảng 2 giờ 30 phút
							</Tag>
						</div>
					)}

					<Timeline.Item
						dot={<EnvironmentFilled style={{ fontSize: 18, color: index === 0 ? '#52c41a' : '#1890ff' }} />}
					>
						<div
							style={{
								background: '#fff',
								border: '1px solid #f0f0f0',
								borderRadius: 8,
								padding: 15,
								display: 'flex',
								alignItems: 'center',
								boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
							}}
						>
							<img
								src={item.hinhAnh}
								style={{ width: 70, height: 50, borderRadius: 4, objectFit: 'cover', marginRight: 15 }}
							/>

							<div style={{ flex: 1 }}>
								<Text type='secondary' style={{ fontSize: 11 }}>
									ĐIỂM DỪNG {index + 1}
								</Text>
								<Text strong style={{ display: 'block', fontSize: 16 }}>
									{item.ten}
								</Text>
								<Text type='secondary'>{item.thoiGianThamQuan}</Text>
							</div>

							<div style={{ textAlign: 'right' }}>
								<Text strong style={{ color: '#f5222d', display: 'block', marginBottom: 10 }}>
									{item.chiPhi.tong.toLocaleString()} đ
								</Text>

								<Space>
									<Tooltip title='Chuyển lên'>
										<Button
											size='small'
											icon={<ArrowUpOutlined />}
											disabled={index === 0}
											onClick={() => onSapXep(index, 'up')}
										/>
									</Tooltip>
									<Tooltip title='Chuyển xuống'>
										<Button
											size='small'
											icon={<ArrowDownOutlined />}
											disabled={index === lichTrinh.length - 1}
											onClick={() => onSapXep(index, 'down')}
										/>
									</Tooltip>
									<Button size='small' danger icon={<DeleteOutlined />} onClick={() => onXoa(index)} />
								</Space>
							</div>
						</div>
					</Timeline.Item>
				</React.Fragment>
			))}
		</Timeline>
	);
};

export default TrucThoiGian;
