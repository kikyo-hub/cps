<template>
  <div class="date">
    <!-- 年份 月份 -->
    <div class="month">
      <p><van-button class="vanbutton" icon="arrow-left" @click="pickPre(currentYear,currentMonth)" />{{ currentYear }}年{{ currentMonth }}月<van-button class="vanbutton" icon="arrow" @click="pickNext(currentYear,currentMonth)"/></p>

    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <li @click="pick(day)" v-for="(day, index) in days" :key="index">
        <!--本月-->
        <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span v-else>
          <!--今天-->
          <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
          <span v-else>{{ day.getDate() }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
 export default {
   name: 'Date',

   data () {
    return {
     currentYear: 1970,
     currentMonth: 1,
     currentDay: 1,
     currentWeek: 1,
     days: []
    }
   },

   mounted () {

   },

   created () {
    this.initData(null)
   },

   methods: {
    formatDate (year, month, day) {
     const y = year
     let m = month
     if (m < 10) m = `0${m}`
     let d = day
     if (d < 10) d = `0${d}`
     return `${y}-${m}-${d}`
    },

    initData (cur) {
     let date = ''
     if (cur) {
      date = new Date(cur)
     } else {
      date = new Date()
     }
     this.currentDay = date.getDate()
     this.currentYear = date.getFullYear()
     this.currentMonth = date.getMonth() + 1
     this.currentWeek = date.getDay()
     if (this.currentWeek === 0) {
     this.currentWeek = 7
     }
     const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
     this.days.length = 0
     for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
      const d = new Date(str)
      d.setDate(d.getDate() - i)
      this.days.push(d)
    }
     for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
     const d = new Date(str)
      d.setDate(d.getDate() + i)
      this.days.push(d)
     }
    },

    weekPre () {
     const d = this.days[0]
     d.setDate(d.getDate() - 7)
     this.initData(d)
    },

    weekNext () {
     const d = this.days[6]
     d.setDate(d.getDate() + 7)
     this.initData(d)
    },

    pickPre (year, month) {
     const d = new Date(this.formatDate(year, month, 1))
     d.setDate(0)
     this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },

    pickNext (year, month) {
     const d = new Date(this.formatDate(year, month, 1))
     d.setDate(35)
     this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },

     pick (date) {
     alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
     }
   }
  }
 </script>

<style lang="less">

 .date {
  height: 120px;
  color: #333;
  background-color: #fff;
}
.date .vanbutton {
  border-color: #fff;
  top: 5px;
}
.date .month {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}
.date .weekdays {
  display: flex;
  font-size: 14px;
  margin-top: 10px;
}
.date .weekdays li {
  flex: 1;
  text-align: center;
  color: #aaa;
  list-style-type:none;
}
.date .days {
  display: flex;
}
.date .days li {
  flex: 1;
  font-size: 15px;
  text-align: center;
  margin-top: 5px;
  line-height: 30px;
  width: 30px;
  height: 30px;
  list-style-type:none;
}
.date .days li .active {
  display: inline-block;
  width: 30px;
  height: 30px;
  color: #fff;
  border-radius: 50%;
  background-color: #fa6854;
}
.date .days li .other-month {
  color: #e4393c;
}
 </style>
