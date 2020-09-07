<template>
  <a-card>
    <a-row :gutter="12">
      <!-- <a-col :span="4">
        <a-card :bordered="false" >
          <a-tree :tree-data="treeData" show-icon default-expand-all :default-selected-keys="['0-0-0']">
            <a-icon slot="switcherIcon" type="down"/>
            <a-icon slot="meh" type="wallet" theme="twoTone"/>
          </a-tree>
        </a-card>
      </a-col> -->
      <a-col :span="24">
        <a-card :bordered="false">
          <a-form layout="inline">
            <a-form-item label="选择诊断区域">
              <a-select default-value="Enterprise" style="width:100%" @change="handleChange">
                <a-select-option v-for="area in treeData[0].children" :key="area.key" :value="area.key">
                  {{ area.title }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="选择能耗对标">
              <a-select default-value="1">
                <a-select-option v-for="standard in benchmarking" :key="standard.key" :value="standard.key">
                  {{ standard.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-if="visiable" label="选择时间">
              <a-range-picker
              />
            </a-form-item>
            <a-form-item v-else label="选择时间">
              <a-range-picker
                :placeholder="['开始月份', '结束月份']"
                format="YYYY-MM"
                :mode="['month', 'month']"
                :value="value"
                @panelChange="value1 => value=value1"
              />
            </a-form-item>
            <a-form-item ><a-button type="primary" icon="search">查询</a-button></a-form-item>
          </a-form>
          <a-tabs :tab-bar-style="{marginBottom: '0px', paddingLeft: '16px'}" @change="callback">
            <span slot="tabBarExtraContent">
              <a-radio-group default-value="0" @change="visiable = !visiable">
                <a-radio-button value="0">日</a-radio-button>
                <a-radio-button value="1">月</a-radio-button>
              </a-radio-group>
            </span>
            <a-tab-pane v-for="item in energyType" :key="item.key" :tab="item.name">
              <keep-alive>
                <component :is="currentComponment" :energy-type="item.name"></component>
              </keep-alive>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import { Tree } from 'ant-design-vue'
import EnterpriseEnergy from './module/EnterpriseEnergy'
// import BuildingEnergy from './module/BuildingEnergy'
import FloorEnergy from './module/FloorEnergy'

const energyType = [
  {
  key: 'Electric',
  name: '电能'
  },
  {
    key: 'Water',
    name: '水能'
  },
  {
    key: 'Gas',
    name: '气能'
  },
  {
    key: 'Heat',
    name: '热能'
  },
  {
    key: 'Comprehensive',
    name: '综合'
  }
 ]
const treeData = [
  {
    // title: '诊断区域',
    // key: '0-0',
    // slots: {
    //   icon: 'smile'
    // },
    children: [
      { title: '企业', key: 'Enterprise', slots: { icon: 'meh' } },
      // { title: '楼栋', key: 'Building', slots: { icon: 'meh' } },
      { title: '楼栋', key: 'Floor', slots: { icon: 'meh' } }
    ]
  }
]
const benchmarking = [
    { key: '0', name: '行业标准' },
    { key: '1', name: '安徽省公共建筑节能设计标准标准' },
    { key: '2', name: '民用建筑能耗标准' }
]
export default {
    components: {
    ATree: Tree,
    EnterpriseElectric: EnterpriseEnergy,
    EnterpriseWater: EnterpriseEnergy,
    EnterpriseGas: EnterpriseEnergy,
    EnterpriseHeat: EnterpriseEnergy,
    EnterpriseComprehensive: EnterpriseEnergy,
    // BuildingElectric: BuildingEnergy,
    // BuildingWater: BuildingEnergy,
    // BuildingGas: BuildingEnergy,
    // BuildingHeat: BuildingEnergy,
    // BuildingComprehensive: BuildingEnergy,
    // BuildingEnergy,
    FloorElectric: FloorEnergy,
    FloorWater: FloorEnergy,
    FloorGas: FloorEnergy,
    FloorHeat: FloorEnergy,
    FloorComprehensive: FloorEnergy
  },
    data () {
        return {
            treeData,
            energyType,
            visiable: true,
            value: [],
            benchmarking,
            currentTab: 'Electric',
            currentSelect: 'Enterprise'
        }
    },
    methods: {
      callback (key) {
        // console.log(key, 'key')
        this.currentTab = key
      },
      handleChange (value) {
        // console.log('value', value)
      this.currentSelect = value
    }
    },
    computed: {
      currentComponment () {
        return (this.currentSelect + this.currentTab)
      }
    }
}
</script>
<style scoped>
.form {
  left:7%
}
</style>
