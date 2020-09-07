<template>
  <div class="part2" id="pdfCentent">
    <p align="left" style="font-size:22px">2、 客户基本情况</p>
    <p align="left" style="font-size:20px">2.1 客户简介</p>
    <template v-if="enterprisedata">
      <p style="font-size:18px">{{ enterprisedata.name }}位于{{ enterprisedata.address }}，单位占地面积{{ enterprisedata.Buildings[0].buildingArea }}万多平方米，
        建筑占地面积{{ enterprisedata.Buildings[0].buildingArea }}万平方米，总投资1亿元，拥有员工500多人，主要经营生产：{{ enterprisedata.pro_sort }}。</p>
      <p align="left" style="font-size:20px">2.2 主要能耗</p>
      <p style="font-size:18px">楼宇用能情况主要体现在空调用能方面，中央空调系统能耗占比40-60%，中央空调系统节能潜力 15-20%。单个项目中冷热源设备的功率和能耗占到中央空调系统冷站的
        60-70%（装机功率可达 300kW 以上），夏季中央空调也是造成用电高峰的主要负荷来源，因此冷热源设备是中央空调系统节能和需求响应调控的重点设备。</p>
      <p style="font-size:18px">中央空调是公共建筑中重要的能耗系统，但其传统监控系统较为复杂，运行人员难以使用及调控，通常通过人工手动模式进行操作，导致设备运行效果不佳 且能耗较高。
        通过商业楼宇用能控制系统（CPS），可实现系统快速部署，云端自动调控，降低现场运行人员劳动强度与专业度要求，降低用户运行成本的效果。 并可将大量空调柔性负荷快速汇集，实现电网进行需求侧响应的目的。</p>
    </template>
  </div>
</template>

<script>
import { GetEnterpriseData } from '@/api/archives/enterprise'
const goodsColumns = [
        {
          title: '采样时间',
          dataIndex: 'createTime',
          slots: { title: 'createTimeTitle' },
          scopedSlots: { customRender: 'createTime' },
          key: 'createTime',
          align: 'center'
        },
        {
          title: '用电 (kw.H)',
          dataIndex: 'elec',
          slots: { title: 'diagnosisIdTitle' },
          scopedSlots: { customRender: 'elec' },
          key: 'elec',
          align: 'center'
        },
        {
          title: '用水 (t)',
          dataIndex: 'water',
          slots: { title: 'diagnosisNameTitle' },
          scopedSlots: { customRender: 'water' },
          key: 'water',
          align: 'center'
        },
        {
          title: '用气 (m³)',
          dataIndex: 'gas',
          slots: { title: 'diagnosisTypeDescTitle' },
          scopedSlots: { customRender: 'gas' },
          key: 'gas',
          align: 'center'
        },
        {
          title: '用热 (J)',
          dataIndex: 'heat',
          slots: { title: 'buildingNoTitle' },
          scopedSlots: { customRender: 'heat' },
          key: 'heat',
          align: 'center'
        }
]
const loadGoodsData = [
  {
    key: 0,
    createTime: '2020.7.15',
    elec: '500',
    water: '5',
    gas: '1',
    heat: '0.2'
  },
  {
    key: 1,
    createTime: '2020.7.16',
    elec: '458',
    water: '5.8',
    gas: '1',
    heat: '0.2'
  },
  {
    key: 2,
    createTime: '2020.7.17',
    elec: '520',
    water: '6.1',
    gas: '1',
    heat: '0.2'
  },
  {
    key: 3,
    createTime: '2020.7.18',
    elec: '523',
    water: '5.2',
    gas: '1',
    heat: '0.2'
  }
]
const consumeColumns = [
        {
        title: '场所',
        dataIndex: 'place',
        slots: { title: 'placeTitle' },
        scopedSlots: { customRender: 'place' },
        key: 'place',
        align: 'center'
      },
      {
        title: '设备',
        dataIndex: 'equip',
        slots: { title: 'equipIdTitle' },
        scopedSlots: { customRender: 'equip' },
        key: 'equip',
        align: 'center'
      },
      {
        title: '厂家/型号',
        dataIndex: 'manufactor',
        slots: { title: 'manufactorTitle' },
        scopedSlots: { customRender: 'manufactor' },
        key: 'manufactor',
        align: 'center'
      },
      {
        title: '设备数量(台)',
        dataIndex: 'equipNum',
        slots: { title: 'equipNumTitle' },
        scopedSlots: { customRender: 'equipNum' },
        key: 'equipNum',
        align: 'center'
      },
      {
        title: '功率 (kw/台)',
        dataIndex: 'power',
        slots: { title: 'powerTitle' },
        scopedSlots: { customRender: 'power' },
        key: 'power',
        align: 'center'
      }
]
const consumeData = [
  {
    key: 0,
    place: '车间',
    equip: '人造革线',
    manufactor: '——',
    equipNum: '1',
    power: '0.2'
  },
  {
    key: 1,
    place: '车间',
    equip: '自动化生产线',
    manufactor: '——',
    equipNum: '3',
    power: '0.2'
  },
  {
    key: 2,
    place: '空压机房',
    equip: '空压机',
    manufactor: '——',
    equipNum: '2',
    power: '0.2'
  },
  {
    key: 3,
    place: '冷水机',
    equip: '日立',
    manufactor: '复盛',
    equipNum: '3',
    power: '0.2'
  },
  {
    key: 4,
    place: '锅炉房',
    equip: '导油热炉',
    manufactor: '120p',
    equipNum: '1',
    power: '0.2'
  },
  {
    key: 5,
    place: '办公室',
    equip: '空调',
    manufactor: '1.5p',
    equipNum: '18',
    power: '0.2'
  },
  {
    key: 6,
    place: '机房',
    equip: '服务器',
    manufactor: '2000kw',
    equipNum: '5',
    power: '0.2'
  }
]

export default {
    name: 'ReportContentPart201',
    data () {
      return {
        goodsColumns,
        loadGoodsData,
        consumeColumns,
        consumeData,
        enterprisedata: ''
      }
    },
     created () {
        this.getData()
     },
    methods: {
    getData () {
      GetEnterpriseData(1).then(response => {
        this.enterprisedata = response.result
        // console.log('this.enterprisedata: ', this.enterprisedata.buildingAddress)
      })
    }
    }
}
</script>

<style lang="less" scoped>
.part2{text-indent: 40px;}
</style>
