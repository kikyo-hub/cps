<template>
  <div class="part4" id="pdfCentent">
    <p align="left" style="font-size:22px">4、 数据分析对比</p>
    <p align="left" style="font-size:20px">4.1 标准煤折算系数表 </p>
    <div>
      <a-table
        ref="table"
        style="margin-top: 10px"
        row-key="energyID"
        :columns="kgceColumns"
        :data-source="kgceData"
        :pagination="false"
        bordered>
      </a-table>
    </div>
    <p align="left" style="font-size:20px">4.2 能源统计性结果 </p>
    <p style="font-size:18px">4.2.1 总体电能耗分析</p>
    <template v-if="enterprisedata">
      <p style="font-size:18px">位于夏热冬暖地区的{{ enterprisedata.name }}办公建筑面积{{ enterprisedata.Buildings[0].buildingArea }},全年电耗：{{ enFunData.enTotalEnergy }}kWh，
        其能耗实测值E0为：{{ enFunData.enTotalEnergy }}/20000 kWh/(m²·a) = 100 kWh/(m²·a)，
        高于引用标准——《民用建筑能耗标准》实施指南中的B类商业办公建筑能耗指标约束值80 kWh/(m²·a)。</p>
    </template>
    <p style="font-size:18px">针对此，客户提出申请修正并给出相关证据，说明该商业办公建筑有大量银行金融等行业的企业入驻，实际运行时间长，工作日早8:00至晚10:00使用，周六早8:00至下午2:00使用。经计算，
      全年实际使用时间：T={{ amendO.dayHour }}（h/工作日）× {{ amendO.dayNo }}（工作日）+ {{ amendO.weekHour }}（h/周末）× {{ amendO.weekNo }}周末 = {{ amendO.T }}/a。</p>
    <p style="font-size:18px">根据修正公式，计算得到{{ enterprisedata.name }}商业办公建筑使用时间修正系数γ1为：</p>
    <p style="font-size:18px">0.3 + 0.7 ×（2500/{{ amendO.T }}）= {{ amendO.γ1 }}</p>
    <p style="font-size:18px">根据修正公式，计算得到{{ enterprisedata.name }}商业办公建筑能耗指标修正值Eoc为：</p>
    <p style="font-size:18px">100 × {{ amendO.γ1 }}kWh/(m²·a) = {{ amendO.Eoc }}kWh/(m²·a)</p>
    <p style="font-size:18px">{{ results.result1 }}</p>
    <div>
      <a-table
        ref="table"
        style="margin-top: 10px"
        row-key="energyType"
        :columns="cmparColumns"
        :data-source="cmparData"
        :pagination="false"
        bordered>
      </a-table>
    </div>
    <div class="line" style="width:100%; height:1px; margin:0px auto; padding:0px; background-color:#D5D5D5; overflow:hidden;"></div>
    <p style="font-size:15px">参考标准：</p>
    <p style="font-size:15px"><a href="http://www.doc88.com/p-9532574677968.html" target="_blank"><a-icon type="double-right" /></a>1. 用电能耗标准</p>
    <div class="line" style="width:100%; height:1px; margin:0px auto; padding:0px; background-color:#D5D5D5; overflow:hidden;"></div>
  </div>
</template>

<script>
import { GetEnterpriseData } from '@/api/archives/enterprise'

const kgceColumns = [
  {
    title: '能耗编码',
    dataIndex: 'energyID',
    slots: { title: 'energyIDTitle' },
    scopedSlots: { customRender: 'energyID' },
    key: 'energyID',
    align: 'center'
  },
  {
    title: '能耗名称',
    dataIndex: 'energyName',
    slots: { title: 'energyNameTitle' },
    scopedSlots: { customRender: 'energyName' },
    key: 'energyName',
    align: 'center'
  },
  {
    title: '能耗单位',
    dataIndex: 'energyUnit',
    slots: { title: 'energyUnitTitle' },
    scopedSlots: { customRender: 'energyUnit' },
    key: 'energyUnit',
    align: 'center'
  },
  {
    title: '折标煤系数',
    dataIndex: 'standardCoal',
    slots: { title: 'standardCoalTitle' },
    scopedSlots: { customRender: 'standardCoal' },
    key: 'standardCoal',
    align: 'center'
  }
]
const kgceData = [
  {
    energyID: '01000',
    energyName: '电',
    energyUnit: 'kWh',
    standardCoal: '0.1229'
  },
  {
    energyID: '01A00',
    energyName: '照明插座用电',
    energyUnit: 'kWh',
    standardCoal: '0.1229'
  },
  {
    energyID: '01B00',
    energyName: '空调用电',
    energyUnit: 'kWh',
    standardCoal: '0.1229'
  },
  {
    energyID: '01C00',
    energyName: '动力用电',
    energyUnit: 'kWh',
    standardCoal: '0.1229'
  },
  {
    energyID: '01D00',
    energyName: '特殊用电',
    energyUnit: 'kWh',
    standardCoal: '0.1229'
  },
  {
    energyID: '02000',
    energyName: '水',
    energyUnit: 'm3',
    standardCoal: '0.257'
  },
  {
    energyID: '03000',
    energyName: '管道煤气',
    energyUnit: 'm3',
    standardCoal: '1.2143'
  },
  {
    energyID: '03A00',
    energyName: '天然气',
    energyUnit: 'm3',
    standardCoal: '1.2143'
  },
  {
    energyID: '...',
    energyName: '...',
    energyUnit: '...',
    standardCoal: '...'
  }
]
const cmparColumns = [
  {
    title: '能耗类型',
    dataIndex: 'energyType',
    slots: { title: 'energyTypeTitle' },
    scopedSlots: { customRender: 'energyType' },
    key: 'energyType',
    align: 'center'
  },
  {
    title: '实测值',
    dataIndex: 'measuredValue',
    slots: { title: 'measuredValueTitle' },
    scopedSlots: { customRender: 'measuredValue' },
    key: 'measuredValue',
    align: 'center'
  },
  {
    title: '标准值',
    dataIndex: 'standardValue',
    slots: { title: 'standardValueTitle' },
    scopedSlots: { customRender: 'standardValue' },
    key: 'standardValue',
    align: 'center'
  },
  {
    title: '先进值',
    dataIndex: 'advancedValue',
    slots: { title: 'advancedValueTitle' },
    scopedSlots: { customRender: 'advancedValue' },
    key: 'advancedValue',
    align: 'center'
  }
]
const cmparData = [
  {
    energyType: '电',
    measuredValue: '',
    standardValue: '85',
    advancedValue: '65'
  },
  {
    energyType: '水',
    measuredValue: '---',
    standardValue: '0.1072',
    advancedValue: '---'
  },
  {
    energyType: '气',
    measuredValue: '---',
    standardValue: '---',
    advancedValue: '---'
  },
  {
    energyType: '热',
    measuredValue: '---',
    standardValue: '---',
    advancedValue: '---'
  }
]

