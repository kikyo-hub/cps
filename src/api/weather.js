import jsonp from '../utils/jsonp.js'
export function getWeather () {
    const url = 'http://t.weather.sojson.com/api/weather/city/101220101'
    // const data = Object.assign({}, commonParams, {
    //   platform: 'h5',
    //   uin: 0,
    //   needNewCode: 1
    // })
    return jsonp(url)
  }
