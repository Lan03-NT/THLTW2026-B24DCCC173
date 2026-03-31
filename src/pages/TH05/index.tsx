import React from 'react';
import { Tabs, Card } from 'antd';
import QuanLyCauLacBo from './QuanLyCauLacBo';
import QuanLyDonDangKy from './QuanLyDonDangKy';
import QuanLyThanhVien from './QuanLyThanhVien';
import BaoCaoThongKe from './BaoCaoThongKe';

const { TabPane } = Tabs;

const TH05 = () => {
	return (
		<Card
			title='Hệ thống Quản lý Câu lạc bộ (TH05)'
			bordered={false}
			style={{ margin: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
		>
			<Tabs defaultActiveKey='1' size='large' animated={{ tabPane: true }}>
				<TabPane tab='Quản lý Câu lạc bộ' key='1'>
					<QuanLyCauLacBo />
				</TabPane>

				<TabPane tab='Đơn đăng ký' key='2'>
					<QuanLyDonDangKy />
				</TabPane>

				<TabPane tab='Quản lý Thành viên' key='3'>
					<QuanLyThanhVien />
				</TabPane>

				<TabPane tab='Báo cáo Thống kê' key='4'>
					<BaoCaoThongKe />
				</TabPane>
			</Tabs>
		</Card>
	);
};

export default TH05;
