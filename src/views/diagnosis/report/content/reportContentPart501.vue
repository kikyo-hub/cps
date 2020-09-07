<template>
  <div class="part5" id="pdfCentent">
    <p align="left" style="font-size:30px">第四章 能源诊断测试评估总结</p>
    <p align="left" style="font-size:28px">第一节 总体改造方案建议</p>
    <p style="font-size:25px">ͨ通过对 xx 有限公司实地视察、调查访问、资料收集、能源测试与评估， 找出节能潜力部位，提出综合节能解决方案。方案中，共提出节能解决方案 5 个，预计投资额约 348.4 万元，
      节能量可达万 54.24kWh/年，预计每年节省金额 117.1 万元。</p>
    <p style="font-size:25px">1、空压机变频节能改造： 空压机变频改造总投资成本93000 元，年总节约费用 69424 元，年总节电量 81675KWH，回本期约 1.34 年；</p>
    <p style="font-size:25px">2、中央空调节能改造：中央空调负荷随动节能控制改造总投资成本387000元，年总节约费用 243867 元，年总节电量 286902KWH，回本期约 1.58年；</p>
    <p style="font-size:25px">3、锅炉节能改造： 燃煤锅炉改造燃气锅炉总投资成本2100000元，年总节约费用 710000 元，回本期约 2.96 年；</p>
    <p style="font-size:25px">4、电能质量治理改造：电能质量质量改善总投资成本680000元，年总节约费用 107869 元，年总节电量 126905KWH，回本期约 6.7 年；</p>
    <p style="font-size:25px">5、高损耗变压器更换改造：更换高损耗变压器改造总投资成本224000元，年总节约费用 39877 元，年总节电量 46914KWH，回本期约 5.61 年；</p>
    <p style="font-size:25px">具体方案效益汇总见表5.1 。</p>
    <p align="center" style="font-size:25px">表5.1 综合节能方案效益汇总</p>
    <div style="margin-top:10px">
      <a-table
        ref="table"
        style="margin-bottom: 24px"
        row-key="No"
        :columns="valueColumns"
        :data-source="valueData"
        :pagination="false"
        bordered>
      </a-table>
    </div>
    <p align="left" style="font-size:28px">第二节 节能管理工作建议</p>
    <p style="font-size:25px">根据节能管理经验，建议 xx 有限公司继续完善节能工作档案制度， 把节能工作记录存档，便于公司内部的能源管理。</p>
    <p style="font-size:25px">1、建立节能工作档案的注意事项</p>
    <p style="font-size:25px">（1）所有有关的节能工作都要形成书面文字；</p>
    <p style="font-size:25px">（2）规定专人（可以兼职）保管节能档案；</p>
    <p style="font-size:25px">（3）建议制作档案目录，每次加入的档案应记录在目录上；</p>
    <p style="font-size:25px">（4）每项的节能记录应包括有时间、人员、具体的节能内容；</p>
    <p style="font-size:25px">（5）节能记录必须相关人员签字认可。</p>
    <p style="font-size:25px">2、节能归档工作流程</p>
    <p style="font-size:25px">（1）相关部门（车间）责任人提交节能申请；</p>
    <p style="font-size:25px">（2）公司相关领导评估、确认并批复申请；</p>
    <p style="font-size:25px">（3）制定节能工作计划（费用申请、人员安排、设备及电表的采购等）；</p>
    <p style="font-size:25px">（4）节能改造工程（工作）实施；</p>
    <p style="font-size:25px">（5）节能效果检测和验收。</p>
  </div>
</template>

<script>
const valueColumns = [
        {
          title: '序号',
          dataIndex: 'No',
          slots: { title: 'createTimeTitle' },
          scopedSlots: { customRender: 'No' },
          key: 'No',
          align: 'center'
        },
        {
          title: '方案名称',
          dataIndex: 'tipName',
          slots: { title: 'diagnosisIdTitle' },
          scopedSlots: { customRender: 'tipName' },
          key: 'tipName',
          align: 'center'
        },
        {
          title: '节电量',
          dataIndex: 'sparingelec',
          slots: { title: 'diagnosisNameTitle' },
          scopedSlots: { customRender: 'sparingelec' },
          key: 'sparingelec',
          align: 'center'
        },
        {
          title: '经济效益',
          dataIndex: 'economic',
          slots: { title: 'diagnosisTypeDescTitle' },
          scopedSlots: { customRender: 'economic' },
          key: 'economic',
          align: 'center'
        },
        {
          title: '投资金额',
          dataIndex: 'give',
          slots: { title: 'buildingNoTitle' },
          scopedSlots: { customRender: 'give' },
          key: 'give',
          align: 'center'
        },
        {
          title: '回本期',
          dataIndex: 'get',
          slots: { title: 'buildingNoTitle' },
          scopedSlots: { customRender: 'get' },
          key: 'get',
          align: 'center'
        }
]
const valueData = [
  {
    No: 0,
    tipName: '空压机节能改造',
    sparingelec: '81675',
    economic: '69424',
    give: '93000',
    get: '1.34'
  },
  {
    No: 1,
    tipName: '中央空调节能改造',
    sparingelec: '286902',
    economic: '243867',
    give: '387000',
    get: '1.58'
  },
  {
    No: 2,
    tipName: '锅炉节能改造',
    sparingelec: '---',
    economic: '710000',
    give: '2100000',
    get: '2.96'
  },
  {
    No: 3,
    tipName: '电能质量改善',
    sparingelec: '126905',
    economic: '107869',
    give: '680000',
    get: '6.70'
  },
  {
    No: 4,
    tipName: '高损耗变压器更换',
    sparingelec: '46914',
    economic: '39877',
    give: '224000',
    get: '5.61'
  }
]

export default {
    name: 'ReportContentPart501',
    data () {
      return {
      valueColumns,
      valueData
      }
    }
}
</script>

<style lang="less" scoped>
.part5{text-indent: 50px;}
</style>
