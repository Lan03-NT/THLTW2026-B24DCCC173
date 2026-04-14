import React, { useState, useEffect } from 'react';
import {
	Table,
	Input,
	Select,
	Button,
	Modal,
	Form,
	Space,
	message,
	Tag,
	Popconfirm,
	Typography,
	Tooltip,
	ConfigProvider,
} from 'antd';
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	ReadOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import viVN from 'antd/lib/locale/vi_VN';
import { duLieuKhoaHocMau, DANH_SACH_GIANG_VIEN, DANH_SACH_TRANG_THAI, KhoaHoc } from './duLieuGia';

const { Title, Text } = Typography;
const { Option } = Select;

const kieuGiaoDienSang = `
  .nen-xanh-bien-nhat {
    background-color: #f0f5ff;
    min-height: 100vh;
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  .the-chua-chinh {
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(24, 144, 255, 0.08);
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 40px;
  }
  .thanh-cong-cu {
    background-color: #fafcff;
    border: 1px solid #e6f7ff;
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bang-du-lieu-custom .ant-table-thead > tr > th {
    background-color: #f0f5ff !important;
    color: #003a8c !important;
    font-weight: 600;
    border-bottom: 2px solid #bae0ff !important;
  }
  .bang-du-lieu-custom .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s;
  }
  .bang-du-lieu-custom .ant-table-tbody > tr:hover > td {
    background-color: #e6f7ff !important;
  }
  .nut-xanh-chinh {
    background-color: #1890ff !important;
    border-color: #1890ff !important;
    color: white !important;
    border-radius: 8px !important;
    font-weight: 500 !important;
    box-shadow: 0 4px 10px rgba(24, 144, 255, 0.3) !important;
    transition: all 0.3s ease !important;
  }
  .nut-xanh-chinh:hover {
    background-color: #40a9ff !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(24, 144, 255, 0.4) !important;
  }
  .o-nhap-lieu {
    border-radius: 8px !important;
  }
`;

function useTriHoan<T>(giaTri: T, doTre: number): T {
	const [giaTriTriHoan, setGiaTriTriHoan] = useState<T>(giaTri);
	useEffect(() => {
		const boDem = setTimeout(() => setGiaTriTriHoan(giaTri), doTre);
		return () => clearTimeout(boDem);
	}, [giaTri, doTre]);
	return giaTriTriHoan;
}

const ThanhBoLoc = ({ timKiem, locTheoGiangVien, locTheoTrangThai, themMoi }: any) => (
	<div className='thanh-cong-cu'>
		<Space size='middle' wrap>
			<Input
				placeholder='Tìm tên khóa học...'
				prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
				allowClear
				onChange={(e) => timKiem(e.target.value)}
				style={{ width: 300, height: 42 }}
				className='o-nhap-lieu'
			/>
			<Select
				placeholder='Tất cả giảng viên'
				allowClear
				onChange={locTheoGiangVien}
				style={{ width: 180 }}
				size='large'
				className='o-nhap-lieu'
			>
				{DANH_SACH_GIANG_VIEN.map((gv) => (
					<Option key={gv} value={gv}>
						{gv}
					</Option>
				))}
			</Select>
			<Select
				placeholder='Tất cả trạng thái'
				allowClear
				onChange={locTheoTrangThai}
				style={{ width: 180 }}
				size='large'
				className='o-nhap-lieu'
			>
				{DANH_SACH_TRANG_THAI.map((tt) => (
					<Option key={tt} value={tt}>
						{tt}
					</Option>
				))}
			</Select>
		</Space>
		<Button
			type='primary'
			icon={<PlusOutlined />}
			onClick={themMoi}
			style={{ height: 42, padding: '0 24px', fontSize: 15 }}
			className='nut-xanh-chinh'
		>
			Thêm mới
		</Button>
	</div>
);

