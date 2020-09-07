<template>
  <div class="card-list" ref="content">
    <a-list
      rowKey="diagnosisRuleId"
      :grid="{gutter: 24, lg: 4, md: 3, sm: 2, xs: 1}"
      :dataSource="dataSource"
      :loading="loading"
      v-show="visible2"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.diagnosisRuleId === undefined">
          <router-link :to="{ name: 'diagnostic_rules_detail', params:{diagnosisType: diagnosisType} }">
            <a-button class="new-btn" type="dashed" style="height:418px;">
              <a-icon type="plus-circle" theme="twoTone"/>
              新增诊断规则
            </a-button>
          </router-link>
        </template>
        <template v-else>
          <a-card :hoverable="true" style="height:418px;overflow:auto;">
            <a-card-meta>
              <a slot="title">{{ item.diagnosisName }}</a>
              <a-avatar class="card-avatar" slot="avatar" :src="avatar" size="large"/>
              <!-- <div class="meta-content" slot="description">{{ item.diagnosisRuleDesc }}</div> -->
            </a-card-meta>
            <br>
            <detail-list :col="1" style="font-size:12px;">
              <detail-list-item term="诊断周期" style="height:40px;" >{{ item.calcInterval + " (" + item.calcPeriodTypename + ")" }}</detail-list-item>
              <detail-list-item term="诊断方法" style="height:40px;" >{{ item.diagnosisTypename }}</detail-list-item>
              <detail-list-item term="诊断描述" style="height:40px;" >{{ item.description }}</detail-list-item>
              <detail-list-item style="height:40px;" v-html="diadetail(item.cDiagnosisRuleDetails)"></detail-list-item>
              <detail-list-item style="height:30px;" />
              <detail-list-item style="height:30px;" />
              <detail-list-item style="height:40px;" />
              <!-- <detail-list-item style="height:30px;" /> -->
              <!-- <detail-list-item style="height:30px;" /> -->
            </detail-list>
            <template class="ant-card-actions" slot="actions">
              <router-link :to="{ name: 'diagnostic_rules_detail', params:{record: item, diagnosisType: diagnosisType} }">
                <a>修改</a>
              </router-link>
              <a-popconfirm
                title="确定删除?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirm(item.diagnosisRuleId)"
              >
                <a>删除</a>
              </a-popconfirm>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <div>
      <Pagination
        :default-current="1"
        :total="10"
        @change="onChange"
        style="margin-top:24px;text-align:right"
      />
    </div>
  </div>
</template>

<script>
import { GetDRules, DelDRules, getiagnosisRuleType } from '@/api/archives/DiagnosticRules'
import { Pagination } from 'ant-design-vue'
import DiagnosisRuleDetail from './modules/DiagnosticRuleDetail'
// a-modaly需要的引用和定义
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
// import { GetColumns, GetData, GetData1 } from '@/api/archives/building'
const DetailListItem = DetailList.Item

export default {
  name: 'CardList',
  components: {
    Pagination,
    // a-modal需要
    PageView,
    DetailList,
    DiagnosisRuleDetail,
    DetailListItem
  },
  data () {
    return {
      // a-modaly需要
      visible2: true,
      confirmLoading: false,
      diagnosisType: [],
      dataSource: [],
      parameter: {
        pageNo: '1',
        pageSize: '12'
      },
      loading: true,
      avatar: require('@/assets/logo1.png')

    }
  },
  mounted: function () {
    this.getDia()
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {
    async getDia () {
      await this.getRuleType()
      // console.log('2')
      this.getData()
    },
    getRuleType () {
      return new Promise((resolve, reject) => {
        getiagnosisRuleType().then(res => {
        this.diagnosisType = res.result.selectable
        // console.log('1')
        resolve(res.result.selectable[0].value)
      })
      })
    },
    getData () {
      GetDRules(this.parameter).then(response => {
         this.dataSource = JSON.parse(JSON.stringify(response.result.data))
         this.dataSource = this.tabledataprocessing(this.dataSource)
         this.dataSource.unshift('{}')
      })
    },
    diadetail (data) {
      if (data.length === 0) {
        return '项目明细: 暂无'
      } else {
      // var detail = '诊断细节: '
      var detail = '项目明细：<br>'
      data.forEach(element => {
       var value = this.diadetail2(element)
       detail += '&emsp;&emsp;&emsp;&emsp;&emsp;' + value + '；<br>'
        // detail += this.diadetail2(element)
        // detail += '；'
      //  detail.push(value)
      })
      return detail
      }
    },
    diadetail2 (data) {
      return data.dataTypeName + '，' + data.cDataIds[0].dataname + '，' + data.calcModeName
    },
    confirm (diagnosisRuleId) {
      this.deleteco(diagnosisRuleId)
    },
    deleteco (diagnosisRuleId) {
      DelDRules(diagnosisRuleId).then(res => {
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
    tabledataprocessing (datas) {
      datas.forEach(tabledata => {
        switch (parseInt(tabledata.calcMode)) {
        case 0:
        tabledata.calcModename = '累加和'
        break
    case 1:
        tabledata.calcModename = '平均值'
        break
}
var diagnosis = this.diagnosisType.find(ele => parseInt(ele.value) === parseInt(tabledata.diagnosisType))
tabledata.diagnosisTypename = diagnosis.display
switch (parseInt(tabledata.calcPeriodType)) {
    case 0:
        tabledata.calcPeriodTypename = '秒'
        break
    case 1:
        tabledata.calcPeriodTypename = '分钟'
         break
    case 2:
        tabledata.calcPeriodTypename = '小时'
         break
    case 3:
        tabledata.calcPeriodTypename = '日'
         break
         case 4:
        tabledata.calcPeriodTypename = '月'
         break
         case 5:
        tabledata.calcPeriodTypename = '年'
         break
}
      })
      return datas
    },
    onChange (current, pageSize) {
      this.parameter.pageNo = current
      this.parameter.pageSize = pageSize
      // GetMonitorPoint(this.parameter).then(response => {
      //   this.data = response.result.data
      // })
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
    width: 48px;
    height: 48px;
    border-radius: 48px;
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
