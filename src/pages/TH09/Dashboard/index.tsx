import React from 'react';
import { Row, Col, Card, Typography, Statistic, Badge, Timeline, Avatar } from 'antd';
import { CheckCircleFilled, FileTextFilled, WarningFilled } from '@ant-design/icons';
import { useModel } from 'umi';
import { Task } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
	const { tasks } = useModel('th09') as { tasks: Task[] };

	const totalTasks = tasks?.length || 0;
	const completedTasks = tasks?.filter((t) => t.status === 'done').length || 0;
	const overdueTasks = tasks?.filter((t) => t.status !== 'done' && dayjs(t.deadline).isBefore(dayjs())).length || 0;

	return (
		<div>
			<Title level={2} style={{ margin: 0 }}>
				Tổng quan Dashboard
			</Title>
			<Text type='secondary'>Chào mừng bạn trở lại, đây là tiến độ công việc của bạn hôm nay.</Text>

			<Row gutter={24} style={{ marginTop: 32 }}>
				<Col span={8}>
					<Card
						bordered={false}
						bodyStyle={{ padding: 24 }}
						style={{ borderRadius: 12, borderLeft: '6px solid #1677ff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
							<div>
								<Text type='secondary' style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>
									Tổng số nhiệm vụ
								</Text>
								<Title level={1} style={{ margin: '8px 0', fontSize: 36 }}>
									{totalTasks}
								</Title>
								<Text type='success' style={{ fontWeight: 500 }}>
									+12% <Text type='secondary'>so với tuần trước</Text>
								</Text>
							</div>
							<Avatar size={48} style={{ background: '#e6f4ff', color: '#1677ff' }} icon={<FileTextFilled />} />
						</div>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						bordered={false}
						bodyStyle={{ padding: 24 }}
						style={{ borderRadius: 12, borderLeft: '6px solid #52c41a', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
							<div>
								<Text type='secondary' style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>
									Đã hoàn thành
								</Text>
								<Title level={1} style={{ margin: '8px 0', fontSize: 36 }}>
									{completedTasks}
								</Title>
								<Text type='secondary'>66% hoàn tất mục tiêu</Text>
							</div>
							<Avatar size={48} style={{ background: '#f6ffed', color: '#52c41a' }} icon={<CheckCircleFilled />} />
						</div>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						bordered={false}
						bodyStyle={{ padding: 24 }}
						style={{ borderRadius: 12, borderLeft: '6px solid #ff4d4f', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
							<div>
								<Text type='secondary' style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>
									Quá hạn
								</Text>
								<Title level={1} style={{ margin: '8px 0', fontSize: 36 }}>
									{overdueTasks > 9 ? overdueTasks : `0${overdueTasks}`}
								</Title>
								<Text type='danger' style={{ fontWeight: 500 }}>
									Cần chú ý <Text type='secondary'>Yêu cầu xử lý ngay</Text>
								</Text>
							</div>
							<Avatar size={48} style={{ background: '#fff2f0', color: '#ff4d4f' }} icon={<WarningFilled />} />
						</div>
					</Card>
				</Col>
			</Row>

			<Row gutter={24} style={{ marginTop: 24 }}>
				<Col span={8}>
					<Card title='Hạn chót sắp tới' bordered={false} style={{ borderRadius: 12, height: '100%' }}>
						{tasks
							.filter((t) => t.status !== 'done')
							.slice(0, 3)
							.map((task) => (
								<div key={task.id} style={{ marginBottom: 20 }}>
									<Badge color={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'green'} />
									<Text strong style={{ marginLeft: 8 }}>
										{task.title}
									</Text>
									<div style={{ marginLeft: 16, marginTop: 4 }}>
										<Text type='secondary' style={{ fontSize: 12 }}>
											⏰ {dayjs(task.deadline).format('DD/MM/YYYY, HH:mm')}
										</Text>
									</div>
								</div>
							))}
					</Card>
				</Col>
				<Col span={16}>
					<Card title='Hoạt động gần đây' bordered={false} style={{ borderRadius: 12, height: '100%' }}>
						<Timeline>
							<Timeline.Item color='blue'>
								Bạn đã tạo nhiệm vụ mới <b>Thiết kế UI cho Dashboard</b>
							</Timeline.Item>
							<Timeline.Item color='green'>
								Hoàn thành nhiệm vụ <b>Gửi báo cáo tuần</b>
							</Timeline.Item>
							<Timeline.Item color='gray'>
								Nhận bình luận mới từ <b>Minh Đức</b>
							</Timeline.Item>
						</Timeline>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
