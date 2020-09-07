<template>
  <div class="card-list" ref="content">
    <a-list
      rowKey="collectionRuleId"
      :grid="{gutter: 24, lg: 4, md: 3, sm: 2, xs: 1}"
      :dataSource="dataSource"
      :loading="loading"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.collectionRuleId === undefined">
          <a-button class="new-btn" type="dashed" @click="add" style="height:443px;">
            <a-icon type="plus-circle" theme="twoTone"/>
            新增采集规则
          </a-button>
        </template>
        <template v-else style="width:200%;">
          <a-card :hoverable="true" style="height:443px;overflow:auto;">
            <a-card-meta>
              <a slot="title">{{ item.ruleName }}</a>
              <a-avatar class="card-avatar" slot="avatar" :src="avatar" size="large"/>
              <div class="meta-content" slot="description">{{ item.ruleDesc }}</div>
            </a-card-meta>
            <detail-list :col="1" style="font-size:12px;" >
              <detail-list-item term="规则编号" style="height:30px;">{{ item.collectionRuleNo }}</detail-list-item>
              <detail-list-item term="开始时间" style="height:30px;">{{ item.startTime }}</detail-list-item>
              <detail-list-item term="结束时间" style="height:30px;">{{ item.endTime }}</detail-list-item>
              <detail-list-item term="采集周期" style="height:30px;">{{ item.collectionInterval + " (" + item.collectionTypename +")" }}</detail-list-item>
              <!-- <detail-list-item term="运行时段">{{ item.runningPeriod }}</detail-list-item> -->
              <detail-list-item term="采集方式" style="height:30px;">{{ item.collectionModename }}</detail-list-item>
              <detail-list-item term="保存时标" style="height:30px;">{{ item.saveTimeFlagname }}</detail-list-item>
              <detail-list-item term="采集数据" style="height:30px;">{{ datapro(item.cDataIds) }}</detail-list-item>
              <!-- <detail-list-item style="height:30px;" /> -->
              <detail-list-item style="height:30px;" />
            </detail-list>
            <template class="ant-card-actions" slot="actions" >
              <a @click="showModal(item)">修改</a>
              <a-popconfirm
                title="确定删除?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirm(item.collectionRuleId)"
              >
                <a>删除</a>
              </a-popconfirm>
              <!-- <a @click="deleteco(item.collectionRuleId)">删除</a> -->
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <div>
      <Pagination
        :default-current="1"
        :total="totalCount"
        @change="onChange"
        style="margin-top:24px;text-align:right"
      />
    </div>
    <!-- <CollectRulesEdit ref="CollectRulesEdit"></CollectRulesEdit> -->
    <a-modal
      title="修改采集规则"
      :visible="visible"
      :centered="true"
      :destroyOnClose="true"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-card :bordered="false">
        <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
          <a-form-item label="采集规则名称">
            <a-input
              v-decorator="['ruleName', { rules: [{ required: true, message: '请输入采集规则名称!' }] }]"
              disabled/>
          </a-form-item>
          <a-form-item label="采集规则描述">
            <a-input
              v-decorator="['ruleDesc', { rules: [{ required: true, message: '请输入采集规则描述!' }] }]"
            />
          </a-form-item>
          <!-- <a-form-item label="采集规则编号">
            <a-input
              v-decorator="['collectionRuleNo', { rules: [{ required: true, message: '请输入采集规则编号!' }] }]"
            />
          </a-form-item> -->
          <a-form-item label="采集规则编号">
            <a-select
              @change="handleChange"
              v-decorator="[
                'collectionRuleNo',
                { rules: [{ required: true, message: '请输入采集规则编号!' }] },
              ]"
            >
              <a-select-option v-for="item in field" :key="item" :value="item">{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="采集周期">
            <a-input
              v-decorator="['collectionInterval', { rules: [{ required: true, message: '请输入采集周期间隔!' }] }]"
              style="width:70%;"
            />
            <a-select
              v-decorator="[
                'collectionType',
                { rules: [{ required: true, message: '请输入采集周期类型!' }] },
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
          <!-- <a-form-item label="采集周期间隔">
            <a-input
              v-decorator="['collectionInterval', { rules: [{ required: true, message: '请输入采集周期间隔!' }] }]"
            />
          </a-form-item> -->
          <a-form-item label="开始时间">
            <a-date-picker
              v-decorator="['startTime', { rules: [{ type: 'object', required: true, message: '请输入开始时间!' }]}]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              style="width:100%;"
            />
          </a-form-item>
          <a-form-item label="结束时间">
            <a-date-picker
              v-decorator="['endTime', { rules: [{ type: 'object', required: true, message: '请输入结束时间!' }]}]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              style="width:100%;"
            />
          </a-form-item>
          <!-- <a-form-item label="运行时段">
            <a-input
              v-decorator="['runningPeriod', { rules: [{ required: true, message: '请输入运行时段!' }] }]"
            />
          </a-form-item> -->
          <a-form-item label="采集方式">
            <a-select
              v-decorator="[
                'collectionMode',
                { rules: [{ required: true, message: '请输入采集方式!' }] },
              ]"
              placeholder="--请选择--"
            >
              <a-select-option value="0">采集实时数据</a-select-option>
              <a-select-option value="1">采集上第N次</a-select-option>
              <a-select-option value="2">按冻结时标采集</a-select-option>
              <a-select-option value="3">按时标间隔采集</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="保存时标">
            <a-select
              v-decorator="[
                'saveTimeFlag',
                { rules: [{ required: true, message: '请输入保存时间!' }] },
              ]"
              placeholder="--请选择--"
            >
              <a-select-option value="0">未定义</a-select-option>
              <a-select-option value="1">任务开始时间</a-select-option>
              <a-select-option value="2">相对当日0点0分</a-select-option>
              <a-select-option value="3">相对上日23点59分</a-select-option>
              <a-select-option value="4">相对上日0点0分</a-select-option>
              <a-select-option value="5">相对当月1日0点0分</a-select-option>
              <a-select-option value="6">数据冻结时标</a-select-option>
              <a-select-option value="7">相对上月月末0点0分</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="数据标识">
            <a-select
              mode="multiple"
              style="width: 100%"
              placeholder="选择采集数据标识"
              v-decorator="[ 'dataIds', {rules: [{required: true, message: '请输入采集数据标识!' }]} ]"
            >
              <a-select-option v-for="item in cdataid" :key="item.dataid" :value="item.dataid">
                {{ item.dataname }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-card>
    </a-modal>

    <a-modal
      title="新增采集规则"
      :visible="visible2"
      :centered="true"
      :destroyOnClose="true"
      :confirm-loading="confirmLoading"
      @ok="handleOk2"
      @cancel="handleCancel2"
    >
      <a-card :bordered="false">
        <a-form :form="form1" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
          <a-form-item label="采集规则名称">
            <a-input
              v-decorator="['ruleName', { rules: [{ required: true, message: '请输入采集规则名称!' }] }]"
            />
          </a-form-item>
          <a-form-item label="采集规则描述">
            <a-input
              v-decorator="['ruleDesc', { rules: [{ required: true, message: '请输入采集规则描述!' }] }]"
            />
          </a-form-item>
          <!-- <a-form-item label="采集规则编号">
            <a-input
              v-decorator="['collectionRuleNo', { rules: [{ required: true, message: '请输入采集规则编号!' }] }]"
            />
          </a-form-item> -->
          <a-form-item label="采集规则编号">
            <a-select
              @change="handleChange2"
              v-decorator="[
                'collectionRuleNo',
                { rules: [{ required: true, message: '请输入采集规则编号!' }] },
              ]"
            >
              <a-select-option v-for="item in field" :key="item" :value="item">{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="采集周期">
            <a-input
              v-decorator="['collectionInterval', { rules: [{ required: true, message: '请输入采集周期间隔!' }] }]"
              style="width:70%;"
            />
            <a-select
              v-decorator="[
                'collectionType',
                { rules: [{ required: true, message: '请输入采集周期类型!' }] },
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
          <a-form-item label="开始时间">
            <a-date-picker
              v-decorator="['startTime', { rules: [{ type: 'object', required: true, message: '请输入开始时间!' }]}]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              style="width:100%;"
            />
          </a-form-item>
          <a-form-item label="结束时间">
            <a-date-picker
              v-decorator="['endTime', { rules: [{ type: 'object', required: true, message: '请输入结束时间!' }]}]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              style="width:100%;"
            />
          </a-form-item>
          <a-form-item label="采集方式">
            <a-select
              v-decorator="[
                'collectionMode',
                { rules: [{ required: true, message: '请输入采集方式!' }] },
              ]"
              placeholder="--请选择--"
            >
              <a-select-option value="0">采集实时数据</a-select-option>
              <a-select-option value="1">采集上第N次</a-select-option>
              <a-select-option value="2">按冻结时标采集</a-select-option>
              <a-select-option value="3">按时标间隔采集</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="保存时标">
            <a-select
              v-decorator="[
                'saveTimeFlag',
                { rules: [{ required: true, message: '请输入保存时标!' }] },
              ]"
              placeholder="--请选择--"
            >
              <a-select-option value="0">未定义</a-select-option>
              <a-select-option value="1">任务开始时间</a-select-option>
              <a-select-option value="2">相对当日0点0分</a-select-option>
              <a-select-option value="3">相对上日23点59分</a-select-option>
              <a-select-option value="4">相对上日0点0分</a-select-option>
              <a-select-option value="5">相对当月1日0点0分</a-select-option>
              <a-select-option value="6">数据冻结时标</a-select-option>
              <a-select-option value="7">相对上月月末0点0分</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="数据标识">
            <a-select
              mode="multiple"
              style="width: 100%"
              placeholder="选择采集数据标识"
              v-decorator="[ 'dataIds', {rules: [{required: true, message: '请输入采集数据标识!' }]} ]"
            >
              <a-select-option v-for="item in cdataid" :key="item.dataid" :value="item.dataid">
                {{ item.dataname }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
import { GetDRules, UpdateRules, AddRules, DelDRules, Getdataid, getcollectionRuleNo } from '@/api/archives/CollectionRule'
// import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea } from '@/components'
import { Pagination } from 'ant-design-vue'
// import CollectRulesEdit from './modules/CollectRulesEdit'
// a-modal需要的引用和定义
import moment from '../../../node_modules/moment'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'

const DetailListItem = DetailList.Item
const field = []
for (let i = 1; i < 256; i++) {
  field.push(i)
}

export default {
  name: 'CardList',
  components: {
    Pagination,
    DetailList,
    DetailListItem,
    // CollectRulesEdit,
    // a-modal需要
    PageView
  },
  data () {
    return {
      // a-modal需要
      a: '',
      visible: false,
      visible2: false,
      field,
      confirmLoading: false,
      dataSource: [],
      tabledata: [],
      totalCount: 10,
      cdataid: [],
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      parameter: {
        pageNo: '1',
        pageSize: '10'
      },
      loading: true,
      record: '',
      collectionRuleNo: [],
      collectionRuleNo2: null,
      avatar: require('@/assets/collect.png')
    }
  },
  mounted: function () {
    this.getData()
    this.getDataid()
    this.getNo()
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {
    getNo () {
      getcollectionRuleNo().then(res => {
        this.collectionRuleNo = res.result
      })
    },
    handleChange (value) {
      var filterdata = this.collectionRuleNo.filter(item => item !== this.collectionRuleNo2)
      if (filterdata.some(element => parseInt(element) === value)) {
        this.$message.warning('编号已经存在，请更改编号！')
        setTimeout(() => {
          this.form.setFieldsValue(
        {
          collectionRuleNo: ''
          }
        )
      }, 0)
      } else {
        setTimeout(() => {
          this.form.setFieldsValue(
        {
          collectionRuleNo: value
          }
        )
      }, 0)
      }
    },
    handleChange2 (value) {
      if (this.collectionRuleNo.some(element => parseInt(element) === value)) {
        this.$message.warning('编号已经存在，请更改编号！')
        setTimeout(() => {
          this.form1.setFieldsValue(
        {
          collectionRuleNo: ''
          }
        )
      }, 0)
      } else {
        setTimeout(() => {
          this.form1.setFieldsValue(
        {
          collectionRuleNo: value
          }
        )
      }, 0)
      }
    },
    getDataid () {
      Getdataid().then(res => {
        // console.log(res.result)
      this.cdataid = res.result
    })
    },
    datapro (cDataIds) {
      // console.log('cDataIds', cDataIds)
      let data = ''
      for (let i = 0; i < cDataIds.length; i++) {
        const cDataId = cDataIds[i].dataname + '(' + cDataIds[i].dataid + ')'
        data += cDataId
        data += '; '
      }
      // console.log(data)
      return data
    },
    datapro2 (data) {
      const data2 = []
      data.forEach(element => {
        data2.push(element.dataid)
      })
      return data2
    },
    confirm (collectionRuleId) {
      this.deleteco(collectionRuleId)
    },
    getData () {
      GetDRules(this.parameter).then(response => {
        this.totalCount = response.result.totalCount
        this.dataSource = JSON.parse(JSON.stringify(response.result.data))
         this.dataSource.unshift('{}')
        //  console.log('this.dataSource', this.dataSource[1].cDataIds[0].dataname)
        //  console.log('tabledataprocessing', this.tabledataprocessing(this.dataSource))
         this.dataSource = this.tabledataprocessing(this.dataSource)
         this.getNo()
      })
    },
    add () {
      this.visible2 = true
      // addRules()
    },
    tabledataprocessing (datas) {
      datas.forEach(tabledata => {
        switch (parseInt(tabledata.collectionType)) {
        case 0:
        tabledata.collectionTypename = '秒'
        break
    case 1:
        tabledata.collectionTypename = '分钟'
        break
    case 2:
        tabledata.collectionTypename = '小时'
         break
    case 3:
        tabledata.collectionTypename = '日'
         break
    case 4:
        tabledata.collectionTypename = '月'
         break
    case 5:
        tabledata.collectionTypename = '年'
         break
}
switch (parseInt(tabledata.collectionMode)) {
    case 0:
        tabledata.collectionModename = '采集实时数据'
        break
    case 1:
        tabledata.collectionModename = '采集上第N次'
         break
    case 2:
        tabledata.collectionModename = '按冻结时标采集'
         break
    case 3:
        tabledata.collectionModename = '按时标间隔采集'
         break
}
switch (parseInt(tabledata.saveTimeFlag)) {
    case 0:
        tabledata.saveTimeFlagname = '未定义'
        break
    case 1:
        tabledata.saveTimeFlagname = '任务开始时间'
        break
    case 2:
        tabledata.saveTimeFlagname = '相对当日0点0分'
         break
    case 3:
        tabledata.saveTimeFlagname = '相对上日23点59分'
         break
    case 4:
        tabledata.saveTimeFlagname = '相对上日0点0分'
         break
          case 5:
        tabledata.saveTimeFlagname = '相对当月1日0点0分'
         break
         case 6:
        tabledata.saveTimeFlagname = '数据冻结时标'
         break
         case 7:
        tabledata.saveTimeFlagname = '相对上月月末0点0分'
         break
}
      })
      return datas
    },
    // a-modal需要
    showModal (item) {
      this.visible = true
        setTimeout(() => {
        if (item) {
          console.log(item)
          this.record = item.collectionRuleId
          this.collectionRuleNo2 = item.collectionRuleNo
          this.form.setFieldsValue(
        { ruleName: item.ruleName,
          collectionType: item.collectionType,
          collectionInterval: item.collectionInterval,
          startTime: moment(item.startTime, 'YYYY-MM-DD HH:mm:ss'),
          endTime: moment(item.endTime, 'YYYY-MM-DD HH:mm:ss'),
          // runningPeriod: item.runningPeriod,
          collectionMode: item.collectionMode,
          saveTimeFlag: item.saveTimeFlag,
          ruleDesc: item.ruleDesc,
          collectionRuleNo: item.collectionRuleNo,
          dataIds: this.datapro2(item.cDataIds)
          }
        )
        }
      }, 100)
    },
    handleOk (e) {
       this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          values.collectionRuleId = this.record
          values.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss')
          values.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss')
          console.log('Received values of form: ', values)
          UpdateRules(values).then(res => {
            if (res.result) {
              this.getData()
              this.$notification['success']({
        message: '通知',
        description:
          '修改成功！',
          duration: 1.5
      })
            }
          })
          this.form.resetFields()
          this.visible = false
        }
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.getData()
      this.visible = false
    },
    handleOk2 (e) {
      this.form1.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          values.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss')
          values.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss')
          values.runningPeriod = ''
          console.log('Received values of form: ', values)
          AddRules(values).then(res => {
            if (res.result) {
              this.getData()
              this.$notification['success']({
        message: '通知',
        description:
          '新增成功！',
          duration: 1.5
      })
            }
          })
      this.form1.resetFields()
          // this.getData()
          this.visible2 = false
        }
      })
    },
    handleCancel2 (e) {
      console.log('Clicked cancel button')
      this.form1.resetFields()
      this.getData()
      this.visible2 = false
    },
    deleteco (collectionRuleId) {
      DelDRules(collectionRuleId).then(res => {
        // console.log(res)
        if (res.result) {
              this.getData()
              this.$notification['success']({
        message: '通知',
        description:
          '删除成功！',
          duration: 1.5
      })
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

<style lang="less" scoped>
  @import "~@/components/index.less";

  .card-list {
    /deep/ .ant-card-body:hover {
      .ant-card-meta-title>a {
        color: @primary-color;
      }
    }

    /deep/ .ant-card-meta-title {
      margin-bottom: 12px;

      &>a {
        display: inline-block;
        max-width: 100%;
        color: rgba(0,0,0,.85);
      }
    }

    /deep/ .meta-content {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      height: 64px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      margin-bottom: 1em;
    }
  }

  .card-avatar {
    width: 64px;
    height: 64px;
    border-radius: 64px;
  }

  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

</style>
