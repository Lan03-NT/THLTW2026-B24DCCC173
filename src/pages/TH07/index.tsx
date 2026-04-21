import React, { useState, useEffect } from 'react';
import { Layout, Input, Card, Row, Col, Tag, Pagination, Typography, Space, Empty, Spin } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { CheckableTag } = Tag;

interface BaiViet {
	maSo: number;
	tieuDe: string;
	anhDaiDien: string;
	tomTat: string;
	ngayDang: string;
	tacGia: string;
	nhan: string;
	luotXem: number;
}

const DANH_SACH: BaiViet[] = Array.from({ length: 81 }).map((_, i) => {
	const tags = ['Skincare', 'Makeup', 'Da dau', 'Tri mun'];
	const tag = tags[i % 4];
	return {
		maSo: i + 1,
		tieuDe: `${i % 2 === 0 ? 'Review' : 'Danh gia'} ${tag} - Bai ${i + 1}`,
		anhDaiDien: `https://picsum.photos/400/300?random=${i}`,
		tomTat: 'Bai viet chia se kinh nghiem lam dep thuc te...',
		ngayDang: '21/04/2026',
		tacGia: 'Minh Anh',
		nhan: tag,
		luotXem: 1000 + i * 10,
	};
});

export default () => {
	const history = useHistory();
	const [keyword, setKeyword] = useState('');
	const [debounce, setDebounce] = useState('');
	const [tag, setTag] = useState('Tat ca');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => {
			setDebounce(keyword);
			setPage(1);
		}, 300);
		return () => clearTimeout(t);
	}, [keyword]);

	useEffect(() => {
		setLoading(true);
		const t = setTimeout(() => setLoading(false), 300);
		return () => clearTimeout(t);
	}, [debounce, tag]);

	const list = DANH_SACH.filter((i) => {
		return i.tieuDe.toLowerCase().includes(debounce.toLowerCase()) && (tag === 'Tat ca' || i.nhan === tag);
	});

	const pageSize = 9;
	const data = list.slice((page - 1) * pageSize, page * pageSize);

	return (
		<Layout style={{ background: '#fff' }}>
			<Content style={{ padding: '60px 10%' }}>
				<div style={{ textAlign: 'center', marginBottom: 40 }}>
					<Title style={{ fontSize: 42 }}>GlowDiary</Title>
					<Text style={{ color: '#c41d7f', letterSpacing: 3 }}>BEAUTY BLOG</Text>
				</div>

				<Space direction='vertical' size={30} style={{ width: '100%' }}>
					<Input
						allowClear
						size='large'
						prefix={<SearchOutlined />}
						placeholder='Tim kiem...'
						onChange={(e) => setKeyword(e.target.value)}
						style={{ borderRadius: 30 }}
					/>

					<Space wrap>
						{['Tat ca', 'Skincare', 'Makeup', 'Da dau', 'Tri mun'].map((t) => (
							<CheckableTag
								key={t}
								checked={tag === t}
								onChange={() => setTag(t)}
								style={{
									padding: '5px 15px',
									borderRadius: 20,
									background: tag === t ? '#c41d7f' : '#f5f5f5',
									color: tag === t ? '#fff' : '#333',
								}}
							>
								{t}
							</CheckableTag>
						))}
					</Space>

					{loading ? (
						<Spin />
					) : (
						<Row gutter={[24, 24]}>
							{data.map((item) => (
								<Col xs={24} sm={12} lg={8} key={item.maSo}>
									<Card
										hoverable
										onClick={() => history.push(`/th07/chi-tiet/${item.maSo}`)}
										cover={<img src={item.anhDaiDien} style={{ height: 220, objectFit: 'cover' }} />}
										style={{ borderRadius: 16 }}
									>
										<Tag color='pink'>{item.nhan}</Tag>

										<Title
											level={5}
											style={{
												display: '-webkit-box',
												WebkitLineClamp: 2,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
											}}
										>
											{item.tieuDe}
										</Title>

										<Paragraph ellipsis={{ rows: 2 }}>{item.tomTat}</Paragraph>

										<div style={{ display: 'flex', justifyContent: 'space-between' }}>
											<Space>
												<UserOutlined /> {item.tacGia}
											</Space>
											<Space>
												<CalendarOutlined /> {item.ngayDang}
											</Space>
										</div>
									</Card>
								</Col>
							))}
						</Row>
					)}

					{list.length === 0 && <Empty />}

					<Pagination
						current={page}
						pageSize={pageSize}
						total={list.length}
						onChange={setPage}
						style={{ textAlign: 'center', marginTop: 40 }}
					/>
				</Space>
			</Content>
		</Layout>
	);
};