const BangKhoaHoc = ({ duLieu, sua, xoa }: any) => {
	const cotDuLieu = [
		{
			title: 'Mã KH',
			dataIndex: 'maKhoaHoc',
			key: 'maKhoaHoc',
			width: '10%',
			align: 'center',
			render: (ma: string) => (
				<Tag color='blue' style={{ fontWeight: 600, borderRadius: '4px', padding: '2px 8px' }}>
					{ma}
				</Tag>
			),
		},
		{
			title: 'Tên khóa học',
			dataIndex: 'tenKhoaHoc',
			key: 'tenKhoaHoc',
			width: '35%',
			render: (chu: string) => (
				<Text strong style={{ fontSize: '15px', color: '#262626' }}>
					{chu}
				</Text>
			),
		},
		{
			title: 'Giảng viên',
			dataIndex: 'giangVien',
			key: 'giangVien',
			width: '15%',
			render: (gv: string) => <Text style={{ color: '#595959', fontWeight: 500 }}>{gv}</Text>,
		},
		{
			title: 'Học viên',
			dataIndex: 'soLuongHocVien',
			key: 'soLuongHocVien',
			width: '15%',
			align: 'center',
			sorter: (a: KhoaHoc, b: KhoaHoc) => a.soLuongHocVien - b.soLuongHocVien,
			render: (soLuong: number) => (
				<Space size='small' style={{ color: soLuong === 0 ? '#bfbfbf' : '#096dd9', fontWeight: 600 }}>
					<TeamOutlined />
					<span>{soLuong}</span>
				</Space>
			),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: '15%',
			align: 'center',
			render: (trangThai: string) => {
				let mauSac = trangThai === 'Đang mở' ? 'success' : trangThai === 'Tạm dừng' ? 'warning' : 'error';
				return (
					<Tag color={mauSac} style={{ padding: '4px 10px', borderRadius: '12px', fontWeight: 500 }}>
						{trangThai}
					</Tag>
				);
			},
		},
		{
			title: 'Thao tác',
			key: 'hanhDong',
			width: '10%',
			align: 'center' as const,
			render: (_: any, banGhi: KhoaHoc) => {
				const choPhepXoa = banGhi.soLuongHocVien === 0;
				return (
					<Space size='middle'>
						<Tooltip title='Sửa thông tin' color='#1890ff'>
							<Button
								type='text'
								icon={<EditOutlined style={{ fontSize: '18px', color: '#1890ff' }} />}
								onClick={() => sua(banGhi)}
							/>
						</Tooltip>
						{choPhepXoa ? (
							<Popconfirm
								title='Xác nhận xóa'
								description={`Bạn có chắc muốn xóa "${banGhi.tenKhoaHoc}"?`}
								onConfirm={() => xoa(banGhi.maKhoaHoc)}
								okText='Xóa'
								cancelText='Hủy'
								okButtonProps={{ danger: true }}
							>
								<Tooltip title='Xóa khóa học' color='#ff4d4f'>
									<Button type='text' danger icon={<DeleteOutlined style={{ fontSize: '18px' }} />} />
								</Tooltip>
							</Popconfirm>
						) : (
							<Tooltip title='Không thể xóa do đã có học viên' color='#8c8c8c'>
								<Button type='text' disabled icon={<DeleteOutlined style={{ fontSize: '18px' }} />} />
							</Tooltip>
						)}
					</Space>
				);
			},
		},
	];

	return (
		<Table
			columns={cotDuLieu}
			dataSource={duLieu}
			rowKey='maKhoaHoc'
			pagination={{ pageSize: 6, showSizeChanger: false, position: ['bottomCenter'] }}
			bordered={false}
			size='middle'
			className='bang-du-lieu-custom'
		/>
	);
};

