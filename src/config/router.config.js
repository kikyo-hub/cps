// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/homepage/workplace',
    children: [
      {
        path: 'homepage',
        name: 'homepage',
        redirect: '/homepage/workplace',
        component: RouteView,
        hidden: true,
        meta: { title: '主页', keepAlive: true, icon: bxAnaalyse, permission: [ 'homepage' ] }, // dashboard -> homepage
        children: [
           {
            path: 'workplace',
            name: 'workplace',
            component: () => import('@/views/homepage/Workplace_v2'),
            hidden: true,
            meta: { title: '楼宇视图', keepAlive: true, permission: [ 'homepage' ] }
          }
        ]
      },
      // dashboard
      {
        path: 'monitor',
        name: 'monitor',
        component: RouteView,
        meta: { title: '用能分析', keepAlive: true, icon: bxAnaalyse, permission: [ 'monitor' ] },
        children: [
          {
            path: 'consumption',
            name: 'consumption',
            component: () => import('@/views/monitor/EnergyConsumption'),
            meta: { title: '能耗分析', keepAlive: true, permission: [ 'monitor' ] }
          },
          {
            path: 'benchmark',
            name: 'benchmark',
            component: () => import('@/views/monitor/EnergyBenchmark'),
            meta: { title: '能耗对标', keepAlive: true, permission: [ 'monitor' ] }
          },
          {
            path: 'benchmark2',
            name: 'benchmark2',
            component: () => import('@/views/monitor/EnergyBenchmark2'),
            meta: { title: '能耗对标', keepAlive: true, permission: [ 'monitor' ] }
          },
          {
            path: 'analysis',
            name: 'analysis',
            component: () => import('@/views/monitor/EnergyAnalysis'),
            meta: { title: '用能分析', keepAlive: true, permission: [ 'monitor' ] }
          },
          {
            path: 'items',
            name: 'items',
            component: RouteView,
            meta: { title: '分项用能分析', keepAlive: true, permission: [ 'monitor' ] },
            children: [
              {
                path: 'meter',
                name: 'meter',
                component: () => import('@/views/monitor/energy/ElectricEnergy'),
                meta: { title: '电能', keepAlive: true, permission: [ 'monitor' ] }
              },
              {
                path: 'water',
                name: 'water',
                component: () => import('@/views/monitor/energy/WaterEnergy'),
                meta: { title: '水能', keepAlive: true, permission: [ 'monitor' ] }
              },
              {
                path: 'thermal',
                name: 'thermal',
                component: () => import('@/views/monitor/energy/ThermalEnergy'),
                meta: { title: '热能', keepAlive: true, permission: [ 'monitor' ] }
              }
            ]
          }
        ]
      },

      // data
      {
        path: '/data',
        name: 'data',
        component: RouteView,
        meta: { title: '用能数据', icon: 'table', permission: [ 'data' ] }, // table -> data
        children: [
          {
            path: 'energy',
            name: 'energy',
            // hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/data/ComprehensiveEnergy'),
            meta: { title: '综合用能数据', keepAlive: true, permission: [ 'data' ] }
          },
          // {
          //   path: 'diagnosispoint',
          //   name: 'diagnosispoint',
          //   component: RouteView,
          //   meta: { title: '诊断点数据', keepAlive: true, permission: [ 'data' ] },
          //   children: [
          //     {
          //       path: 'diagnosis',
          //       name: 'diagnosis',
          //       component: () => import('@/views/data/Diagnosis'),
          //       meta: { title: '诊断点曲线', keepAlive: true, permission: [ 'data' ] }
          //     },
          //     {
          //       path: 'diagnosis_statistics',
          //       name: 'diagnosis_statistics',
          //       component: () => import('@/views/data/Diagnosis/Statistics'),
          //       meta: { title: '用能统计与分析', keepAlive: true, permission: [ 'data' ] }
          //     }
          //   ]
          // },
          // {
          //   path: 'monitorpoint_data',
          //   name: 'monitorpoint_data',
          //   component: RouteView,
          //   meta: { title: '监测点数据', keepAlive: true, permission: [ 'data' ] },
          //   children: [
          //   ]
          // },
          {
            path: 'day',
            name: 'day',
            component: () => import('@/views/data/DayData'),
            meta: { title: '监测点日数据', keepAlive: true, permission: [ 'data' ] }
          },
          {
            path: 'curve',
            name: 'curve',
            component: () => import('@/views/data/CurveData'),
            meta: { title: '监测点曲线数据', keepAlive: true, permission: [ 'data' ] }
          },
          {
            path: 'statistics',
            name: 'statistics',
            component: () => import('@/views/data/StatisticsData'),
            meta: { title: '监测点用能统计', keepAlive: true, permission: [ 'data' ] }
          },
          {
            path: 'datareport',
            name: 'datareport',
            component: () => import('@/views/data/DataReport'),
            meta: { title: '数据报表', keepAlive: true, permission: [ 'data' ] }
          }
        ]
      },
  // forms
  {
    path: 'device',
    name: 'device',
    component: RouteView,
    hidden: true,
    meta: { title: '设备监控', icon: 'monitor', permission: [ 'device' ] }, // form ->device
    children: [
      {
        path: 'enterprise',
        name: 'enterprise',
        component: () => import('@/views/device/EnergySurvey'),
        meta: { title: '企业监控', keepAlive: true, permission: [ 'device' ] }
      },
      {
        path: 'building',
        name: 'building',
        component: () => import('@/views/device/BuildingSurvey'),
        meta: { title: '楼宇监控', keepAlive: true, permission: [ 'device' ] }
      },
      {
        path: 'perception',
        name: 'perception',
        component: RouteView,
        meta: { title: '设备监控', keepAlive: true, permission: [ 'device' ] },
        children: [
          {
            path: 'aircondition_system',
            name: 'aircondition_system',
            component: () => import('@/views/device/perception/airconditionsystem'),
            meta: { title: '空调系统', keepAlive: true, permission: [ 'device' ] }
          },
          {
            path: 'light_system',
            name: 'light_system',
            component: () => import('@/views/device/perception/lightsystem'),
            meta: { title: '照明系统', keepAlive: true, permission: [ 'device' ] }
          },
          {
            path: 'water_system',
            name: 'water_system',
            component: () => import('@/views/device/perception/watersystem'),
            meta: { title: '给水系统', keepAlive: true, permission: [ 'device' ] }
          }
        ]
      }
    ]
  },
       // eedas
       {
        path: '/eedas',
        name: 'eedas',
        component: RouteView,
        // redirect: '/profile/basic',
        meta: { title: '采集管理', icon: 'deployment-unit', permission: [ 'eedas' ] },
        children: [
          {
            path: 'monitor_equip',
            name: 'monitor_equip',
            component: () => import('@/views/eedas/MonitorEquip'),
            meta: { title: '采集设备档案', permission: [ 'eedas' ] }
          },
          {
            path: 'monitor_point',
            name: 'monitor_point',
            component: () => import('@/views/eedas/MonitorPoint'),
            meta: { title: '监测点管理', permission: [ 'eedas' ] }
          },
          {
            path: 'collection_rules',
            name: 'collection_rules',
            component: () => import('@/views/eedas/CollectionRules'),
            meta: { title: '采集规则库', permission: [ 'eedas' ] }
          },
          {
            path: 'energy_control_manager',
            name: 'energy_control_manager',
            component: () => import('@/views/eedas/EnergyControlManager'),
            meta: { title: '数据召测', permission: [ 'eedas' ] }
          }
        ]
      },
      // efficiency
      {
        path: '/diagnosis',
        name: 'efficiency',
        // name: 'diagnosis',
        component: RouteView,
        meta: { title: '用能诊断', icon: 'check-circle-o', permission: [ 'efficiency' ] }, // result->efficiency
        children: [
          {
            path: 'custom',
            name: 'diagnosis_custom',
            component: RouteView,
            meta: { title: '自定义规则', keepAlive: false, hiddenHeaderContent: true, permission: [ 'efficiency' ] },
            children: [
              {
                path: 'rules',
                name: 'diagnosis_rules',
                component: () => import('@/views/diagnosis/DiagnosticRules'),
                meta: { title: '诊断规则', permission: [ 'efficiency' ] }
              },
              {
                path: 'manager',
                name: 'diagnosis_manager',
                component: () => import('@/views/diagnosis/DiagnosticPoint'),
                meta: { title: '诊断点管理', permission: [ 'eedas' ] }
              },
              {
                path: 'manager_detail',
                name: 'diagnostic_point_detail',
                hidden: true,
                component: () => import('@/views/diagnosis/modules/DiagnosticPointDetail'),
                meta: { title: '诊断点详情', permission: [ 'efficiency' ] }
              },
              {
                path: 'rules_detail',
                name: 'diagnostic_rules_detail',
                hidden: true,
                component: () => import('@/views/diagnosis/modules/DiagnosticRuleDetail'),
                meta: { title: '诊断规则明细', permission: [ 'efficiency' ] }
              }
            ]
          },
          {
            path: 'report_manager',
            name: 'report_manager',
            component: () => import('@/views/diagnosis/DiagnosisReportManager'),
            meta: { title: '诊断管理', keepAlive: false, hiddenHeaderContent: true, permission: [ 'efficiency' ] }
          },
          {
            path: 'diagnosis_report',
            name: 'diagnosis_report',
            hidden: true,
            component: () => import('@/views/diagnosis/AddDiagnosisReport'),
            meta: { title: '新增诊断报告', keepAlive: false, hiddenHeaderContent: true, permission: [ 'efficiency' ] }
          },
          // {
          //   path: 'display_report',
          //   name: 'display_report',
          //   hidden: true,
          //   component: () => import('@/views/diagnosis/DisplayDiagnosisReport'),
          //   meta: { title: '查看诊断报告', keepAlive: false, hiddenHeaderContent: true, permission: [ 'efficiency' ] }
          // },
          {
            path: 'energy_suggestions',
            name: 'energy_suggestions',
            hidden: true,
            component: () => import('@/views/diagnosis/EnergySuggestions'),
            meta: { title: '用能诊断建议', keepAlive: false, hiddenHeaderContent: true, permission: [ 'efficiency' ] }
          },
          {
            path: 'carbon_emission',
            name: 'carbon_emission',
            hidden: true,
            component: () => import('@/views/diagnosis/EnergySuggestions'),
            meta: { title: '碳排放量', keepAlive: false, hiddenHeaderContent: true, permission: [ 'efficiency' ] }
          },
          {
            path: 'diagnosis_survey',
            name: 'diagnosis_survey',
            component: () => import('@/views/diagnosis/DiagnosisSurvey'),
            meta: { title: '诊断勘察', keepAlive: false, hiddenHeaderContent: true, permission: [ 'efficiency' ] }
          }
        ]
      },
        // archives
        {
          path: '/archives',
          name: 'archives',
          component: RouteView,
          meta: { title: '档案管理', icon: 'box-plot', permission: [ 'archives' ] }, // profile ->archives
          children: [
            {
              path: 'organization',
              name: 'organization',
              component: () => import('@/views/archives/Enterprise_v2'),
              meta: { title: '我的组织', permission: [ 'archives' ] }
            },
            {
              path: 'buildingview',
              name: 'buildingview',
               component: () => import('@/views/archives/Building'),
              meta: { title: '楼宇视图', permission: [ 'archives' ] }
            },
            {
              path: 'fee',
              name: 'fee',
              component: () => import('@/views/archives/Fee'),
              meta: { title: '能源计费', permission: [ 'archives' ] }
            }
          ]
        },
        // system
        {
          path: '/system',
          name: 'system',
          component: RouteView,
          meta: { title: '系统配置', icon: 'audit', permission: [ 'system' ] },
          children: [
            {
              path: 'orgs',
              name: 'orgs',
              component: () => import('@/views/system/OrgManager'),
              meta: { title: '组织管理', permission: [ 'system' ] }
            },
            {
              path: 'user',
              name: 'user',
              component: () => import('@/views/system/UserManager'),
              meta: { title: '用户管理', permission: [ 'system' ] }
            },
            {
              path: 'role',
              name: 'role',
              component: () => import('@/views/system/UserRole'),
              meta: { title: '角色管理', permission: [ 'system' ] }
            },
            {
              path: 'dictionary',
              name: 'dictionary',
              hidden: false,
              component: () => import('@/views/system/dict'),
              meta: { title: '系统字典', permission: [ 'system' ] }
            }
          ]
        },

      // user
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'user',
        // name: 'account',
        hidden: true,
        meta: { title: '用户中心', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: 'center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      }

    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {// 单独页面展示
    path: '/diagnosisReport',
    component: () => import('@/views/diagnosis/DisplayDiagnosisReport'),
    meta: { title: '能效诊断报告', hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  }

]
