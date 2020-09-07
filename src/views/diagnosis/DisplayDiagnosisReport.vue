<template>
  <div id="report">
    <div class="right-aside" id="pdfCentent" style="background:#ECECEC; padding:30px">
      <a-card :bordered="true" style="margin-left:200px;margin-right:200px;">
        <reportHead />
        <reportPart1 />
        <reportPartS2 />
        <reportPartS3 />
        <reportPartS4 :buildingType="buildingType"></reportPartS4>
        <reportPartS5 />
      </a-card>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import { GetEnterpriseData } from '@/api/archives/enterprise'
import html2pdf from '../../utils/html2pdf'
// 商业建筑报表组件——企业
import reportHead from './report/CommercialReport/reportHead'
import reportPart1 from './report/CommercialReport/reportPart1'
import reportPartS2 from './report/CommercialReport/CommercialSelf/reportPartS2'
import reportPartS3 from './report/CommercialReport/CommercialSelf/reportPartS3'
import reportPartS4 from './report/CommercialReport/CommercialSelf/reportPartS4'
import reportPartS5 from './report/CommercialReport/CommercialSelf/reportPartS5'
// 商业建筑报表组件——楼层
import reportPartF2 from './report/CommercialReport/CommercialFloor/reportPartF2'
import reportPartF3 from './report/CommercialReport/CommercialFloor/reportPartF3'
import reportPartF4 from './report/CommercialReport/CommercialFloor/reportPartF4'
import reportPartF5 from './report/CommercialReport/CommercialFloor/reportPartF5'

export default {
  // name: 'electric',
  loading: 'false',
  components: {
       reportHead,
       reportPart1,
       reportPartS2,
       reportPartS3,
       reportPartS4,
       reportPartS5,
       reportPartF2,
       reportPartF3,
       reportPartF4,
       reportPartF5
  },
  data () {
    return {
      current: 1,
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
      nowtime: '',
      nowtime0: '',
      // pdf标题
      htmlTitle: 'XX公司诊断报告',
      currentTime: '',
      enterprisedata: '',
      // 回到顶部初始值
      scrollTop: 0,
      // 传给子组件的建筑类型
      buildingType: '',
      // 企业、楼栋、楼层、房间状态值
      status: false,
      Sstatus: false,
      Bstatus: false,
      Fstatus: false,
      Rstatus: false
    }
  },
  computed: {
            // showTop: function () {
            //     // 判断滚轮位置是否大于1000px，如果大于就tren，否则false
            //     const value = this.scrollTop > 1000 ? true : false
            //     // 返回值
            //     return value
            // }
        },
  created () {
    this.getTime()
    this.aa()
  },
  mounted () {
    this.getData()
    // addEventListener() 方法来添加监听事件
    window.addEventListener('scroll', this.getScrollTop)
  },
  methods: {
    moment,
    typeCallback (key) {
      this.buildingType = key
      console.log('this.buildingType: ', this.buildingType)
    },
    implement () {
      if (this.buildingType === '') {
      this.$message.info('需输入诊断区域！!')
      } else {
      switch (parseInt(this.buildingType)) {
        case 0:
          this.status = true
          this.Sstatus = true
          this.Bstatus = false
          this.Fstatus = false
          this.Rstatus = false
        break
        case 1:
          this.status = true
          this.Sstatus = false
          this.Bstatus = true
          this.Fstatus = false
          this.Rstatus = false
        break
        case 2:
          this.status = true
          this.Sstatus = false
          this.Bstatus = false
          this.Fstatus = true
          this.Rstatus = false
        break
        case 3:
          this.status = true
          this.Sstatus = false
          this.Bstatus = false
          this.Fstatus = false
          this.Rstatus = true
        break
      }
      }
    },
    getData () {
      GetEnterpriseData(1).then(response => {
        this.enterprisedata = response.result
      })
    },
    getTime () {
        // new Date() new一个data对象，当前日期和时间
        // toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowtime = new Date().toLocaleString()
    },
    aa () {
        var myDate = new Date() // 获取今天日期
        myDate.setDate(myDate.getDate() - 6)
        var dateArray = []
        var dateTemp
        var flag = 1
        for (var i = 0; i < 7; i++) {
        dateTemp = '2020' + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate()
        dateArray.push(dateTemp)
        myDate.setDate(myDate.getDate() + flag)
        }
        this.nowtime0 = dateArray[0]
    },
  // 回到顶部
  gotop () {
      // 这是最简单的回到顶部代码，但是过渡非常生硬，不建议这样写
      // document.documentElement.scrollTop = document.body.scrollTop = 0
      // 这里的原理是用定时器每200毫秒执行一次函数，每一次滚轮px减50，直到0为止
      const back = setInterval(() => {
          if (document.documentElement.scrollTop || document.body.scrollTop) {
              document.documentElement.scrollTop -= 50
              document.body.scrollTop -= 50
          } else {
              clearInterval(back) // scrollTop到0时就移除定时器
          }
      }, 200)
  },
  getScrollTop () {
      this.scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
    },
    // 方法2：输出pdf
    download () {
      html2pdf.downloadPDF(
        document.querySelector('#pdfCentent'),
        '评估报告'
      )
    }
  }

}
</script>

<style lang="less" scoped>
.right-aside{text-indent: 50px;}
.scrollTop {
    position: fixed;
    right: 10px;
    bottom: 80px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: rebeccapurple;
}
.space0{
  margin-bottom:400px;
}
.space{
  margin-bottom:900px;
}
</style>
