import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/hr',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'hr',
    meta: {
      title: '人社管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'audit',
        component: () => import('@/views/fumin/applicant'),
        name: 'audit',
        meta: {
          perms: ['GET /admin/applicant/list', 'POST /admin/applicant/create', 'GET /admin/applicant/read', 'POST /admin/applicant/update', 'POST /admin/applicant/delete'],
          title: '人社审核',
          noCache: true
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/fumin/audit'),
        name: 'detail',
        meta: {
          perms: ['POST /admin/applicant/update', 'GET /admin/applicant/read'],
          title: '审核',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/fumin/edit'),
        name: 'edit',
        meta: {
          perms: ['POST /admin/applicant/update', 'GET /admin/applicant/read'],
          title: '修改申请人',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detailView',
        component: () => import('@/views/fumin/detail'),
        name: 'detailView',
        meta: {
          perms: ['GET /admin/applicant/read'],
          title: '查看',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'applicant',
        component: () => import('@/views/fumin/applicant'),
        name: 'applicant',
        meta: {
          perms: ['GET /admin/applicant/list', 'POST /admin/applicant/create', 'GET /admin/applicant/read', 'POST /admin/applicant/update', 'POST /admin/applicant/delete'],
          title: '申请人',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'create',
        component: () => import('@/views/fumin/create'),
        name: 'goodsCreate',
        meta: {
          perms: ['POST /admin/applicant/create'],
          title: '申请贷款',
          noCache: true
        },
        hidden: true
      }
    ]
  }, {
    path: '/assure',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'assure',
    meta: {
      title: '担保公司审核',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/assure/list'),
        name: 'list',
        meta: {
          perms: ['GET /admin/assure/list', 'POST /admin/assure/create', 'GET /admin/assure/read', 'POST /admin/assure/update'],
          title: '担保公司管理',
          noCache: true
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/assure/audit'),
        name: 'detail',
        meta: {
          perms: ['POST /admin/assure/update', 'GET /admin/assure/read'],
          title: '担保公司审核',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detailView',
        component: () => import('@/views/assure/detail'),
        name: 'detailView',
        meta: {
          perms: ['GET /admin/assure/read'],
          title: '查看',
          noCache: true
        },
        hidden: true
      }
    ]
  }, {
    path: '/ba',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'ba',
    meta: {
      title: '贷款银行',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/bank/list'),
        name: 'list',
        meta: {
          perms: ['GET /admin/ba/list', 'POST /admin/ba/create', 'GET /admin/ba/read', 'POST /admin/ba/update'],
          title: '银行审核',
          noCache: true
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/bank/audit'),
        name: 'detail',
        meta: {
          perms: ['GET /admin/ba/list', 'POST /admin/ba/create', 'GET /admin/ba/read', 'POST /admin/ba/update'],
          title: '贷款审核',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detailView',
        component: () => import('@/views/bank/detail'),
        name: 'detailView',
        meta: {
          perms: ['GET /admin/ba/list', 'POST /admin/ba/create', 'GET /admin/ba/read', 'POST /admin/ba/update'],
          title: '查看',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'userManage',
    hidden: true,
    meta: {
      title: '用户管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/user'),
        name: 'user',
        meta: {
          perms: ['GET /admin/user/list'],
          title: '会员管理',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '管理员',
          noCache: true
        }
      },
      {
        path: 'bank',
        component: () => import('@/views/fumin/bank'),
        name: 'bank',
        meta: {
          perms: ['GET /admin/bank/list', 'POST /admin/bank/create', 'GET /admin/bank/read', 'POST /admin/bank/update', 'POST /admin/bank/delete'],
          title: '银行管理',
          noCache: true
        }
      },
      {
        path: 'document',
        component: () => import('@/views/document/list'),
        name: 'document',
        meta: {
          perms: ['GET /admin/document/list', 'POST /admin/document/create', 'GET /admin/document/read', 'POST /admin/document/update', 'POST /admin/document/delete'],
          title: '富文本管理',
          noCache: true
        }
      },
      {
        path: 'dict',
        component: () => import('@/views/dict/list'),
        name: 'dict',
        meta: {
          perms: ['GET /admin/dict/list', 'POST /admin/dict/create', 'GET /admin/dict/read', 'POST /admin/dict/update', 'POST /admin/dict/delete'],
          title: '字典项管理',
          noCache: true
        }
      },
      {
        path: 'document-create',
        component: () => import('@/views/document/create'),
        name: 'documentCreate',
        meta: {
          perms: ['POST /admin/document/create'],
          title: '创建富文本',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'document-edit',
        component: () => import('@/views/document/edit'),
        name: 'documentEdit',
        meta: {
          perms: ['POST /admin/document/edit'],
          title: '编辑富文本',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'notice',
        component: () => import('@/views/sys/notice'),
        name: 'notice',
        meta: {
          perms: ['GET /admin/notice/list', 'POST /admin/notice/create', 'POST /admin/notice/update', 'POST /admin/notice/delete'],
          title: '通知管理',
          noCache: true
        }
      },
      {
        path: 'log',
        component: () => import('@/views/sys/log'),
        name: 'log',
        meta: {
          perms: ['GET /admin/log/list'],
          title: '操作日志',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'role',
        meta: {
          perms: ['GET /admin/role/list', 'POST /admin/role/create', 'POST /admin/role/update', 'POST /admin/role/delete', 'GET /admin/role/permissions', 'POST /admin/role/permissions'],
          title: '角色管理',
          noCache: true
        }
      },
      {
        path: 'os',
        component: () => import('@/views/sys/os'),
        name: 'os',
        hidden: true,
        meta: {
          perms: ['GET /admin/storage/list', 'POST /admin/storage/create', 'POST /admin/storage/update', 'POST /admin/storage/delete'],
          title: '对象存储',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'password',
        component: () => import('@/views/profile/password'),
        name: 'password',
        meta: { title: '修改密码', noCache: true }
      },
      {
        path: 'notice',
        component: () => import('@/views/profile/notice'),
        name: 'notice',
        meta: { title: '通知中心', noCache: true }
      }
    ],
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
]
