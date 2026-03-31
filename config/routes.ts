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
