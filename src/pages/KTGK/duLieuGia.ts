export interface KhoaHoc {
	maKhoaHoc: string;
	tenKhoaHoc: string;
	giangVien: string;
	soLuongHocVien: number;
	moTa: string;
	trangThai: 'Đang mở' | 'Đã kết thúc' | 'Tạm dừng';
}

export const DANH_SACH_GIANG_VIEN = ['Thầy Thanh', 'Cô Hoa', 'Thầy Bình', 'Cô Ngọc'];
export const DANH_SACH_TRANG_THAI = ['Đang mở', 'Đã kết thúc', 'Tạm dừng'];

export const duLieuKhoaHocMau: KhoaHoc[] = [
	{
		maKhoaHoc: 'KH01',
		tenKhoaHoc: 'Lập trình Web Frontend với React',
		giangVien: 'Thầy Thanh',
		soLuongHocVien: 45,
		moTa: '<p>Học ReactJS và Ant Design v4</p>',
		trangThai: 'Đang mở',
	},
	{
		maKhoaHoc: 'KH02',
		tenKhoaHoc: 'Cấu trúc dữ liệu và giải thuật',
		giangVien: 'Cô Hoa',
		soLuongHocVien: 0,
		moTa: '<p>Học C++ và thuật toán nền tảng</p>',
		trangThai: 'Tạm dừng',
	},
	{
		maKhoaHoc: 'KH03',
		tenKhoaHoc: 'Lập trình Java Spring Boot',
		giangVien: 'Thầy Bình',
		soLuongHocVien: 120,
		moTa: '<p>Làm Backend với Java</p>',
		trangThai: 'Đã kết thúc',
	},
	{
		maKhoaHoc: 'KH04',
		tenKhoaHoc: 'Thiết kế UI/UX cơ bản',
		giangVien: 'Cô Ngọc',
		soLuongHocVien: 0,
		moTa: '<p>Sử dụng Figma để thiết kế</p>',
		trangThai: 'Đang mở',
	},
	{
		maKhoaHoc: 'KH05',
		tenKhoaHoc: 'Lập trình Python cho người mới',
		giangVien: 'Cô Hoa',
		soLuongHocVien: 85,
		moTa: '<p>Cơ bản về Python</p>',
		trangThai: 'Đang mở',
	},
	{
		maKhoaHoc: 'KH06',
		tenKhoaHoc: 'Phân tích dữ liệu với Pandas',
		giangVien: 'Thầy Bình',
		soLuongHocVien: 30,
		moTa: '<p>Data Analysis cơ bản</p>',
		trangThai: 'Tạm dừng',
	},
	{
		maKhoaHoc: 'KH07',
		tenKhoaHoc: 'Xây dựng API với NodeJS',
		giangVien: 'Thầy Thanh',
		soLuongHocVien: 60,
		moTa: '<p>ExpressJS và MongoDB</p>',
		trangThai: 'Đang mở',
	},
	{
		maKhoaHoc: 'KH08',
		tenKhoaHoc: 'Tiếng Anh chuyên ngành CNTT',
		giangVien: 'Cô Ngọc',
		soLuongHocVien: 200,
		moTa: '<p>Từ vựng IT</p>',
		trangThai: 'Đã kết thúc',
	},
	{
		maKhoaHoc: 'KH09',
		tenKhoaHoc: 'Bảo mật thông tin cơ bản',
		giangVien: 'Thầy Bình',
		soLuongHocVien: 0,
		moTa: '<p>Network Security</p>',
		trangThai: 'Đang mở',
	},
	{
		maKhoaHoc: 'KH10',
		tenKhoaHoc: 'Lập trình ứng dụng di động React Native',
		giangVien: 'Thầy Thanh',
		soLuongHocVien: 40,
		moTa: '<p>Cross-platform Mobile App</p>',
		trangThai: 'Tạm dừng',
	},
	{
		maKhoaHoc: 'KH11',
		tenKhoaHoc: 'Kiểm thử phần mềm (Manual Testing)',
		giangVien: 'Cô Hoa',
		soLuongHocVien: 150,
		moTa: '<p>Quy trình test chuẩn</p>',
		trangThai: 'Đã kết thúc',
	},
	{
		maKhoaHoc: 'KH12',
		tenKhoaHoc: 'Thiết kế cơ sở dữ liệu SQL',
		giangVien: 'Thầy Bình',
		soLuongHocVien: 75,
		moTa: '<p>MySQL và SQL Server</p>',
		trangThai: 'Đang mở',
	},
	{
		maKhoaHoc: 'KH13',
		tenKhoaHoc: 'Quản lý dự án Agile/Scrum',
		giangVien: 'Cô Ngọc',
		soLuongHocVien: 0,
		moTa: '<p>Scrum Master cơ bản</p>',
		trangThai: 'Đang mở',
	},
	{
		maKhoaHoc: 'KH14',
		tenKhoaHoc: 'Lập trình C# WinForms',
		giangVien: 'Thầy Thanh',
		soLuongHocVien: 10,
		moTa: '<p>Desktop App cơ bản</p>',
		trangThai: 'Tạm dừng',
	},
	{
		maKhoaHoc: 'KH15',
		tenKhoaHoc: 'Nhập môn Trí tuệ nhân tạo (AI)',
		giangVien: 'Cô Hoa',
		soLuongHocVien: 95,
		moTa: '<p>Machine Learning 101</p>',
		trangThai: 'Đang mở',
	},
];
