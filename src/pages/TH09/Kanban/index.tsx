import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProps } from 'react-beautiful-dnd';
import { Card, Tag, Typography, Button, Avatar } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		const animation = requestAnimationFrame(() => setEnabled(true));
		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	}, []);
	if (!enabled) return null;
	return <Droppable {...props}>{children}</Droppable>;
};

const Kanban = () => {
	const { tasks, updateTaskStatus, setModalVisible, setEditingTask } = useModel('th09') as any;

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		updateTaskStatus(result.draggableId, result.destination.droppableId);
	};

	const cols = [
		{ id: 'todo', title: 'Cần làm' },
		{ id: 'in-progress', title: 'Đang làm' },
		{ id: 'done', title: 'Hoàn thành' },
	];

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div style={{ display: 'flex', gap: 20 }}>
				{cols.map((col) => (
					<div key={col.id} style={{ flex: 1, background: '#f4f5f7', padding: 15, borderRadius: 10, minHeight: 500 }}>
						<Title level={5}>
							{col.title} ({tasks?.filter((t: any) => t.status === col.id).length})
						</Title>
						<StrictModeDroppable droppableId={col.id}>
							{(provided) => (
								<div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 400 }}>
									{tasks
										?.filter((t: any) => t.status === col.id)
										.map((task: any, index: number) => (
											<Draggable key={task.id} draggableId={task.id} index={index}>
												{(p) => (
													<div
														ref={p.innerRef}
														{...p.draggableProps}
														{...p.dragHandleProps}
														style={{ ...p.draggableProps.style, marginBottom: 10 }}
													>
														<Card
															size='small'
															style={{ borderRadius: 8 }}
															onClick={() => {
																setEditingTask(task);
																setModalVisible(true);
															}}
														>
															<Text strong>{task.title}</Text>
															<br />
															<Tag color={task.priority === 'high' ? 'red' : 'blue'} style={{ marginTop: 8 }}>
																{task.priority}
															</Tag>
															<div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
																<Text type='secondary' style={{ fontSize: 12 }}>
																	{dayjs(task.deadline).format('DD/MM')}
																</Text>
																<Avatar size='small' icon={<UserOutlined />} />
															</div>
														</Card>
													</div>
												)}
											</Draggable>
										))}
									{provided.placeholder}
									<Button
										type='dashed'
										block
										icon={<PlusOutlined />}
										onClick={() => {
											setEditingTask(null);
											setModalVisible(true);
										}}
									>
										Thêm
									</Button>
								</div>
							)}
						</StrictModeDroppable>
					</div>
				))}
			</div>
		</DragDropContext>
	);
};

export default Kanban;
