import React, { useState } from 'react';
import { Tabs } from 'antd';
import KhamPha from './component/1_KhamPha';
import LichTrinh from './component/2_LichTrinh';
import NganSach from './component/3_NganSach';
import QuanTri from './component/4_QuanTri';

const { TabPane } = Tabs;

const UngDungDuLich = () => {
	const [lichTrinhChung, setLichTrinhChung] = useState([]);

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h1 style={{ marginBottom: 24 }}>Ứng dụng Lập kế hoạch Du lịch</h1>
			<div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
				<Tabs defaultActiveKey='1'>
					<TabPane tab='Khám phá điểm đến' key='1'>
						<KhamPha />
					</TabPane>

					<TabPane tab='Lịch trình của tôi' key='2'>
						<LichTrinh lichTrinh={lichTrinhChung} setLichTrinh={setLichTrinhChung} />
					</TabPane>

					<TabPane tab='Quản lý Ngân sách' key='3'>
						<NganSach lichTrinh={lichTrinhChung} />
					</TabPane>

					<TabPane tab='Quản trị (Admin)' key='4'>
						<QuanTri />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default UngDungDuLich;
