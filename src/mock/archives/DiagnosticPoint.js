import Mock from 'mockjs2'
import { builder, getBody } from '../util'
const getDigP = (options) => {
    return builder({
        'data': [{
            'diagnosisId': '10001',
            'diagnosisName': '空调诊断点12',
            'diagnosisRuleId': '32',
            'diagnosisType': '空调',
            'creator': '杨晓元',
            'createTime': '2020-01-03',
            'deleted': 0,
            'permissions': [{
                'roleId': 'admin',
                'permissionId': 'comment',
                'permissionName': '评论管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                }],
                'actionList': ['delete', 'edit'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'member',
                'permissionName': '会员管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                }
                ],
                'actionList': ['query', 'get', 'edit', 'delete'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'menu',
                'permissionName': '菜单管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'import',
                    'describe': '导入',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'import'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'order',
                'permissionName': '订单管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                }
                ],
                'actionList': ['query', 'add', 'get'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'permission',
                'permissionName': '权限管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'get', 'edit', 'delete'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'role',
                'permissionName': '角色管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                }
                ],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'test',
                'permissionName': '测试权限',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'user',
                'permissionName': '用户管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'import',
                    'describe': '导入',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                },
                {
                    'action': 'export',
                    'describe': '导出',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'get'],
                'dataAccess': null
            }
            ]
        },
        {
            'diagnosisId': '10002',
            'diagnosisName': '照明诊断点14',
            'diagnosisRuleId': '23',
            'diagnosisType': '照明',
            'creator': '刘峰杨',
            'createTime': '2020-01-22',
            'deleted': 0,
            'permissions': [{
                'roleId': 'admin',
                'permissionId': 'comment',
                'permissionName': '评论管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'get', 'delete'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'member',
                'permissionName': '会员管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'query', 'get'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'menu',
                'permissionName': '菜单管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'import',
                    'describe': '导入',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'get'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'order',
                'permissionName': '订单管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'query'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'permission',
                'permissionName': '权限管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add', 'get', 'edit'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'role',
                'permissionName': '角色管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                },
                {
                    'action': 'delete',
                    'describe': '删除',
                    'defaultCheck': false
                }
                ],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'test',
                'permissionName': '测试权限',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': ['add', 'edit'],
                'dataAccess': null
            },
            {
                'roleId': 'admin',
                'permissionId': 'user',
                'permissionName': '用户管理',
                'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"edit","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
                'actionEntitySet': [{
                    'action': 'add',
                    'describe': '新增',
                    'defaultCheck': false
                },
                {
                    'action': 'import',
                    'describe': '导入',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                },
                {
                    'action': 'edit',
                    'describe': '修改',
                    'defaultCheck': false
                }
                ],
                'actionList': ['add'],
                'dataAccess': null
            }
            ]
        },
        {
            'diagnosisId': '10003',
            'diagnosisName': '用水诊断点03',
            'diagnosisRuleId': '45',
            'diagnosisType': '用水',
            'creator': '王建亮',
            'createTime': '2020-02-23',
            'deleted': 0,
            'permissions': [{
                'roleId': 'user',
                'permissionId': 'comment',
                'permissionName': '评论管理',
                'actions': '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
                'actionEntitySet': [{
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                }
                ],
                'actionList': ['query'],
                'dataAccess': null
            },

            {
                'roleId': 'user',
                'permissionId': 'marketing',
                'permissionName': '营销管理',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'user',
                'permissionId': 'member',
                'permissionName': '会员管理',
                'actions': '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
                'actionEntitySet': [{
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                }
                ],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'user',
                'permissionId': 'menu',
                'permissionName': '菜单管理',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': null,
                'dataAccess': null
            },

            {
                'roleId': 'user',
                'permissionId': 'order',
                'permissionName': '订单管理',
                'actions': '[{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"}]',
                'actionEntitySet': [{
                    'action': 'query',
                    'describe': '查询',
                    'defaultCheck': false
                },
                {
                    'action': 'get',
                    'describe': '详情',
                    'defaultCheck': false
                }
                ],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'user',
                'permissionId': 'permission',
                'permissionName': '权限管理',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'user',
                'permissionId': 'role',
                'permissionName': '角色管理',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': null,
                'dataAccess': null
            },

            {
                'roleId': 'user',
                'permissionId': 'test',
                'permissionName': '测试权限',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': null,
                'dataAccess': null
            },
            {
                'roleId': 'user',
                'permissionId': 'user',
                'permissionName': '用户管理',
                'actions': '[]',
                'actionEntitySet': [],
                'actionList': null,
                'dataAccess': null
            }
            ]
        }
        ],
        'pageSize': 10,
        'pageNo': 0,
        'totalPage': 1,
        'totalCount': 5
    })
}
const delDigP = (options) => {
    const body = getBody(options)
    return builder(null, body.id + '删除成功')
}

const updDigP = (options) => {
    const body = getBody(options)
    return builder(null, body.id + '更新成功')
}

const insDigP = (options) => {
    return builder(null, '新增成功')
}

Mock.mock(/\/archives\/a/, 'post', getDigP)
Mock.mock(/\/archives\/delDigP/, 'post', delDigP)
Mock.mock(/\/archives\/updDigP/, 'post', updDigP)
Mock.mock(/\/archives\/insDigP/, 'post', insDigP)
