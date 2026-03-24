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
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},

	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},

	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},

	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},

	{
		name: 'TH01',
		path: '/th01',
		icon: 'FolderOutlined', // Đã thêm icon thư mục
		routes: [
			{
				name: 'Bài 1',
				path: '/th01/bai1',
				component: './TH01/Bai1',
			},
			{
				name: 'Bài 2',
				path: '/th01/bai2',
				component: './TH01/Bai2',
			},
		],
	},

	{
		name: 'TH02',
		path: '/th02',
		icon: 'FolderOutlined', // Đã thêm icon thư mục
		routes: [
			{
				name: 'Bài 1',
				path: '/th02/bt1',
				component: './TH02/Bt1',
			},
			{
				name: 'Bài 2',
				path: '/th02/bt2',
				component: './TH02/Bt2',
			},
		],
	},
	{
		path: '/th03',
		name: 'TH03',
		icon: 'FileOutlined', // Đã thêm icon file tài liệu
		component: './TH03/ChamSocDa',
	},

	// === ĐÂY LÀ ROUTE TH04 VỪA THÊM ===
	{
		path: '/th04',
		name: 'TH04',
		icon: 'BookOutlined', // Đã thêm icon quyển sách
		component: './TH04',
	},
	// ==================================

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
