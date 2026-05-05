import React, { useState } from 'react';
import { Table, Typography, Tag, Input, Button, Space, Popconfirm, Card, Row, Col, Statistic } from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	FilterOutlined,
	ClockCircleOutlined,
	CheckCircleOutlined,
	WarningOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import { Task } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const TaskList: React.FC = () => {
	const { tasks, deleteTask, setIsModalVisible, setEditingTask } = useModel('th09') as any;
	const [searchText, setSearchText] = useState('');
	const [filterStatus, setFilterStatus] = useState<string>('all');

	const handleEdit = (record: Task) => {
		setEditingTask(record);
		setIsModalVisible(true);
	};

	const getStatusTag = (status: string) => {
		if (status === 'done')
			return (
				<Tag color='success' style={{ borderRadius: 12, padding: '2px 10px' }}>
					Hoàn thành
				</Tag>
			);
		if (status === 'in-progress')
			return (
				<Tag color='processing' style={{ borderRadius: 12, padding: '2px 10px' }}>
					Đang tiến hành
				</Tag>
			);
		return (
			<Tag color='default' style={{ borderRadius: 12, padding: '2px 10px' }}>
				Chưa thực hiện
			</Tag>
		);
	};

	const getPriorityIndicator = (priority: string) => {
		if (priority === 'high')
			return (
				<Text type='danger' strong>
					! Cao
				</Text>
			);
		if (priority === 'medium')
			return (
				<Text type='warning' strong>
					▲ Trung bình
				</Text>
			);
		return (
			<Text type='secondary' strong>
				= Thấp
			</Text>
		);
	};

	let filteredData = tasks.filter((t: Task) => t.title.toLowerCase().includes(searchText.toLowerCase()));

	if (filterStatus !== 'all') {
		filteredData = filteredData.filter((t: Task) => t.status === filterStatus);
	}

	const columns = [
		{
			title: (
				<Text type='secondary' style={{ fontSize: 12 }}>
					TASK NAME
				</Text>
			),
			dataIndex: 'title',
			key: 'title',
			render: (text: string, record: Task) => (
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div
						style={{
							width: 4,
							height: 24,
							borderRadius: 2,
							background: record.priority === 'high' ? '#cf1322' : record.priority === 'medium' ? '#d46b08' : '#52c41a',
						}}
					/>
					<Text strong style={{ fontSize: 15 }}>
						{text}
					</Text>
				</div>
			),
		},
		{
			title: (
				<Text type='secondary' style={{ fontSize: 12 }}>
					STATUS
				</Text>
			),
			dataIndex: 'status',
			key: 'status',

			filters: [
				{ text: 'Chưa thực hiện', value: 'todo' },
				{ text: 'Đang tiến hành', value: 'in-progress' },
				{ text: 'Hoàn thành', value: 'done' },
			],
			onFilter: (value: any, record: Task) => record.status === value,
			render: (status: string) => getStatusTag(status),
		},
		{
			title: (
				<Text type='secondary' style={{ fontSize: 12 }}>
					DEADLINE
				</Text>
			),
			dataIndex: 'deadline',
			key: 'deadline',

			sorter: (a: Task, b: Task) => dayjs(a.deadline).unix() - dayjs(b.deadline).unix(),
			render: (date: string) => <Text>{dayjs(date).format('DD/MM/YYYY')}</Text>,
		},
		{
			title: (
				<Text type='secondary' style={{ fontSize: 12 }}>
					PRIORITY
				</Text>
			),
			dataIndex: 'priority',
			key: 'priority',
			render: (p: string) => getPriorityIndicator(p),
		},
		{
			title: (
				<Text type='secondary' style={{ fontSize: 12 }}>
					ACTIONS
				</Text>
			),
			key: 'actions',
			align: 'right' as const,
			render: (_: any, record: Task) => (
				<Space>
					<Button type='text' icon={<EditOutlined />} onClick={() => handleEdit(record)} />
					<Popconfirm title='Xóa task này?' onConfirm={() => deleteTask(record.id)}>
						<Button type='text' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div>
			<Title level={2} style={{ margin: '0 0 8px 0' }}>
				Danh sách công việc
			</Title>
			<Text type='secondary'>Quản lý và theo dõi tiến độ các nhiệm vụ của dự án.</Text>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: 32,
					marginBottom: 16,
				}}
			>
				<Space size='small'>
					<Button
						type={filterStatus === 'all' ? 'primary' : 'default'}
						onClick={() => setFilterStatus('all')}
						style={{ borderRadius: 20 }}
					>
						Tất cả
					</Button>
					<Button
						type={filterStatus === 'todo' ? 'primary' : 'default'}
						onClick={() => setFilterStatus('todo')}
						style={{ borderRadius: 20 }}
					>
						Chưa thực hiện
					</Button>
					<Button
						type={filterStatus === 'in-progress' ? 'primary' : 'default'}
						onClick={() => setFilterStatus('in-progress')}
						style={{ borderRadius: 20 }}
					>
						Đang tiến hành
					</Button>
					<Button
						type={filterStatus === 'done' ? 'primary' : 'default'}
						onClick={() => setFilterStatus('done')}
						style={{ borderRadius: 20 }}
					>
						Hoàn thành
					</Button>
				</Space>
				<Space>
					<Input.Search
						placeholder='Tìm tên công việc...'
						style={{ width: 250 }}
						allowClear
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<Button icon={<FilterOutlined />}>Lọc</Button>
				</Space>
			</div>

			<Card
				bordered={false}
				style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
				bodyStyle={{ padding: 0 }}
			>
				<Table columns={columns} dataSource={filteredData} rowKey='id' pagination={{ pageSize: 6 }} />
			</Card>

			<Row gutter={24} style={{ marginTop: 24 }}>
				<Col span={8}>
					<Card bordered={false} style={{ borderRadius: 12, borderTop: '4px solid #1677ff' }}>
						<Statistic
							title='TỔNG SỐ GIỜ'
							value='128.5 giờ'
							valueStyle={{ fontSize: 24, fontWeight: 'bold' }}
							prefix={<ClockCircleOutlined style={{ fontSize: 20, color: '#1677ff' }} />}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false} style={{ borderRadius: 12, borderTop: '4px solid #52c41a' }}>
						<Statistic
							title='ĐĐ HOÀN THÀNH'
							value={`${tasks?.filter((t: any) => t.status === 'done').length || 0} tác vụ`}
							valueStyle={{ fontSize: 24, fontWeight: 'bold' }}
							prefix={<CheckCircleOutlined style={{ fontSize: 20, color: '#52c41a' }} />}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card bordered={false} style={{ borderRadius: 12, borderTop: '4px solid #faad14' }}>
						<Statistic
							title='SẮP HẾT HẠN'
							value={`${
								tasks?.filter((t: any) => t.status !== 'done' && dayjs(t.deadline).isBefore(dayjs().add(3, 'day')))
									.length || 0
							} nhiệm vụ`}
							valueStyle={{ fontSize: 24, fontWeight: 'bold' }}
							prefix={<WarningOutlined style={{ fontSize: 20, color: '#faad14' }} />}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TaskList;
