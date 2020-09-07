<template>
  <a-card :bordered="true" :style="{ height: '100%' }">
    <div >
      <u><h3> <a @click="$router.go(-1)">返回</a></h3></u>
    </div>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
      <a-form-item label="诊断规则名称">
        <a-input v-decorator="[ 'diagnosisName', {rules: [{ required: true, message: '需输入诊断规则名称！' }]} ]" placeholder="填写诊断规则名称" />
      </a-form-item>
      <a-form-item label="诊断周期" >
        <a-input-number
          :precision="0"
          :min="1"
          :max="100000"
          v-decorator="[ 'calcInterval',{rules: [{ required: true, message: '需输入诊断周期！' }]} ]"
          placeholder="填写诊断周期"
          style="width:70%;" />
        <a-select
          v-decorator="[
            'calcPeriodType',
            { initialValue: '1' },
            { rules: [{ required: true, message: '需输入诊断间隔！!' }] },
          ]"
          style="width:30%;"
        >
          <a-select-option value="0">秒</a-select-option>
          <a-select-option value="1">分钟</a-select-option>
          <a-select-option value="2">小时</a-select-option>
          <a-select-option value="3">日</a-select-option>
          <a-select-option value="4">月</a-select-option>
          <a-select-option value="5">年</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="诊断方法">
        <a-select
          :allowClear="true"
          style="width: 100%"
          placeholder="选择诊断方法"
          v-decorator="[ 'diagnosisType', {rules: [{required: true, message: '请输入诊断方法!' }]} ]"
          @change="handleChange"
        >
          <a-select-option v-for="item in diagnosis" :key="item.value" :value="item.value">
            {{ item.display }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-decorator="[ 'description', {rules: [{ required: true, message: '需输入描述！' }]} ]" placeholder="填写描述" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="left:72%" @click="confirm" v-show="!show">保存</a-button>
      </a-form-item>
      <div v-show="show">
        <!-- <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-divider orientation="center">明细列表</a-divider>
        </a-form-item> -->
        <a-form-item :wrapper-col="{ span: 12, offset: 3 }">
          <a-button type="primary" style="left:32%" @click="addrules()">
            新增规则
          </a-button>
          <a-button type="primary" style="left:36%" @click="confirm">保存</a-button>
        </a-form-item>
        <a-form-item label="规则列表">
          <a-table :columns="columns" :data-source="data" rowKey="diagnosisRuleDetailId" :pagination="true">
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="tag in tags"
                :key="tag"
                color="green"
              >
                {{ tag }}
              </a-tag>
            </span>
            <span slot="operation" slot-scope="record">
              <a @click="editrecord(record)">修改</a><a-divider type="vertical" /><a @click="deleterecord(record)">删除</a>
            </span>
          </a-table>
        </a-form-item>
        <!-- <Pagination
          style="float:right;"
          :default-current="1"
          :total="totalCount"
          @change="onChange"
        /> -->
      </div>
    </a-form>
    <a-modal
      title="选择诊断规则方式（可多选）"
      :visible="visible"
      @cancel="close()"
    >
      <template slot="footer">
        <a-button type="primary" @click="edittable()" v-show="visible2">
          修改
        </a-button>
        <a-button type="primary" @click="addtable()" v-show="!visible2">
          新增
        </a-button>
      </template>
      <a-form :form="form1" >
        <a-form-item label="关联数据">
          <a-select placeholder="选择关联数据" style="width: 100%" v-decorator="[ 'dataType', {rules: [{required: true, message: '需选择一个关联数据！' }]} ]">
            <a-select-option value="0">曲线数据</a-select-option>
            <a-select-option value="1">日数据</a-select-option>
            <a-select-option value="2">月数据</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="数据标识">
          <a-select
            :allowClear="true"
            style="width: 100%"
            placeholder="选择数据标识"
            v-decorator="[ 'dataId', {rules: [{required: true, message: '请输入数据标识!' }]} ]"
            @change="handleChange2"
          >
            <a-select-option v-for="item in cdataid" :key="item.dataid" :value="item.dataid">
              {{ item.dataname }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="计算方式">
          <a-select placeholder="选择诊断计算方式" style="width: 100%" v-decorator="[ 'calcMode', {rules: [{required: true, message: '需选择一个计算方式!' }]} ]">
            <a-select-option value="0">累加和</a-select-option>
            <a-select-option value="1">平均值</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { Pagination } from 'ant-design-vue'
import { GetDRules, UpdateDRules, AddDRules } from '@/api/archives/DiagnosticRules'
import { Getdataid } from '@/api/archives/CollectionRule'
const columns = [
  {
    title: '关联数据',
    dataIndex: 'dataTypename',
    key: 'dataTypename'
  },
  {
    title: '数据标识',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: '计算方式',
    dataIndex: 'calcModename',
    key: 'calcModename'
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  name: 'RoleList',
  mixins: [mixinDevice],
  components: {
    Pagination
  },
  data () {
    return {
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      mdl: {},
      data: [],
      show: true,
      diagnosisName: '',
      diagnosisRuleId: null,
      diagnosisRuleDetailId: null,
       visible: false,
       visible2: true,
      columns,
      isAdd: null,
      totalCount: 10,
      parameter: {
        pageNo: '1',
        pageSize: '10'
      },
      diagnosis: [],
      cdataid: [],
      permissions: [],
      diagnosisRule: {
        diagnosisRuleId: '',
        diagnosisName: '',
        calcInterval: '',
        calcPeriodType: '',
        diagnosisType: '',
        description: '',
        cDiagnosisRuleDetails: []
      },
      diagnosisRule2: {
        diagnosisName: '',
        calcInterval: '',
        calcPeriodType: '',
        diagnosisType: '',
        description: '',
        cDiagnosisRuleDetails: []
      }
    }
  },
  created () {
    this.getDataid()
    this.diagnosis = this.$route.params.diagnosisType
    console.log(this.diagnosis)
    if (this.$route.params.record === undefined || this.$route.params.record === null) {
     // 新增
     this.isAdd = true
     console.log('新增')
    } else {
      // 修改
      console.log('修改')
      this.isAdd = false
      this.loaddata(this.$route.params.record)
    this.diagnosisRule.diagnosisRuleId = this.$route.params.record.diagnosisRuleId
    this.diagnosisRule.diagnosisName = this.$route.params.record.diagnosisName
    this.diagnosisRule.calcInterval = this.$route.params.record.calcInterval
    this.diagnosisRule.calcPeriodType = this.$route.params.record.calcPeriodType
    this.diagnosisRule.diagnosisType = this.$route.params.record.diagnosisType
    this.judge(this.diagnosisRule.diagnosisType)
    this.diagnosisRule.description = this.$route.params.record.description
    var test = this.tabledataprocessing(this.$route.params.record.cDiagnosisRuleDetails)
    this.data = this.addtags2(test)
    }
  },
  methods: {
    judge (val) {
      if (val === '0') {
        this.show = true
      } else {
        this.show = false
      }
    },
    handleChange (value) {
      console.log('select', value)
      this.judge(value)
    },
    handleChange2 (value) {
      console.log('select', value)
      console.log(this.data)
      if (this.data.some(element => (element.dataId + '') === (value + ''))) {
        this.$message.warning('数据标识已经存在，请更改数据标识！')
        setTimeout(() => {
          this.form1.setFieldsValue(
        {
          dataId: ''
          }
        )
      }, 0)
      } else {
        setTimeout(() => {
          this.form1.setFieldsValue(
        {
          dataId: value
          }
        )
      }, 0)
      }
    },
    confirm () {
      this.submit()
    },
    getDataid () {
      Getdataid().then(res => {
      this.cdataid = res.result
    })
    },
    getData () {
      GetDRules(this.parameter).then(response => {
        this.totalCount = response.result.totalCount
         var dataSource = JSON.parse(JSON.stringify(response.result.data))
        var data1 = this.tabledataprocessing(dataSource)
        this.data = this.addtags(data1)
        console.log('addtags', this.addtags(data1))
        //  console.log('this.dataSource', data1)
      })
    },
    addtags (data) {
      const array = []
        // data.dataIds.forEach(element => {
            this.cdataid.forEach(element1 => {
                if (data.dataId === element1.dataid) {
            array.push(element1.dataname)
          }
            })
        // })
        data.tags = array
        return data
    },
    addtags2 (data) {
      console.log(data)
      data.forEach(element => {
        var arr = []
        var arr2 = []
        element.cDataIds.forEach(element2 => {
          arr.push(element2.dataname)
          arr2.push(element2.dataid)
        })
        element.tags = arr
        element.dataIds = arr2
      })
      return data
    },
    tabledataprocessing (datas) {
    console.log('datas', datas)
      datas.forEach(tabledata => {
        tabledata.diagnosisRuleDetailId = Math.random()
        switch (parseInt(tabledata.calcMode)) {
        case 0:
        tabledata.calcModename = '累加和'
        break
    case 1:
        tabledata.calcModename = '平均值'
        break
}
switch (parseInt(tabledata.dataType)) {
    case 0:
        tabledata.dataTypename = '曲线数据'
        break
    case 1:
        tabledata.dataTypename = '日数据'
         break
    case 2:
        tabledata.dataTypename = '月数据'
         break
}
      })
      return datas
    },
    tabledataprocessing1 (tabledata) {
    console.log('datas', tabledata)
      // datas.forEach(tabledata => {
        switch (parseInt(tabledata.calcMode)) {
        case 0:
        tabledata.calcModename = '累加和'
        break
    case 1:
        tabledata.calcModename = '平均值'
        break
}
switch (parseInt(tabledata.dataType)) {
    case 0:
        tabledata.dataTypename = '曲线数据'
        break
    case 1:
        tabledata.dataTypename = '日数据'
         break
    case 2:
        tabledata.dataTypename = '月数据'
         break
}
      // })
      return tabledata
    },
    datapro2 (data) {
      const data2 = []
      data.forEach(element => {
        data2.push(element.dataid)
      })
      return data2
    },
    loaddata (item) {
      setTimeout(() => {
        if (item) {
          console.log('item', item)
          this.diaid = item.diagnosisRuleId
          this.form.setFieldsValue(
        { diagnosisName: item.diagnosisName,
        calcInterval: item.calcInterval,
        calcPeriodType: item.calcPeriodType,
        diagnosisType: item.diagnosisType,
          description: item.description
          // diagnosisType: item.diagnosisType,
          // calcMode: item.calcMode
          // dataIds: this.datapro2(item.cDataIds)
          }
        )
        }
      }, 100)
    },
    addrules () {
      this.visible2 = false
      this.visible = true
      setTimeout(() => {
      this.form1.setFieldsValue(
        // 把int类型转成string类型
        { dataType: '',
          dataId: '',
          calcMode: ''
          }
        )
        }, 100)
    },
    close () {
      this.visible = false
    },
    editrecord (record) {
      this.visible = true
      this.visible2 = true
      this.diagnosisRuleDetailId = record.diagnosisRuleDetailId
      setTimeout(() => {
      this.form1.setFieldsValue(
        // 把int类型转成string类型
        { dataType: record.dataType + '',
          dataId: record.dataId,
          calcMode: record.calcMode + ''
          }
        )
        }, 100)
    },
    deleterecord (record) {
      var filterdata = this.data.filter(item => item !== record)
      this.data = filterdata
    },
    submit () {
      if (this.isAdd) {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (this.show === true) {
                      var arraylist = this.tableToForm2(this.data)
                      // console.log('this.data', this.data, arraylist)
          this.diagnosisRule2.cDiagnosisRuleDetails = arraylist
          } else {
            this.diagnosisRule2.cDiagnosisRuleDetails = []
          }
            this.diagnosisRule2.diagnosisName = values.diagnosisName
            this.diagnosisRule2.calcInterval = values.calcInterval
            this.diagnosisRule2.calcPeriodType = values.calcPeriodType
            this.diagnosisRule2.diagnosisType = values.diagnosisType
            this.diagnosisRule2.description = values.description
            // console.log('this.diagnosisRule2', this.diagnosisRule2)
            AddDRules(this.diagnosisRule2).then(res => {
          if (res.result) {
            this.$notification['success']({
              message: '通知',
              description: '新增成功！',
              duration: 1.5
            })
             this.visible = false
          }
        })
        }
      })
      } else {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.show === true) {
                      var arraylist = this.tableToForm2(this.data)
          this.diagnosisRule.cDiagnosisRuleDetails = arraylist
          } else {
            this.diagnosisRule.cDiagnosisRuleDetails = []
          }
          this.diagnosisRule.diagnosisName = values.diagnosisName
          this.diagnosisRule.calcInterval = values.calcInterval
          this.diagnosisRule.calcPeriodType = values.calcPeriodType
          this.diagnosisRule.diagnosisType = values.diagnosisType
          this.diagnosisRule.description = values.description
          // console.log('this.diagnosisRule', this.diagnosisRule)
          UpdateDRules(this.diagnosisRule).then(res => {
        if (res.result) {
          this.$notification['success']({
            message: '通知',
            description: '修改成功！',
            duration: 1.5
          })
           this.visible = false
        }
      })
        }
      })
      }
    },
    tableToForm (data) {
      const array = []
      data.forEach(element => {
        var obj = { dataType: '', calcMode: '', dataId: '' }
        obj.dataType = element.dataType
        obj.calcMode = element.calcMode
        obj.dataId = element.dataIds
        array.push(obj)
      })
      return array
    },
    tableToForm2 (data) {
      const array = []
      data.forEach(element => {
        var obj = { dataType: '', calcMode: '', dataId: '' }
        obj.dataType = element.dataType
        obj.calcMode = element.calcMode
        obj.dataId = element.dataId
        array.push(obj)
      })
      return array
    },
    edittable () {
      this.form1.validateFields((err, values) => {
        if (!err) {
          values.diagnosisRuleDetailId = this.diagnosisRuleDetailId
          var data = this.tabledataprocessing1(values)
          console.log('Received values of form: ', data)
          var q = this.addtags(data)
          // console.log('q', q)
          var filterdata = this.data.filter(item => item.diagnosisRuleDetailId !== values.diagnosisRuleDetailId)
          filterdata.push(q)
          // console.log('filterdata', filterdata)
          this.data = filterdata
          // 重置诊断细节表单
          this.form1.setFieldsValue(
        { dataType: null,
          dataId: null,
          calcMode: null
          }
        )
        this.visible = false
        }
      })
    },
    addtable () {
      this.diagnosisRuleDetailId = ''
      this.form1.validateFields((err, values) => {
        if (!err) {
          var data = this.tabledataprocessing1(values)
          console.log('新增: ', data)
         var add = this.addtags(data)
         console.log(add)
         add.diagnosisRuleDetailId = Math.random()
         this.data.push(add)
         this.form1.setFieldsValue(
        { dataType: null,
          dataId: null,
          calcMode: null
          }
        )
        this.visible = false
        }
      })
    },

    onChange (current, pageSize) {
      this.parameter.pageNo = current
      this.parameter.pageSize = pageSize
    }
  }
}
</script>

<style scoped>

</style>
