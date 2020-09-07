<template>
  <a-row >
    <a-col :span="7" style="margin-left:-0.6%">
      <a-card style="width: 100%;height:100%;">
        <a-select default-value="device" style="width: 95%;" @change="handleChange">
          <a-select-opt-group>
            <span slot="label">
              <a-icon type="tool" theme="twoTone" /> 参数
            </span>
            <a-select-option value="device"><a-icon type="lock" theme="twoTone"/> 设备参数</a-select-option>
            <a-select-option value="config"><a-icon type="profile" theme="twoTone"/> 配置参数</a-select-option>
          </a-select-opt-group>
          <a-select-opt-group>
            <span slot="label">
              <a-icon type="database" theme="twoTone" /> 数据
            </span>
            <a-select-option value="realtime"> <a-icon type="trademark-circle" theme="twoTone"/> 实时数据</a-select-option>
            <a-select-option value="freeze"><a-icon type="reconciliation" theme="twoTone"/> 冻结数据</a-select-option>
            <a-select-option value="curve"><a-icon type="up-square" theme="twoTone"/> 曲线数据</a-select-option>
          </a-select-opt-group>
        </a-select>
        <Tree
          :tree-data="orgEquipTree"
          show-icon
          default-expand-all
          @select="onSelect"
          style="min-height:620px;max-height:620px;overflowY:scroll;"
        >
          <a-icon slot="smile" type="lock" theme="twoTone"/>
          <a-icon slot="config" type="profile" theme="twoTone" />
          <a-icon slot="real" type="trademark-circle" theme="twoTone" />
          <a-icon slot="daydata" type="reconciliation" theme="twoTone" />
          <a-icon slot="cavuel" type="up-square" theme="twoTone" />
        </Tree>
      </a-card>
    </a-col>
    <a-col :span="17" style="margin-left:0%;">
      <a-card style="width: 100%;height:100%;">
        <div v-if="seen" style="width: 100%;height:100%;min-height:652px;">
          <a-tabs @change="onTabChange" style="min-height:620px;max-height:620px;">
            <a-tab-pane v-for="equip in equips" :key="equip.address" :tab="equip.name" >
              <span slot="tab">
                <a-icon type="swap" />
                {{ equip.equipName }}
              </span>
              <compoent :is="comp" :address="equip.address" keep-alive="false"></compoent>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div v-else style="width: 100%;height:100%;min-height:652px;">
          <compoent :is="comp" :address="defaultAddress" keep-alive="false"></compoent>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import STree from '@/components/Tree/Tree'
import { Tree } from 'ant-design-vue'
import bus from '@/store/app/global.js'
// 设备参数项
const deviceItems = [
  {
    key: 'key-01-01',
    title: '终端版本信息',
    slots: {
        icon: 'smile'
      },
    value: 'F1'
  },
  {
    key: 'key-01-02',
    title: '终端时钟召测',
    slots: {
          icon: 'smile'
        },
    value: 'CallTime'
  },
    {
    key: 'key-01-03',
    title: '远程复位',
    slots: {
        icon: 'smile'
      },
    value: 'RemoteReset'
  }
]

// 配置参数项
const configItems = [
  {
    key: 'key-02-01',
    title: '档案配置',
    slots: {
      icon: 'config'
    },
    value: 'F10'
  },
  {
    key: 'key-02-02',
    title: '采集任务配置',
      slots: {
      icon: 'config'
    },
    value: 'CollectConfig'
  },
  {
    key: 'key-02-03',
    title: '主站IP地址和端口',
      slots: {
      icon: 'config'
    },
    value: 'F3'
  }
]

// 实时参数项realtime
const realtimeItems = [{
    key: 'key-03-01',
    title: '电能量',
     slots: {
      icon: 'real'
    },
    value: 'F129'
}, {
    key: 'key-03-02',
    title: '电压',
    slots: {
      icon: 'real'
    },
    value: 'Voltage'
}, {
    key: 'key-03-03',
    title: '电流',
    slots: {
      icon: 'real'
    },
    value: 'Current'
}, {
    key: 'key-03-04',
    title: '功率',
    slots: {
      icon: 'real'
    },
    value: 'Power'
}]

// 冻结参数项realtime
const freezeItems = [
  {
    key: 'key-04-01',
    title: '日冻结正向有功电能',
      slots: {
      icon: 'daydata'
    },
    value: 'F161'
  },
  {
    key: 'key-04-02',
    title: '日冻结反向有功电能',
      slots: {
      icon: 'daydata'
    },
    value: 'F163'
  }
]

// 曲线参数项realtime
const curveItems = [{
    title: '电流曲线',
    slots: {
        icon: 'cavuel'
      },
    value: 'CurveI'
},
{
  title: '电压曲线',
    slots: {
        icon: 'cavuel'
      },
    value: 'CurveU'
},
{
  title: '功率曲线',
    slots: {
        icon: 'cavuel'
      },
     value: 'CurveP'
}]

export default {
  components: {
    STree,
    Tree
  },
  data () {
    return {
      defaultAddress: '',
      equips: bus.state.controlss,
      seen: bus.state.controlss.length > 1,
      orgEquipTree: deviceItems,
      openKeys1: ['key-02'],
      comp: ''
    }
  },
  created () {
    // this.comp = () => import('./F1')
  },
  methods: {
    onTabChange (key) {
       // console.log(key)
       this.defaultAddress = key
    },
   onSelect (selectedKeys, info) {
      // console.log('selected', info.node.value)
      this.seen = bus.state.controlss.length > 1
      this.equips = bus.state.controlss
      if (bus.state.controlss.length === 1) {
    this.defaultAddress = bus.state.controlss[0].address
      }
      if (typeof bus.state.controlss === 'undefined' || bus.state.controlss.length === 0) {
         this.$message.error('必须先选择一个能源控制器')
         return
      }
      const item = info.node.value
      this.comp = () =>
        import(`./${item}`).catch(() => {
          this.comp = () => import('./UnImplementItem')
      })
    },
    handleChange (value, resolve) {
      if (value === 'realtime') {
        this.orgEquipTree = realtimeItems
      } else if (value === 'freeze') {
        this.orgEquipTree = freezeItems
      } else if (value === 'curve') {
        this.orgEquipTree = curveItems
      } else if (value === 'config') {
        this.orgEquipTree = configItems
      } else {
        this.orgEquipTree = deviceItems
      }
      this.comp = null
      return this.orgEquipTree
    }
  }
}
</script>
