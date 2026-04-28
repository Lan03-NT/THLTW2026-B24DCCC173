import { Card, Col, Row, Statistic, Timeline, Typography } from 'antd';
import { FireOutlined, HistoryOutlined, CheckCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import ColumnChart from '@/components/Chart/ColumnChart';
import LineChart from '@/components/Chart/LineChart';

const { Title } = Typography;

const TrangChu = () => {
	// Mock data for statistics
	const stats = [
		{ title: 'Tổng buổi tập (tháng)', value: 12, icon: <HistoryOutlined />, color: '#1890ff' },
		{ title: 'Tổng calo đã đốt', value: 4500, icon: <FireOutlined />, color: '#f5222d', suffix: 'kcal' },
		{ title: 'Số ngày tập liên tiếp', value: 5, icon: <TrophyOutlined />, color: '#faad14', suffix: 'ngày' },
		{ title: 'Mục tiêu hoàn thành', value: 75, icon: <CheckCircleOutlined />, color: '#52c41a', suffix: '%' },
	];

	// Mock data for Column Chart (Workouts per week)
	const workoutData = {
		xAxis: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
		yAxis: [[3, 4, 2, 3]],
		yLabel: ['Số buổi tập'],
	};

	// Mock data for Line Chart (Weight change)
	const weightData = {
		xAxis: ['01/04', '07/04', '14/04', '21/04', '28/04'],
		yAxis: [[70, 69.5, 69.2, 68.8, 68.5]],
		yLabel: ['Cân nặng (kg)'],
	};

	// Mock data for Timeline (Recent workouts)
	const recentWorkouts = [
		{ date: '2024-04-28', type: 'Cardio', duration: '30 phút', color: 'green' },
		{ date: '2024-04-26', type: 'Sức mạnh', duration: '45 phút', color: 'blue' },
		{ date: '2024-04-25', type: 'Yoga', duration: '60 phút', color: 'purple' },
		{ date: '2024-04-23', type: 'HIIT', duration: '20 phút', color: 'red' },
		{ date: '2024-04-22', type: 'Khác', duration: '40 phút', color: 'gray' },
	];

	return (
		<div style={{ padding: '24px' }}>
			<Title level={2}>Bảng điều khiển Sức khỏe</Title>

			<Row gutter={[16, 16]}>
				{stats.map((stat, index) => (
					<Col xs={24} sm={12} lg={6} key={index}>
						<Card bordered={false} hoverable>
							<Statistic
								title={stat.title}
								value={stat.value}
								prefix={stat.icon}
								suffix={stat.suffix}
								valueStyle={{ color: stat.color }}
							/>
						</Card>
					</Col>
				))}
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
				<Col xs={24} lg={16}>
					<Row gutter={[0, 16]}>
						<Col span={24}>
							<Card title='Số buổi tập theo tuần' bordered={false}>
								<ColumnChart
									height={300}
									xAxis={workoutData.xAxis}
									yAxis={workoutData.yAxis}
									yLabel={workoutData.yLabel}
									title=''
									formatY={(v) => `${v} buổi`}
								/>
							</Card>
						</Col>
						<Col span={24}>
							<Card title='Theo dõi cân nặng' bordered={false}>
								<LineChart
									height={300}
									xAxis={weightData.xAxis}
									yAxis={weightData.yAxis}
									yLabel={weightData.yLabel}
									title=''
									formatY={(v) => `${v} kg`}
								/>
							</Card>
						</Col>
					</Row>
				</Col>

				<Col xs={24} lg={8}>
					<Card title='5 buổi tập gần nhất' bordered={false} style={{ height: '100%' }}>
						<Timeline mode='left'>
							{recentWorkouts.map((workout, index) => (
								<Timeline.Item key={index} color={workout.color} label={workout.date}>
									<Typography.Text strong>{workout.type}</Typography.Text>
									<br />
									<Typography.Text type='secondary'>{workout.duration}</Typography.Text>
								</Timeline.Item>
							))}
						</Timeline>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TrangChu;
