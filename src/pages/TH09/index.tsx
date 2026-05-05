import React from 'react';
import { Tabs, Button, Typography, Avatar, Card } from 'antd';
import { PlusOutlined, BuildOutlined, AppstoreOutlined, TableOutlined, ProjectOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import Dashboard from './Dashboard';
import Kanban from './Kanban';
import TaskList from './TaskList';
import FormTask from './FormTask';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const TH09 = () => {
	const model = useModel('th09') as any;

	const handleAddTask = () => {
		model.setEditingTask(null);
		model.setModalVisible(true);
	};

	return (
		<div style={{ padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
			<Card bordered={false} style={{ marginBottom: 20, borderRadius: 12 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
						<Avatar shape='square' size='large' icon={<BuildOutlined />} style={{ background: '#1677ff' }} />
						<div>
							<Title level={4} style={{ margin: 0 }}>
								Task Management
							</Title>
							<Text type='secondary'>Deadline: 17:05 PM</Text>
						</div>
					</div>
					<Button
						type='primary'
						icon={<PlusOutlined />}
						size='large'
						onClick={handleAddTask}
						style={{ borderRadius: 8, height: 45 }}
					>
						New Task
					</Button>
				</div>
			</Card>

			<Card bordered={false} style={{ borderRadius: 12 }}>
				<Tabs defaultActiveKey='2' size='large'>
					<TabPane
						tab={
							<span>
								<AppstoreOutlined /> Dashboard
							</span>
						}
						key='1'
					>
						<Dashboard />
					</TabPane>
					<TabPane
						tab={
							<span>
								<ProjectOutlined /> Kanban Board
							</span>
						}
						key='2'
					>
						<Kanban />
					</TabPane>
					<TabPane
						tab={
							<span>
								<TableOutlined /> Task List
							</span>
						}
						key='3'
					>
						<TaskList />
					</TabPane>
				</Tabs>
			</Card>
			<FormTask />
		</div>
	);
};

export default TH09;
