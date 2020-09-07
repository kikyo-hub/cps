<template>
  <div class="part2" id="pdfCentent">
    <p align="left" style="font-size:30px">第二章 客户基本情况</p>
    <p align="left" style="font-size:28px">第一节 客户简介</p>
    <p style="font-size:25px">{{ enterprisedata.name }}位于{{ xx }}，单位占地面积{{ xx }}万多平方米， 建筑占地面积{{ xx }}万平方米，总投资{{ xx }}亿元，拥有员工{{ xx }}多人，主要经营生产：{{ xx }}。</p>
    <p align="left" style="font-size:28px">第二节 主要能耗设备</p>
    <p style="font-size:25px">{{ xx }}有限公司生产场所包括{{ xx }}、{{ xx }}、{{ xx }}以及{{ xx }}、{{ xx }}、{{ xx }}、{{ xx }}等，主要生产{{ xx }}、{{ xx }}、 {{ xx }}等产品。{{ xx }} 2 条；{{ xx }}2 条、
      {{ xx }}3 条。另外，客户压缩空气由{{ xx }}台空压机设备提供； 导热油锅炉{{ xx }}台，其中{{ xx }}台 {{ xx }} 万大卡，{{ xx }} 台 {{ xx }} 万大卡；冷水机，有{{ xx }}台，其中 {{ xx }} 台
      120P的，{{ xx }}台 60P的均为工频机。</p>
    <p align="center" style="margin-top:5px;font-size:28px">表2.1 客户主要能耗设备 </p>
    <div class="table2">
      <a-table
        ref="table"
        style="margin-bottom: 24px"
        row-key="key"
        :columns="consumeColumns"
        :data-source="consumeData"
        :pagination="false"
        bordered>
      </a-table>
    </div>
    <p align="left" style="font-size:28px">第三节 客户能源管理体系</p>
    <p align="left" style="font-size:25px">一、 能源管理文件（制度）</p>
    <p style="font-size:25px">为了强化节能管理意识，保障节能工作有效进行，客户已颁布：</p>
    <p style="font-size:25px">1．供用能管理办法 </p>
    <p style="font-size:25px">2．突发能源动力事件紧急预案</p>
    <p style="font-size:25px">3．能源采购和审批管理制度</p>
    <p style="font-size:25px">4．能源财务管理制度</p>
    <p style="font-size:25px">5．能源生产管理制度</p>
    <p style="font-size:25px">经本次诊断确认 xx 有限公司建立了上述制度， 但是有些制度和规定没有得到有效实施。客户应该在进一步完善规章制度和有效实施规章制度的条件下，建立起能源管理的奖惩机制、激励机制和约束机制，
      使客户全员提高节能意识，充分发挥职工节能的积极性、创造性和主动性</p>
    <p align="left" style="font-size:25px">二、能源定额管理情况</p>
    <p style="font-size:25px">客户当前暂未根据其他能源（除电能外）在客户内部流动的过程及其特点，按照国家标准对能源购入贮存、加工转换、输送分配和最终使用四个环节设置对各工序及车间主辅生产系统各种能源消耗建立分类统计报表，原始记录也未备案保存。</p>
    <p align="center" style="font-size:25px">表2.2 单位能耗统计表 </p>
    <div class="table2">
      <a-table
        ref="table"
        style="margin-bottom: 24px"
        row-key="key"
        :columns="goodsColumns"
        :data-source="loadGoodsData"
        :pagination="false"
        bordered>
      </a-table>
    </div>
    <!-- <p style="font-size:25px">备注：单位产品能耗数据来源于客户工作人员提供，国家、地方能耗标识来源于相关皮革类产品能耗统计标准网站， 其中地方行业能耗标准借鉴的是{{ xx }}市地方行业产值能
      耗标准，原因由于{{ xx }}市该行业能耗标准暂无。</p> -->
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
        xx: 'xx',
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
        console.log('this.enterprisedata: ', this.enterprisedata)
      })
    }
    }
}
</script>

<style lang="less" scoped>
.part2{text-indent: 50px;}
</style>
