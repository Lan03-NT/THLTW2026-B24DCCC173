import React, { useState } from 'react';
import { Button, Card, Row, Col, Typography, List, Tag, Divider, Avatar } from 'antd';

const { Title, Text } = Typography;

const OanTuTi = () => {
	const [ketQua, setKetQua] = useState(null);
	const [lichSu, setLichSu] = useState([]);
	const [dangCho, setDangCho] = useState(false);

	const mauSacChon = {
		Kéo: '#ff4d4f',
		Búa: '#1890ff',
		Bao: '#52c41a',
	};

	const danhSachLuaChon = Object.keys(mauSacChon);

	const choiGame = (nguoiChon) => {
		setDangCho(true);

		setTimeout(() => {
			const mayChon = danhSachLuaChon[Math.floor(Math.random() * 3)];
			let trangThai = '';

			if (nguoiChon === mayChon) trangThai = 'Hòa';
			else if (
				(nguoiChon === 'Kéo' && mayChon === 'Bao') ||
				(nguoiChon === 'Búa' && mayChon === 'Kéo') ||
				(nguoiChon === 'Bao' && mayChon === 'Búa')
			) {
				trangThai = 'Thắng';
			} else {
				trangThai = 'Thua';
			}

			const vanDau = { nguoiChon, mayChon, trangThai };
			setKetQua(vanDau);
			setLichSu([vanDau, ...lichSu]);
			setDangCho(false);
		}, 400);
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				padding: '60px 20px',
				background: '#f5f5f5',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Title level={2} style={{ marginBottom: 50, fontWeight: 700 }}>
				TRÒ CHƠI OẲN TÙ TÌ
			</Title>

			<Row gutter={[32, 32]} style={{ width: '100%', maxWidth: 1000 }} justify='center'>
				<Col xs={24} md={15}>
					<Card bordered={false} style={{ borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
						<Row align='middle' justify='center' style={{ minHeight: 180 }}>
							<Col span={9} style={{ textAlign: 'center' }}>
								<Text type='secondary' style={{ display: 'block', marginBottom: 10 }}>
									BẠN
								</Text>
								<div
									style={{
										height: 60,
										fontSize: 28,
										fontWeight: 'bold',
										color: ketQua ? mauSacChon[ketQua.nguoiChon] : '#d9d9d9',
									}}
								>
									{ketQua?.nguoiChon || 'CHỜ'}
								</div>
							</Col>

							<Col span={6} style={{ textAlign: 'center' }}>
								<div style={{ fontSize: 20, color: '#bfbfbf', fontWeight: 300 }}>VS</div>
								{ketQua && !dangCho && (
									<div style={{ marginTop: 15 }}>
										<Tag
											color={ketQua.trangThai === 'Thắng' ? 'green' : ketQua.trangThai === 'Thua' ? 'red' : 'orange'}
											style={{ fontSize: 14, borderRadius: 4 }}
										>
											{ketQua.trangThai.toUpperCase()}
										</Tag>
									</div>
								)}
							</Col>

							<Col span={9} style={{ textAlign: 'center' }}>
								<Text type='secondary' style={{ display: 'block', marginBottom: 10 }}>
									MÁY
								</Text>
								<div
									style={{
										height: 60,
										fontSize: 28,
										fontWeight: 'bold',
										color: !dangCho && ketQua ? mauSacChon[ketQua.mayChon] : '#d9d9d9',
									}}
								>
									{dangCho ? '...' : ketQua?.mayChon || 'CHỜ'}
								</div>
							</Col>
						</Row>

						<Divider orientation='center' style={{ margin: '40px 0' }}>
							BẤM ĐỂ CHỌN
						</Divider>

						<Row justify='center' gutter={16} style={{ paddingBottom: 20 }}>
							{danhSachLuaChon.map((item) => (
								<Col key={item}>
									<Button
										type='primary'
										size='large'
										disabled={dangCho}
										style={{
											height: 55,
											width: 100,
											background: mauSacChon[item],
											borderColor: mauSacChon[item],
											fontSize: 16,
											fontWeight: 600,
											borderRadius: 8,
										}}
										onClick={() => choiGame(item)}
									>
										{item}
									</Button>
								</Col>
							))}
						</Row>
					</Card>
				</Col>

				<Col xs={24} md={9}>
					<Card
						title='LỊCH SỬ THI ĐẤU'
						bordered={false}
						style={{ borderRadius: 16, height: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
					>
						<List
							dataSource={lichSu}
							locale={{ emptyText: 'Chưa có ván đấu nào' }}
							renderItem={(item, index) => (
								<List.Item style={{ padding: '12px 0' }}>
									<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
										<Text strong>Ván {lichSu.length - index}:</Text>
										<Text>
											{item.nguoiChon} - {item.mayChon}
										</Text>
										<Text
											type={item.trangThai === 'Thắng' ? 'success' : item.trangThai === 'Thua' ? 'danger' : 'warning'}
										>
											{item.trangThai}
										</Text>
									</div>
								</List.Item>
							)}
							style={{ maxHeight: 380, overflowY: 'auto' }}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default OanTuTi;
