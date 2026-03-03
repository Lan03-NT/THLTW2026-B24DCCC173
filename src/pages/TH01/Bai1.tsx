import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Typography, Space } from 'antd';

const { Text, Title } = Typography;

export default function Bai1() {
	const [soBiMat, setSoBiMat] = useState<number>(0);
	const [soDuDoan, setSoDuDoan] = useState<string>('');
	const [thongBao, setThongBao] = useState<string>('');
	const [soLuotChoi, setSoLuotChoi] = useState<number>(10);
	const [daKetThuc, setDaKetThuc] = useState<boolean>(false);

	useEffect(() => {
		lamMoiTroChoi();
	}, []);

	const taoSoNgauNhien = () => {
		return Math.floor(Math.random() * 100) + 1;
	};

	const xuLyDuDoan = () => {
		if (daKetThuc) return;

		const giaTriNhap = Number(soDuDoan);

		if (isNaN(giaTriNhap) || giaTriNhap < 1 || giaTriNhap > 100) {
			setThongBao('⚠️ Vui lòng nhập một số hợp lệ từ 1 đến 100!');
			return;
		}

		if (giaTriNhap === soBiMat) {
			setThongBao(` Tuyệt vời! Bạn đã đoán đúng số ${soBiMat}!`);
			setDaKetThuc(true);
		} else {
			const luotConLai = soLuotChoi - 1;
			setSoLuotChoi(luotConLai);

			if (luotConLai === 0) {
				setThongBao(` Bạn đã hết lượt! Con số may mắn là: ${soBiMat}`);
				setDaKetThuc(true);
			} else {
				setThongBao(giaTriNhap < soBiMat ? ' Số bạn đoán quá THẤP!' : ' Số bạn đoán quá CAO!');
			}
		}

		setSoDuDoan('');
	};

	const lamMoiTroChoi = () => {
		setSoBiMat(taoSoNgauNhien());
		setSoLuotChoi(10);
		setThongBao('Bắt đầu thôi! Chúc bạn may mắn.');
		setSoDuDoan('');
		setDaKetThuc(false);
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				backgroundColor: '#f0f2f5',
				padding: '20px',
			}}
		>
			<Card
				hoverable
				style={{ width: '100%', maxWidth: 400, borderRadius: 12, textAlign: 'center' }}
				title={
					<Title level={3} style={{ margin: 0 }}>
						{' '}
						Trò Chơi Đoán Số
					</Title>
				}
			>
				<Space direction='vertical' size='middle' style={{ width: '100%' }}>
					<Text strong style={{ fontSize: 16 }}>
						Bạn còn{' '}
						<Text type='danger' style={{ fontSize: 20 }}>
							{soLuotChoi}
						</Text>{' '}
						lượt đoán
					</Text>

					<Input
						type='number'
						placeholder='Nhập số (1 - 100)'
						value={soDuDoan}
						onChange={(e) => setSoDuDoan(e.target.value)}
						onPressEnter={xuLyDuDoan}
						disabled={daKetThuc}
						size='large'
					/>

					<Button type='primary' onClick={xuLyDuDoan} disabled={daKetThuc} block size='large'>
						Đoán Ngay
					</Button>

					<Button type='dashed' onClick={lamMoiTroChoi} block>
						Chơi lại từ đầu
					</Button>

					<div
						style={{
							marginTop: 10,
							minHeight: 50,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: daKetThuc ? '#1890ff' : '#555',
							fontWeight: 'bold',
						}}
					>
						{thongBao}
					</div>
				</Space>
			</Card>
		</div>
	);
}