export default {
  name: 'ReportContentPart401',
  props: {
    buildingType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      kgceColumns,
      kgceData,
      cmparColumns,
      cmparData,
      enterprisedata: '',
      amendO: {
        dayHour: '14',
        dayNo: '250',
        weekHour: '6',
        weekNo: '52',
        T: '',
        S: '10',
        γ1: '',
        Eoc: ''
      },
      amendM: {
        dayHour: '14',
        dayNo: '250',
        weekHour: '6',
        weekNo: '52',
        T: '',
        σ: '',
        Eoc: ''
      },
      amendU: {
        η: '',
        η1: '',
        η2: ''
      },
      enFunData: {
        enTotalEnergy: '2000000',
        avergeEnergy: ''
      },
      results: {
        result1: ''
      }
    }
  },
  mounted () {
    this.getData()
    this.officeAmend()
    console.log('父子组件传值', this.buildingType)
  },
  methods: {
    getData () {
      GetEnterpriseData(1).then(response => {
        this.enterprisedata = response.result
      })
    },
    // 企业每年每平方米能耗函数
    enEnergyConsumption () {
      this.enFunData.avergeEnergy = (this.enFunData.enTotalEnergy / this.enterprisedata.Buildings[0].buildingArea).toFixed(0)
    },
    // 办公建筑能耗修正系数计算函数
    officeAmend () {
      this.amendO.T = (this.amendO.dayHour * this.amendO.dayNo) + (this.amendO.weekHour * this.amendO.weekNo)
      this.amendO.γ1 = (0.3 + 0.7 * (2500 / this.amendO.T)).toFixed(3)
      // this.amend.S = (this.amend.dayHour * this.amend.dayNo) + (this.amend.weekHour * this.amend.weekNo)
      this.amendO.γ2 = (0.7 + 0.3 * (this.amendO.S / 10)).toFixed(3)
      this.amendO.Eoc = 100 * this.amendO.γ1 * this.amendO.γ2
      this.cmparData[0].measuredValue = this.amendO.Eoc
      if (this.amendO.Eoc < 80) {
        this.results.result1 = '符合本标准中对应气候区商业办公建筑能耗指标约束的要求。'
      } else {
        this.results.result1 = '经修正得到的能耗不符合本标准中对应气候区商业办公建筑能耗指标约束的要求，仍存在较大节能空间。'
      }
    },
    // 商场建筑能耗修正系数计算函数
    marketAmend () {
      this.amendM.T = (this.amendM.dayHour * this.amendM.dayNo) + (this.amendM.weekHour * this.amendM.weekNo)
      this.amendM.σ = (0.3 + 0.7 * (2500 / this.amendM.T)).toFixed(3)
      this.amendM.Eoc = 100 * this.amendM.σ
    },
    // 高等院校建筑能耗修正系数计算函数
    universityAmend () {
      // 政法、体育、艺术 schoolType = 0
      // 财经 schoolType = 1
      // 语文 schoolType = 2
      // 师范 schoolType = 3
      // 理工、农业 schoolType = 4
      // 综合 schoolType = 5
      // 医药 schoolType = 6
      // “985”高校 schoolType = 7
      // “211”高校 schoolType = 8
      // 其他高校 schoolType = 9
      var schoolType = ''
      switch (schoolType) {
        case 0:
          this.amendU.η1 = 0.6
          break
        case 1:
          this.amendU.η1 = 0.75
          break
        case 2:
          this.amendU.η1 = 0.8
          break
        case 3:
          this.amendU.η1 = 0.9
          break
        case 4:
          this.amendU.η1 = 1.0
          break
        case 5:
          this.amendU.η1 = 1.1
          break
        case 6:
          this.amendU.η1 = 1.2
          break
        case 7:
          this.amendU.η2 = 1.2
          break
        case 8:
          this.amendU.η2 = 1.1
          break
        case 9:
          this.amendU.η2 = 1.0
          break
      }
      this.amendU.η = this.amendU.η1 * this.amendU.η2
    }
  },
  watch: {
    buildingType (newValue, oldValue) {
    this.buildingType = newValue
    console.log('父组件动态更新值：', this.buildingType)
    }
  }
}
</script>

<style lang="less" scoped>
.part4{text-indent: 40px;}
</style>
