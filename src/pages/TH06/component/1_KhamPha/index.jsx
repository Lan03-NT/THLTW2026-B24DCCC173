import React, { useState, useMemo } from 'react';
import { Row, Col, Select, Space, Empty } from 'antd';
import CardDiemDen from './CardDiemDen';
import { danhSachDiemDen } from '../../duLieuGia';

const { Option } = Select;

const KhamPha = () => {
	const [loaiHinh, setLoaiHinh] = useState('all');
	const [sapXep, setSapXep] = useState('none');

	const duLieuHienThi = useMemo(() => {
		let data = [...danhSachDiemDen];

		if (loaiHinh !== 'all') {
			data = data.filter((item) => item.loaiHinh === loaiHinh);
		}

		if (sapXep === 'giaTang') {
			data.sort((a, b) => a.chiPhi.tong - b.chiPhi.tong);
		} else if (sapXep === 'giaGiam') {
			data.sort((a, b) => b.chiPhi.tong - a.chiPhi.tong);
		} else if (sapXep === 'danhGiaCao') {
			data.sort((a, b) => b.danhGia - a.danhGia);
		}

		return data;
	}, [loaiHinh, sapXep]);

	return (
		<div>
			<div style={{ marginBottom: 24, padding: 16, background: '#fafafa', borderRadius: 8 }}>
				<Space wrap>
					<span style={{ fontWeight: 500 }}>Lọc theo:</span>
					<Select defaultValue='all' style={{ width: 150 }} onChange={(value) => setLoaiHinh(value)}>
						<Option value='all'>Tất cả loại hình</Option>
						<Option value='biển'>Biển</Option>
						<Option value='núi'>Núi</Option>
						<Option value='thành phố'>Thành phố</Option>
					</Select>

					<span style={{ fontWeight: 500, marginLeft: 16 }}>Sắp xếp:</span>
					<Select defaultValue='none' style={{ width: 200 }} onChange={(value) => setSapXep(value)}>
						<Option value='none'>Sắp xếp mặc định</Option>
						<Option value='giaTang'>Giá: Thấp đến Cao</Option>
						<Option value='giaGiam'>Giá: Cao xuống Thấp</Option>
						<Option value='danhGiaCao'>Đánh giá cao nhất</Option>
					</Select>
				</Space>
			</div>

			<Row gutter={[24, 24]}>
				{duLieuHienThi.length > 0 ? (
					duLieuHienThi.map((diemDen) => (
						<Col xs={24} sm={12} md={8} lg={6} key={diemDen.id}>
							<CardDiemDen diemDen={diemDen} />
						</Col>
					))
				) : (
					<div style={{ width: '100%', padding: '40px 0', textAlign: 'center' }}>
						<Empty description='Không tìm thấy điểm đến nào phù hợp' />
					</div>
				)}
			</Row>
		</div>
	);
};

export default KhamPha;
