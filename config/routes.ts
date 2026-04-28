export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	{
		path: '/dashboard',
		name: 'Trang chủ',
		icon: 'DashboardOutlined',
	},

	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},

	{
		path: '/random-user',
		name: 'Người dùng ngẫu nhiên',
		component: './RandomUser',
		icon: 'UserSwitchOutlined',
	},

	{
		path: '/todo-list',
		name: 'Danh sách công việc',
		icon: 'FormOutlined',
		component: './TodoList',
	},

	{
		name: 'TH01 - Thực hành',
		path: '/th01',
		icon: 'ExperimentOutlined',
		routes: [
			{
				name: 'Bài tập 1',
				path: '/th01/bai1',
				component: './TH01/Bai1',
			},
			{
				name: 'Bài tập 2',
				path: '/th01/bai2',
				component: './TH01/Bai2',
			},
		],
	},

	{
		name: 'TH02 - Phát triển',
		path: '/th02',
		icon: 'CodeOutlined',
		routes: [
			{
				name: 'Bài tập 1',
				path: '/th02/bt1',
				component: './TH02/Bt1',
			},
			{
				name: 'Bài tập 2',
				path: '/th02/bt2',
				component: './TH02/Bt2',
			},
		],
	},

	{
		path: '/th03',
		name: 'TH03 - Chăm sóc da',
		icon: 'SmileOutlined',
		component: './TH03/ChamSocDa',
	},

	{
		path: '/th04',
		name: 'TH04 - Tài liệu',
		icon: 'ReadOutlined',
		component: './TH04',
	},

	{
		path: '/th05',
		name: 'TH05 - Quản lý CLB',
		icon: 'TeamOutlined',
		component: './TH05',
	},

	{
		path: '/th06',
		name: 'TH06 - Travel',
		icon: 'CompassOutlined',
		component: './TH06',
	},

	{
		path: '/ktgk',
		name: 'KTGK - Quản lý KH',
		icon: 'BookOutlined',
		component: './KTGK',
	},

	{
		name: 'TH07 - GlowDiary Blog',
		path: '/th07',
		icon: 'ContainerOutlined',
		routes: [
			{
				name: 'Trang chủ Blog',
				path: '/th07/index',
				component: './TH07/index',
			},
			{
				name: 'Chi tiết Review',
				path: '/th07/chi-tiet/:maBaiViet',
				component: './TH07/ChiTietBaiViet',
				hideInMenu: true,
			},
			{
				name: 'Về Blogger',
				path: '/th07/gioi-thieu',
				component: './TH07/GioiThieu',
			},
			{
				name: 'Quản trị nội dung',
				path: '/th07/admin',
				routes: [
					{
						name: 'Quản lý bài viết',
						path: '/th07/admin/bai-viet',
						component: './TH07/Admin/index',
					},
					{
						name: 'Quản lý danh mục',
						path: '/th07/admin/tags',
						component: './TH07/Admin/Tags',
					},
					{
						path: '/th07/admin',
						redirect: '/th07/admin/bai-viet',
					},
				],
			},
			{
				path: '/th07',
				redirect: '/th07/index',
			},
		],
	},

	{
		name: 'TH08 - Sức khỏe & Thể dục',
		path: '/th08',
		icon: 'HeartOutlined',
		routes: [
			{
				name: 'Quản lý sức khỏe',
				path: '/th08/tracking',
				icon: 'DashboardOutlined',
				routes: [
					{
						name: 'Trang chủ',
						path: '/th08/tracking/dashboard',
						component: './TH08/TrangChu',
					},
					{
						name: 'Nhật ký tập luyện',
						path: '/th08/tracking/workout',
						component: './TH08/NhatKyTapLuyen',
					},
					{
						name: 'Chỉ số sức khỏe',
						path: '/th08/tracking/health',
						component: './TH08/ChiSoSucKhoe',
					},
					{
						name: 'Quản lý mục tiêu',
						path: '/th08/tracking/goals',
						component: './TH08/QuanLyMucTieu',
					},
				],
			},
			{
				name: 'Thư viện bài tập',
				path: '/th08/library',
				icon: 'ReadOutlined',
				component: './TH08/ThuVienBaiTap',
			},
			{
				path: '/th08',
				redirect: '/th08/tracking/dashboard',
			},
		],
	},

	{
		path: '/notification',
		layout: false,
		hideInMenu: true,
		routes: [
			{
				path: '/notification/subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: '/notification/check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: '/notification',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
	},

	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},

	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},

	{
		component: './exception/404',
	},
];