const QuanTriKhoaHoc = () => {
	const [danhSachKhoaHoc, setDanhSachKhoaHoc] = useState<KhoaHoc[]>(duLieuKhoaHocMau);
	const [tuKhoa, setTuKhoa] = useState('');
	const tuKhoaTriHoan = useTriHoan(tuKhoa, 400);
	const [locGiangVien, setLocGiangVien] = useState<string | null>(null);
	const [locTrangThai, setLocTrangThai] = useState<string | null>(null);

	const [hienThiHopThoai, setHienThiHopThoai] = useState(false);
	const [khoaHocDangSua, setKhoaHocDangSua] = useState<KhoaHoc | null>(null);
	const [bieuMau] = Form.useForm();

	const xuLyXoa = (ma: string) => {
		setDanhSachKhoaHoc(danhSachKhoaHoc.filter((kh) => kh.maKhoaHoc !== ma));
		message.success('Đã xóa khóa học thành công!');
	};

	const moHopThoai = (khoaHoc?: KhoaHoc) => {
		if (khoaHoc) {
			setKhoaHocDangSua(khoaHoc);
			bieuMau.setFieldsValue(khoaHoc);
		} else {
			setKhoaHocDangSua(null);
			bieuMau.resetFields();
		}
		setHienThiHopThoai(true);
	};

	const xuLyLuu = (giaTri: any) => {
		const biTrungTen = danhSachKhoaHoc.some(
			(kh) =>
				kh.tenKhoaHoc.toLowerCase().trim() === giaTri.tenKhoaHoc.toLowerCase().trim() &&
				kh.maKhoaHoc !== khoaHocDangSua?.maKhoaHoc,
		);

		if (biTrungTen) {
			message.error('Tên khóa học đã tồn tại, vui lòng đổi tên khác!');
			return;
		}

		if (khoaHocDangSua) {
			setDanhSachKhoaHoc(
				danhSachKhoaHoc.map((kh) => (kh.maKhoaHoc === khoaHocDangSua.maKhoaHoc ? { ...kh, ...giaTri } : kh)),
			);
			message.success('Cập nhật thông tin thành công!');
		} else {
			const khoaHocMoi = {
				...giaTri,
				maKhoaHoc: `KH${Math.floor(Math.random() * 900 + 100)}`,
				soLuongHocVien: Number(giaTri.soLuongHocVien),
			};
			setDanhSachKhoaHoc([{ ...khoaHocMoi }, ...danhSachKhoaHoc]);
			message.success('Thêm khóa học mới thành công!');
		}
		setHienThiHopThoai(false);
	};

	const danhSachDaLoc = danhSachKhoaHoc.filter((kh) => {
		const khopTen = kh.tenKhoaHoc.toLowerCase().includes(tuKhoaTriHoan.toLowerCase());
		const khopGiangVien = locGiangVien ? kh.giangVien === locGiangVien : true;
		const khopTrangThai = locTrangThai ? kh.trangThai === locTrangThai : true;
		return khopTen && khopGiangVien && khopTrangThai;
	});

	return (
		<ConfigProvider locale={viVN}>
			<style>{kieuGiaoDienSang}</style>
			<div className='nen-xanh-bien-nhat'>
				<div className='the-chua-chinh'>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
						<div
							style={{
								background: '#e6f7ff',
								padding: '16px',
								borderRadius: '50%',
								marginBottom: '16px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<ReadOutlined style={{ fontSize: 36, color: '#1890ff' }} />
						</div>
						<Title level={3} style={{ margin: 0, color: '#003a8c', fontWeight: 700, letterSpacing: '1px' }}>
							QUẢN LÝ KHÓA HỌC ONLINE
						</Title>
						<Text style={{ color: '#8c8c8c', marginTop: 8 }}>Hệ thống quản trị dữ liệu đào tạo</Text>
					</div>

					<ThanhBoLoc
						timKiem={setTuKhoa}
						locTheoGiangVien={setLocGiangVien}
						locTheoTrangThai={setLocTrangThai}
						themMoi={() => moHopThoai()}
					/>

					<BangKhoaHoc duLieu={danhSachDaLoc} sua={moHopThoai} xoa={xuLyXoa} />
				</div>

				<Modal
					title={
						<span style={{ fontSize: '18px', color: '#003a8c' }}>
							{khoaHocDangSua ? 'Chỉnh sửa khóa học' : 'Thêm mới khóa học'}
						</span>
					}
					visible={hienThiHopThoai}
					onCancel={() => setHienThiHopThoai(false)}
					onOk={() => bieuMau.submit()}
					destroyOnClose
					okText='Lưu dữ liệu'
					cancelText='Hủy'
					centered
					width={700}
					okButtonProps={{ className: 'nut-xanh-chinh' }}
				>
					<Form form={bieuMau} layout='vertical' onFinish={xuLyLuu} style={{ marginTop: 24 }}>
						<Form.Item
							name='tenKhoaHoc'
							label={<span style={{ fontWeight: 500 }}>Tên khóa học</span>}
							rules={[
								{ required: true, message: 'Vui lòng nhập tên khóa học!' },
								{ max: 100, message: 'Tối đa 100 ký tự!' },
							]}
						>
							<Input size='large' placeholder='Nhập tên khóa học...' className='o-nhap-lieu' />
						</Form.Item>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
							<Form.Item
								name='giangVien'
								label={<span style={{ fontWeight: 500 }}>Giảng viên</span>}
								rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}
							>
								<Select size='large' placeholder='Chọn giảng viên' className='o-nhap-lieu'>
									{DANH_SACH_GIANG_VIEN.map((gv) => (
										<Option key={gv} value={gv}>
											{gv}
										</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								name='soLuongHocVien'
								label={<span style={{ fontWeight: 500 }}>Số lượng học viên</span>}
								rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
							>
								<Input size='large' type='number' min={0} placeholder='Nhập số' className='o-nhap-lieu' />
							</Form.Item>
							<Form.Item
								name='trangThai'
								label={<span style={{ fontWeight: 500 }}>Trạng thái</span>}
								rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
							>
								<Select size='large' placeholder='Chọn trạng thái' className='o-nhap-lieu'>
									{DANH_SACH_TRANG_THAI.map((tt) => (
										<Option key={tt} value={tt}>
											{tt}
										</Option>
									))}
								</Select>
							</Form.Item>
						</div>
						<Form.Item
							name='moTa'
							label={<span style={{ fontWeight: 500 }}>Mô tả chi tiết</span>}
							rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
						>
							<Input.TextArea rows={4} placeholder='Nhập mã HTML mô tả...' className='o-nhap-lieu' />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</ConfigProvider>
	);
};

export default QuanTriKhoaHoc;
