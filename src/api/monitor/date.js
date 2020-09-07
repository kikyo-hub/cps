export function getTime (n) {
    var now = new Date()
    var year = now.getFullYear()
    // 因为月份是从0开始的,所以获取这个月的月份数要加1才行
    var month = now.getMonth() + 1
    var date = now.getDate()
    var day = now.getDay()
    // console.log(date)
    // 判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    if (day !== 0) {
    n = n + (day - 1)
    } else {
    n = n + day
    }
    now.setDate(now.getDate() - n)
    year = now.getFullYear()
    month = now.getMonth() + 1
    date = now.getDate()
    // console.log(n)
    var s = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date)
    return s
}
export function getDateStr (AddDayCount) {
    var dd = new Date()
    dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
    var y = dd.getFullYear()
    var m = dd.getMonth() + 1// 获取当前月份的日期
    var d = dd.getDate()
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + d
     }
export function Percentage (paramsdata, paramsSum) {
    if (paramsdata === 0 || paramsSum === 0) {
        return 0
    }
    return (Math.round(paramsdata / paramsSum * 10000) / 100.00 + '%')// 小数点后两位百分比
}
