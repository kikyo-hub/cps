import { isIE } from '@/utils/util'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  if (isIE()) {
    console.error('[antd-pro] ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('[antd-pro] mock mounting')
  const Mock = require('mockjs2')
  require('./services/auth')
  require('./services/user')
  require('./services/manage')
  require('./services/other')
  require('./services/tagCloud')
  require('./services/article')
  require('./services/EnergyAnalysis')
  require('./services/data')
  require('./electric/TableList')
  require('./electric/StandardList')
  require('./electric/humigity')
  require('./archives/Enterprise')
  require('./archives/Equip')
  require('./archives/MonitorEquip')
  require('./archives/DiagnosticRules')
  require('./archives/MonitorPoint')
  require('./archives/Building')
  require('./archives/DiagnosticPoint')
  require('./device/EnergySurvey')
  require('./data/diagnosis')
  require('./data/humidity')
  require('./percep/airconditionsystem')
  require('./device/devicemonitor')
  require('./device/BuildingSurvey')
  require('./percep/airconditionsystem')
  require('./percep/lightsystem')
  // require('./archives/DiagnosticPoint')
  // require('./archives/MonitoringPoint')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('[antd-pro] mock mounted')
}
