export default [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        redirect: '/home',
        meta: {
            layout: true
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',  // 在首页左侧菜单栏显示的菜单项名称
                    hidden: false,  // 是否在首页左侧菜单栏隐藏
                    icon: 'HomeFilled',  // 名称前缀图标
                    needToken: false,   // 进入该路由是否需要用户登录
                    dragPopWidget: true, // 是否展示提示下拉挂件
                },
            },
            {
                path: '/cart',
                component: () => import('@/views/cart/index.vue'),
                meta: {
                    title: '购物车',
                    icon: 'ShoppingCart',
                    needToken: true,
                },
            },
            {
                path: '/collect',
                component: () => import('@/views/collect/index.vue'),
                meta: {
                    title: '我的收藏',
                    icon: 'CollectionTag',
                    needToken: true,  
                },
            },
            {
                path: '/order',
                component: () => import('@/views/order/index.vue'),
                meta: {
                    title: '订单中心',
                    icon: 'Tickets',
                    needToken: true,  
                },
            },
            {
                path: '/customized',
                component: () => import('@/views/customized/index.vue'),
                meta: {
                    title: '私人定制',
                    icon: 'MagicStick',
                    needToken: false,
                    dragPopWidget: true, // 是否展示提示下拉挂件
                }
            },
            {
                path: '/detail',
                component: () => import('@/views/detail/index.vue'),
                meta: {
                    title: '商品详情页',
                    hidden: true,
                    needToken: false, 
                    dragPopWidget: true, // 是否展示提示下拉挂件 
                }
            },
            {
                path: '/search',
                component: () => import('@/views/search/index.vue'),
                meta: {
                    title: '商品搜索',
                    hidden: true,
                    needToken: false,  
                    dragPopWidget: true, // 是否展示提示下拉挂件
                }
            }
        ]
    },
    {
        path: '/settelment',
        component: () => import('@/views/settlement/index.vue'),
        meta: {
            title: '订单结算',
            needToken: true,  
        }
    },
    {
        path: '/pay',
        component: () => import('@/views/pay/index.vue'),
        meta: {
            title: '收银台',
            needToken: true,
        }
    },
    {
        path: '/temp',
        component: () => import('@/views/temp/index.vue'),
        meta: {
            title: 'temp'
        }
    }
]